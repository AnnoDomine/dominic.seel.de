import { useDebugValue, useMemo } from "react";
import { useLazyListUsersQuery } from "../../../../redux/queries/user";
import { DataGridProps, GridColDef, GridColType, GridDataSource, GridGetRowsResponse, GridRow } from "@mui/x-data-grid";
import DataGridPagination from "../../atoms/data-grid-pagination/data-grid-pagination";
import { Divider } from "@mui/material";
import { parseFilterModel } from "@utils";

const useUserList = () => {
    const [triggerFetchListUsers, { isFetching }] = useLazyListUsersQuery();

    const columns = useMemo(
        (): GridColDef[] => [
            { field: "id", headerName: "ID", width: 50, type: "number" },
            { field: "email", headerName: "Email", flex: 1 },
            {
                field: "username",
                headerName: "Username",
                flex: 1,
            },
            {
                field: "date_joined",
                headerName: "Date Joined",
                width: 100,
                type: "dateTime",
                valueFormatter: (value) => new Date(value).toLocaleString(),
                valueParser: (value) => new Date(value).toISOString(),
            },
            { field: "is_active", headerName: "Active", width: 100, type: "boolean", sortable: false },
            { field: "is_staff", headerName: "Staff", width: 100, type: "boolean", sortable: false },
        ],
        []
    );

    const filterTypeMap: Record<string, GridColType> = useMemo(
        () => columns.reduce((acc, col) => ({ ...acc, [col.field]: col.type || "string" }), {}),
        [columns]
    );

    const dataSource: GridDataSource = useMemo(
        () => ({
            getRows: async (params) => {
                try {
                    const { start, sortModel, paginationModel, filterModel } = params;
                    const pageSize = paginationModel?.pageSize || 1;
                    const pageNumber = Math.floor(Number(start) / pageSize) + 1;
                    const queryParams = {
                        page: pageNumber,
                        page_size: pageSize,
                        ordering: sortModel.map((sort) => `${sort.sort === "desc" ? "-" : ""}${sort.field}`).join(","),
                        filters: parseFilterModel(filterModel, filterTypeMap),
                    };
                    const response = await triggerFetchListUsers(queryParams, true).unwrap();
                    return {
                        rows: response.results,
                        rowCount: response.count,
                        pageInfo: { hasNextPage: Boolean(response.next), nextCursor: response.next },
                    } as GridGetRowsResponse;
                } catch (error) {
                    console.error("Error fetching rows:", error);
                    return { rows: [], rowCount: 0 };
                }
            },
        }),
        [filterTypeMap, triggerFetchListUsers]
    );

    const dataGridParams = useMemo(
        (): DataGridProps => ({
            columns,
            sortingMode: "server",
            sortingOrder: ["asc", "desc"],
            slots: {
                pagination: null,
                footer: () => (
                    <>
                        <Divider />
                        <DataGridPagination />
                    </>
                ),
                row: (params) => <GridRow {...params} className="pointer" />,
            },
            dataSource,
            loading: isFetching,
            pageSizeOptions: [],
            paginationModel: {
                page: 0,
                pageSize: 25,
            },
        }),
        [columns, dataSource, isFetching]
    );

    useDebugValue({ dataGridParams });

    return { dataGridParams };
};

export default useUserList;
