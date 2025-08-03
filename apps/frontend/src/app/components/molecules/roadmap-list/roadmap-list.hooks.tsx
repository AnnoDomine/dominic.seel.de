import { Divider } from "@mui/material";
import type { DataGridProps, GridColDef, GridColType, GridDataSource, GridGetRowsResponse } from "@mui/x-data-grid";
import { GridRow } from "@mui/x-data-grid";
import { useDebugValue, useMemo } from "react";
import { parseFilterModel } from "../../../../../../../libs/utils/src";
import { useLazyGetRoadmapQuery } from "../../../../redux/queries/roadmap";
import type { TRoadmapItem } from "../../../../types/redux/roadmap";
import DataGridPagination from "../../atoms/data-grid-pagination/data-grid-pagination";

const useRoadmapList = () => {
    const [triggerFetchRoadmap, { isFetching }] = useLazyGetRoadmapQuery();

    const columns = useMemo(
        (): GridColDef<TRoadmapItem>[] => [
            { field: "title", headerName: "Title", flex: 1 },
            {
                field: "status",
                headerName: "Status",
                width: 100,
                align: "center",
                headerAlign: "center",
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
                    const response = await triggerFetchRoadmap(queryParams, true).unwrap();
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
        [filterTypeMap, triggerFetchRoadmap]
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

export default useRoadmapList;
