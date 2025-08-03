import { Divider } from "@mui/material";
import type { DataGridProps, GridColDef, GridColType, GridDataSource, GridGetRowsResponse } from "@mui/x-data-grid";
import { GridRow } from "@mui/x-data-grid";
import { parseFilterModel } from "@utils";
import { useDebugValue, useMemo } from "react";
import { useLazyListProjectsQuery } from "../../../../redux/queries/project";
import type { ProjectListItem } from "../../../../types/redux/project";
import DataGridPagination from "../../atoms/data-grid-pagination/data-grid-pagination";
import ProjectStatusIcon from "../../atoms/project-status-icon/project-status-icon";
import ProjectTypeIcon from "../../atoms/project-type-icon/project-type-icon";

const useProjectList = () => {
    const [triggerFetchListProjects, { isFetching }] = useLazyListProjectsQuery();

    const columns = useMemo(
        (): GridColDef<ProjectListItem>[] => [
            { field: "title", headerName: "Title", flex: 1 },
            {
                field: "status",
                headerName: "Status",
                width: 100,
                align: "center",
                headerAlign: "center",
                renderCell: (params) => <ProjectStatusIcon status={params.value} />,
            },
            {
                field: "type",
                headerName: "Type",
                width: 100,
                align: "center",
                headerAlign: "center",
                renderCell: (params) => <ProjectTypeIcon type={params.value} />,
            },
            {
                field: "created_at",
                headerName: "Date Created",
                width: 200,
                type: "dateTime",
                valueFormatter: (value) => new Date(value).toLocaleString(),
                valueParser: (value) => new Date(value).toISOString(),
            },
        ],
        []
    );

    const filterTypeMap: Record<string, GridColType> = useMemo(
        () =>
            columns.reduce(
                (acc, col) => {
                    acc[col.field] = col.type || "string"; // Ensure all fields have a type
                    return acc;
                },
                {} as Record<string, GridColType>
            ),
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
                    const response = await triggerFetchListProjects(queryParams, true).unwrap();
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
        [filterTypeMap, triggerFetchListProjects]
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

export default useProjectList;
