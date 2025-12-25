import { Divider } from "@mui/material";
import type { DataGridProps, GridColDef, GridColType, GridFilterModel } from "@mui/x-data-grid";
import { GridLogicOperator, GridRow } from "@mui/x-data-grid";
import { useCallback, useDebugValue, useMemo } from "react";
import { useImmer } from "use-immer";
import { parseFilterModel } from "../../../../../../../libs/utils/src";
import { useListRoadmapInfiniteQuery } from "../../../../redux/queries/roadmap";
import type { PaginationQueryParams } from "../../../../types/common";
import type { RoadmapStatus, TRoadmapItem, TRoadmapList } from "../../../../types/redux/roadmap";
import DataGridPagination from "../../atoms/data-grid-pagination/data-grid-pagination";
import RoadmapItem from "../../atoms/roadmap-item/roadmap-item";
import { LOAD_MORE_ITEM, LOADING_ITEM } from "./roadmap-list.constants";
import { RoadmapAdditionalItems } from "./roadmap-list.enums";

type ItemDef = {
    id: string;
    type: "item" | "loading" | "load_more";
    item: TRoadmapItem;
};

type RowDef = {
    id: number;
    planned: ItemDef | null;
    in_progress: ItemDef | null;
    completed: ItemDef | null;
    on_hold: ItemDef | null;
};

