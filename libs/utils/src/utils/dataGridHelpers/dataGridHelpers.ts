import type { GridColType, GridFilterModel } from "@mui/x-data-grid";

function getStringLookup(operator: string): string {
    switch (operator) {
        case "contains":
            return "__icontains";
        case "equals":
            return "__exact"; // or '__iexact' for case-insensitive
        case "startsWith":
            return "__istartswith";
        case "endsWith":
            return "__iendswith";
        case "isAnyOf":
            return "__in";
        case "isEmpty":
            return "isnull_true"; // Special case
        case "isNotEmpty":
            return "isnull_false"; // Special case
        default:
            return "__exact"; // Fallback
    }
}

function getNumberLookup(operator: string): string {
    switch (operator) {
        case "=":
            return "__exact";
        case ">":
            return "__gt";
        case ">=":
            return "__gte";
        case "<":
            return "__lt";
        case "<=":
            return "__lte";
        case "isAnyOf":
            return "__in";
        case "!=":
            return "exclude__exact"; // Special case for negation
        case "isEmpty":
            return "isnull_true";
        case "isNotEmpty":
            return "isnull_false";
        default:
            return "__exact";
    }
}

function getDateLookup(operator: string, colType: "date" | "dateTime" = "date"): string {
    const exactLookup = colType === "date" ? "__date__exact" : "__exact";

    switch (operator) {
        case "is":
            return exactLookup;
        case "after":
            return "__gt";
        case "onOrAfter":
            return "__gte";
        case "before":
            return "__lt";
        case "onOrBefore":
            return "__lte";
        case "isNot":
            return `exclude${exactLookup}`; // Special case
        case "isEmpty":
            return "isnull_true";
        case "isNotEmpty":
            return "isnull_false";
        default:
            return exactLookup;
    }
}

/**
 * Parse Mui boolean operator string into a Django-rest-framework-style operator prefix string.
 * All operators are incasesensitive.
 * @param operator Mui operator string
 * @returns Django-rest-framework-style operator prefix string
 */
function getSelectOrBooleanLookup(operator: string): string {
    switch (operator) {
        case "is":
            return "";
        case "not":
            return "exclude__exact"; // Special case
        case "isAnyOf": // Relevant for singleSelect
            return "__in";
        default:
            return "__exact";
    }
}

const getFilterParser = (operator: string, type: GridColType) => {
    console.log("getFilterParser called with operator:", operator, "and type:", type);
    switch (type) {
        case "string":
            return getStringLookup(operator);
        case "number":
            return getNumberLookup(operator);
        case "date":
        case "dateTime":
            return getDateLookup(operator, type);
        case "singleSelect":
        case "boolean":
            return getSelectOrBooleanLookup(operator);
        default:
            throw new Error(`Unsupported column type: ${type}`);
    }
};

export const parseFilterValue = (value: string | number | boolean | undefined, type: GridColType) => {
    switch (type) {
        case "date":
        case "dateTime":
            if (typeof value !== "string") {
                throw new Error("Date value must be a string");
            }
            return new Date(value).toISOString();
        case "boolean":
            return value ? "true" : "false";
        default:
            return value;
    }
};

export const parseFilterModel = (
    filterModel: GridFilterModel,
    filterTypeMap: Record<string, GridColType>
): Record<string, string | number | boolean | undefined> | undefined => {
    const filters: Record<string, string | number | boolean | undefined> = {};
    const excludes: Record<string, string | number | boolean | undefined> = {};

    filterModel.items.forEach((item) => {
        const colType = filterTypeMap[item.field] || "string";
        const lookup = getFilterParser(item.operator, colType);

        console.log("Processing filter item:", item, "with lookup:", lookup, "and colType:", colType);

        if (lookup === "isnull_true") {
            filters[`${item.field}__isnull`] = true;
            return;
        }
        if (lookup === "isnull_false") {
            filters[`${item.field}__isnull`] = false;
            return;
        }

        if (item.value === undefined || item.value === null || item.value === "") {
            return;
        }

        const parsedValue = parseFilterValue(item.value, colType);

        if (lookup.startsWith("exclude__")) {
            const key = `${item.field}${lookup.replace("exclude", "")}`;
            excludes[key] = parsedValue;
        } else {
            const key = `${item.field}${lookup}`;
            filters[key] = parsedValue;
        }
    });

    console.table(filters);
    console.table(excludes);

    // Combine filters and excludes
    const combinedFilters: Record<string, string | number | boolean | undefined> = { ...filters, ...excludes };

    // If there are no filters, return undefined
    if (Object.keys(combinedFilters).length === 0) {
        return undefined;
    }

    return combinedFilters;
};
