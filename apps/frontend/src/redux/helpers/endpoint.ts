import type { PaginationQueryParams } from "../../types/common";

export const paginatedEndpoint = (endpoint: string, queryParams: PaginationQueryParams) => {
    const params = new URLSearchParams();

    if (queryParams.page !== undefined) {
        params.append("page", String(queryParams.page));
    }
    if (queryParams.page_size !== undefined) {
        params.append("page_size", String(queryParams.page_size));
    }
    if (queryParams.search) {
        params.append("search", queryParams.search);
    }
    if (queryParams.ordering) {
        params.append("ordering", queryParams.ordering);
    }

    if (queryParams.filters) {
        Object.entries(queryParams.filters).forEach(([key, value]) => {
            if (value === undefined || value === null) return; // Skip undefined or null values
            params.append(key, String(value));
        });
    }

    return `${endpoint}?${params.toString()}`;
};