const useRoadmapList = () => {
    const columns = useCallback(
        (triggerLoadMore: (type: RoadmapStatus) => void): GridColDef<RowDef>[] => [
            {
                field: "planned",
                headerName: "Planed",
                flex: 1,
                align: "center",
                headerAlign: "center",
                renderCell: (params) =>
                    params.row.planned ? (
                        <RoadmapItem
                            type={params.row.planned.type}
                            item={params.row.planned.item}
                            triggerLoadMore={triggerLoadMore}
                            status="planned"
                        />
                    ) : null,
            },
            {
                field: "in_progress",
                headerName: "In Progress",
                flex: 1,
                align: "center",
                headerAlign: "center",
                renderCell: (params) =>
                    params.row.in_progress ? (
                        <RoadmapItem
                            type={params.row.in_progress.type}
                            item={params.row.in_progress.item}
                            triggerLoadMore={triggerLoadMore}
                            status="in_progress"
                        />
                    ) : null,
            },
            {
                field: "completed",
                headerName: "Completed",
                flex: 1,
                align: "center",
                headerAlign: "center",
                renderCell: (params) =>
                    params.row.completed ? (
                        <RoadmapItem
                            type={params.row.completed.type}
                            item={params.row.completed.item}
                            triggerLoadMore={triggerLoadMore}
                            status="completed"
                        />
                    ) : null,
            },
            {
                field: "on_hold",
                headerName: "On Hold",
                flex: 1,
                align: "center",
                headerAlign: "center",
                renderCell: (params) =>
                    params.row.on_hold ? (
                        <RoadmapItem
                            type={params.row.on_hold.type}
                            item={params.row.on_hold.item}
                            triggerLoadMore={triggerLoadMore}
                            status="on_hold"
                        />
                    ) : null,
            },
        ],
        []
    );

    const [filterModel, setFilterModel] = useImmer<GridFilterModel>({
        items: [],
        logicOperator: GridLogicOperator.And,
    });

    const columnByType: Record<string, GridColType> = useMemo(
        () =>
            columns(() => null).reduce(
                (acc, col): Record<string, GridColType> => {
                    acc[col.field] = (col.type || "string") as GridColType;
                    return acc;
                },
                {} as Record<string, GridColType>
            ),
        [columns]
    );

    const parsedFilterParams = useMemo((): Partial<Record<string, string | number | boolean>> | undefined => {
        if (!filterModel.items.length) return undefined;

        // Parse the filter
        const parsedItems = parseFilterModel(filterModel, columnByType, ["status"]);
        return parsedItems;
    }, [filterModel, columnByType]);

    const parseQueryParams = useCallback(
        (status: RoadmapStatus): Omit<PaginationQueryParams, "page" | "page_size"> => {
            const params: Omit<PaginationQueryParams, "page" | "page_size"> = {};
            const search = undefined;
            if (search) params.search = search;
            const ordering = undefined;
            if (ordering) params.ordering = ordering;
            const filters = parsedFilterParams;
            if (filters) params.filters = filters;

            return { ...params, filters: { ...params.filters, status } };
        },
        [parsedFilterParams]
    );

    const plannedQueryParams = useMemo(() => parseQueryParams("planned"), [parseQueryParams]);
    const inProgressQueryParams = useMemo(() => parseQueryParams("in_progress"), [parseQueryParams]);
    const completedQueryParams = useMemo(() => parseQueryParams("completed"), [parseQueryParams]);
    const onHoldQueryParams = useMemo(() => parseQueryParams("on_hold"), [parseQueryParams]);

    const {
        data: planned,
        isFetching: isFetchingPlanned,
        fetchNextPage: fetchPlannedNextPage,
        hasNextPage: hasPlannedNextPage,
    } = useListRoadmapInfiniteQuery(plannedQueryParams);
    const {
        data: inProgress,
        isFetching: isFetchingInProgress,
        fetchNextPage: fetchInProgressNextPage,
    } = useListRoadmapInfiniteQuery(inProgressQueryParams);
    const {
        data: completed,
        isFetching: isFetchingCompleted,
        fetchNextPage: fetchCompletedNextPage,
    } = useListRoadmapInfiniteQuery(completedQueryParams);
    const {
        data: onHold,
        isFetching: isFetchingOnHold,
        fetchNextPage: fetchOnHoldNextPage,
    } = useListRoadmapInfiniteQuery(onHoldQueryParams);

    const fetchNextPage = useCallback(
        (type: RoadmapStatus) => {
            switch (type) {
                case "planned":
                    fetchPlannedNextPage();
                    break;
                case "in_progress":
                    fetchInProgressNextPage();
                    break;
                case "completed":
                    fetchCompletedNextPage();
                    break;
                case "on_hold":
                    fetchOnHoldNextPage();
                    break;
                default:
                    break;
            }
        },
        [fetchPlannedNextPage, fetchInProgressNextPage, fetchCompletedNextPage, fetchOnHoldNextPage]
    );

    const parseFlatMap = useCallback((map: TRoadmapItem[], isLoading: boolean, hasMore: boolean) => {
        const mapCache = [...map];
        if (isLoading) {
            mapCache.push(LOADING_ITEM);
        } else if (hasMore) {
            mapCache.push(LOAD_MORE_ITEM);
        }
        return mapCache;
    }, []);

    const getLastPageItem = useCallback((pages: TRoadmapList[] | undefined) => {
        if (!pages) return undefined;
        const len = pages.length;
        const lastPage = pages[len - 1];
        return lastPage || undefined;
    }, []);

    const getItemType = useCallback((item: TRoadmapItem | null) => {
        if (!item) return "item";
        if (item.title === RoadmapAdditionalItems.LOADING) return "loading";
        if (item.title === RoadmapAdditionalItems.LOAD_MORE) return "load_more";
        return "item";
    }, []);

    const createdRows = useMemo(() => {
        // We need to know, if there are nore items in the related status
        // We will archive this, by getting the last fetched page and check if there is "next" defined
        const plannedHaveMore = !!getLastPageItem(planned?.pages)?.next;
        const inProgressHaveMore = !!getLastPageItem(inProgress?.pages)?.next;
        const completedHaveMore = !!getLastPageItem(completed?.pages)?.next;
        const onHoldHaveMore = !!getLastPageItem(onHold?.pages)?.next;

        // First we need to flat all data
        const flatPlanned = parseFlatMap(
            planned?.pages.flatMap((page) => page.results) || [],
            isFetchingPlanned,
            plannedHaveMore
        );
        const flatInProgress = parseFlatMap(
            inProgress?.pages.flatMap((page) => page.results) || [],
            isFetchingInProgress,
            inProgressHaveMore
        );
        const flatCompleted = parseFlatMap(
            completed?.pages.flatMap((page) => page.results) || [],
            isFetchingCompleted,
            completedHaveMore
        );
        const flatOnHold = parseFlatMap(
            onHold?.pages.flatMap((page) => page.results) || [],
            isFetchingOnHold,
            onHoldHaveMore
        );

        // Now we need to know, which status have the highest amount of items currently fetched
        const amountPlanned = flatPlanned.length;
        const amountInProgress = flatInProgress.length;
        const amountCompleted = flatCompleted.length;
        const amountOnHold = flatOnHold.length;

        const highestAmount = Math.max(amountPlanned, amountInProgress, amountCompleted, amountOnHold);

        // Now the next part will be important, we need to map the items
        // The item by there self will be mapped in a specific way:
        // item = { id: item.id, type: "item" | "loading" | "load_more", item: item }
        // First we create an array based on the amount of the kighest item map.
        const itemArray = Array.from({ length: highestAmount }, (_, index) => index);
        return itemArray.map((idx) => {
            const p = flatPlanned[idx]
                ? {
                      id: flatPlanned[idx].id,
                      type: getItemType(flatPlanned[idx]),
                      item: flatPlanned[idx],
                  }
                : null;
            const iP = flatInProgress[idx]
                ? {
                      id: flatInProgress[idx].id,
                      type: getItemType(flatInProgress[idx]),
                      item: flatInProgress[idx],
                  }
                : null;
            const c = flatCompleted[idx]
                ? {
                      id: flatCompleted[idx].id,
                      type: getItemType(flatCompleted[idx]),
                      item: flatCompleted[idx],
                  }
                : null;
            const oH = flatOnHold[idx]
                ? {
                      id: flatOnHold[idx].id,
                      type: getItemType(flatOnHold[idx]),
                      item: flatOnHold[idx],
                  }
                : null;

            return {
                id: idx,
                planned: p,
                in_progress: iP,
                completed: c,
                on_hold: oH,
            };
        });
    }, [
        parseFlatMap,
        planned,
        inProgress,
        completed,
        onHold,
        isFetchingPlanned,
        isFetchingInProgress,
        isFetchingCompleted,
        isFetchingOnHold,
        getLastPageItem,
        getItemType,
    ]);

    const dataGridParams = useMemo(
        (): DataGridProps => ({
            rows: createdRows,
            columns: columns(fetchNextPage),
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
            pageSizeOptions: [],
            paginationModel: {
                page: 0,
                pageSize: 25,
            },
            filterMode: "server",
            filterModel,
            onFilterModelChange: setFilterModel,
        }),
        [columns, createdRows, filterModel, setFilterModel, fetchNextPage]
    );

    useDebugValue({ dataGridParams, hasPlannedNextPage });

    return { dataGridParams };
};

export default useRoadmapList;
