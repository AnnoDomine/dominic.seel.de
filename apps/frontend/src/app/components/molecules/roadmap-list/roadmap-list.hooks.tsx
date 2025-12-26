import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { Props } from "@dnd-kit/core/dist/components/DndContext/DndContext";
import { Divider } from "@mui/material";
import type { DataGridProps, GridColDef, GridColType, GridFilterModel } from "@mui/x-data-grid";
import { GridLogicOperator, GridRow } from "@mui/x-data-grid";
import { useCallback, useDebugValue, useMemo } from "react";
import { useImmer } from "use-immer";
import { parseFilterModel } from "../../../../../../../libs/utils/src";
import { theme } from "../../../../main";
import { useListRoadmapInfiniteQuery, usePartialUpdateRoadmapItemMutation } from "../../../../redux/queries/roadmap";
import type { PaginationQueryParams } from "../../../../types/common";
import type { RoadmapStatus, TRoadmapItem, TRoadmapList } from "../../../../types/redux/roadmap";
import DataGridPagination from "../../atoms/data-grid-pagination/data-grid-pagination";
import RoadmapItem from "../../atoms/roadmap-item/roadmap-item";
import { LOAD_MORE_ITEM, LOADING_ITEM } from "./roadmap-list.constants";
import { RoadmapAdditionalItems } from "./roadmap-list.enums";

export type ItemDef = {
    id: string;
    type: "item" | "loading" | "load_more" | "fake";
    item: TRoadmapItem;
};

export type RowDef = {
    id: number;
    planned: ItemDef | null;
    in_progress: ItemDef | null;
    completed: ItemDef | null;
    on_hold: ItemDef | null;
};

const columnMap: Array<{ field: RoadmapStatus; label: string }> = [
    {
        field: "on_hold",
        label: "On Hold",
    },
    {
        field: "planned",
        label: "Planned",
    },
    {
        field: "in_progress",
        label: "In Progress",
    },
    {
        field: "completed",
        label: "Completed",
    },
];

const useRoadmapList = () => {
    const columns = useCallback(
        (triggerLoadMore: (type: RoadmapStatus) => void): GridColDef<RowDef>[] =>
            columnMap.map((c) => ({
                field: c.field,
                headerName: c.label,
                flex: 1,
                headerAlign: "center",
                disableColumnMenu: true,
                sortable: false,
                renderCell: (params) =>
                    params.row[c.field] ? (
                        <RoadmapItem
                            type={params.row[c.field]?.type || "loading"}
                            item={params.row[c.field]?.item || LOADING_ITEM}
                            triggerLoadMore={triggerLoadMore}
                            status={c.field}
                        />
                    ) : null,
            })),
        []
    );

    const [filterModel, setFilterModel] = useImmer<GridFilterModel>({
        items: [],
        logicOperator: GridLogicOperator.And,
    });

    const [draggedItem, setDraggedItem] = useImmer<DragStartEvent | null>(null);

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
        refetch: refetchPlanned,
    } = useListRoadmapInfiniteQuery(plannedQueryParams);
    const {
        data: inProgress,
        isFetching: isFetchingInProgress,
        fetchNextPage: fetchInProgressNextPage,
        refetch: refetchInProgress,
    } = useListRoadmapInfiniteQuery(inProgressQueryParams);
    const {
        data: completed,
        isFetching: isFetchingCompleted,
        fetchNextPage: fetchCompletedNextPage,
        refetch: refetchCompleted,
    } = useListRoadmapInfiniteQuery(completedQueryParams);
    const {
        data: onHold,
        isFetching: isFetchingOnHold,
        fetchNextPage: fetchOnHoldNextPage,
        refetch: refetchOnHold,
    } = useListRoadmapInfiniteQuery(onHoldQueryParams);

    const refetchInfinityQueries = useCallback(
        (include: Array<RoadmapStatus | "all">) => {
            const isAll = include.includes("all");
            if (include.includes("completed") || isAll) {
                refetchCompleted();
            }
            if (include.includes("on_hold") || isAll) {
                refetchOnHold();
            }
            if (include.includes("in_progress") || isAll) {
                refetchInProgress();
            }
            if (include.includes("planned") || isAll) {
                refetchPlanned();
            }
        },
        [refetchCompleted, refetchOnHold, refetchInProgress, refetchPlanned]
    );

    const [updateRoadmapItem] = usePartialUpdateRoadmapItemMutation();

    const onDragStart = useCallback(
        (item: DragStartEvent) => {
            setDraggedItem(item);
        },
        [setDraggedItem]
    );

    const onDragEnd = useCallback(
        (item: DragEndEvent | null) => {
            console.table({ item, draggedItem });
            if (
                item?.over &&
                (item.over.data.current as TRoadmapItem).status !==
                    (draggedItem?.active.data.current as TRoadmapItem).status
            ) {
                updateRoadmapItem({
                    id: (draggedItem?.active.data.current as TRoadmapItem).id,
                    status: (item.over.data.current as TRoadmapItem).status,
                })
                    .unwrap()
                    .then(() => {
                        refetchInfinityQueries(["all"]);
                    });
            }
            setDraggedItem(null);
        },
        [setDraggedItem, draggedItem, updateRoadmapItem, refetchInfinityQueries]
    );

    const dndProviderProps = useMemo(
        (): Props => ({
            onDragEnd,
            onDragStart,
        }),
        [onDragEnd, onDragStart]
    );

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

    const getItemType = useCallback((item: TRoadmapItem | null): "item" | "loading" | "load_more" => {
        if (!item) return "item";
        if (item.title === RoadmapAdditionalItems.LOADING) return "loading";
        if (item.title === RoadmapAdditionalItems.LOAD_MORE) return "load_more";
        return "item";
    }, []);

    const createColumnCss = useCallback((status: RoadmapStatus) => {
        let color = theme.palette.primary.main;
        switch (status) {
            case "completed":
                color = theme.palette.primary.main;
                break;
            case "in_progress":
                color = theme.palette.success.main;
                break;
            case "planned":
                color = theme.palette.warning.main;
                break;
            case "on_hold":
                color = theme.palette.error.main;
                break;
            default:
                break;
        }

        return {
            transition: "background-color 0.2s ease-in-out",
            background: `linear-gradient(to right, ${color} 0%, ${color} 2%, transparent 8%, transparent 92%, ${color} 98%, ${color} 100%)`,
            [`&.dropable-${status}`]: {
                background: `linear-gradient(to right, ${color} 0%, ${color} 8%, transparent 13%, transparent 87%, ${color} 92%, ${color} 100%)`,
            },
        };
    }, []);

    const createdRows = useMemo((): RowDef[] => {
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
        return itemArray.map((idx): RowDef => {
            const p = flatPlanned[idx]
                ? {
                      id: flatPlanned[idx].id.toString(),
                      type: getItemType(flatPlanned[idx]),
                      item: flatPlanned[idx],
                  }
                : null;
            const iP = flatInProgress[idx]
                ? {
                      id: flatInProgress[idx].id.toString(),
                      type: getItemType(flatInProgress[idx]),
                      item: flatInProgress[idx],
                  }
                : null;
            const c = flatCompleted[idx]
                ? {
                      id: flatCompleted[idx].id.toString(),
                      type: getItemType(flatCompleted[idx]),
                      item: flatCompleted[idx],
                  }
                : null;
            const oH = flatOnHold[idx]
                ? {
                      id: flatOnHold[idx].id.toString(),
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

    const generateDropClassname = useMemo(() => {
        if (!draggedItem) return "";
        const classes: Array<RoadmapStatus> = ["completed", "in_progress", "on_hold", "planned"];
        const draggedStatus = (draggedItem.active.data.current as TRoadmapItem).status;
        return classes
            .filter((c) => c !== draggedStatus)
            .map((c) => `dropable-${c}`)
            .join(" ");
    }, [draggedItem]);

    const dataGridParams = useMemo(
        (): DataGridProps<RowDef> => ({
            rows: createdRows,
            columns: columns(fetchNextPage),
            rowHeight: 130,
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
            getCellClassName: (params) => `${params.colDef.field} ${generateDropClassname}`,
            sx: {
                "& .completed": createColumnCss("completed"),
                "& .in_progress": createColumnCss("in_progress"),
                "& .planned": createColumnCss("planned"),
                "& .on_hold": createColumnCss("on_hold"),
                "& .pointer": {
                    cursor: "pointer",
                },
            },
        }),
        [columns, createdRows, filterModel, setFilterModel, fetchNextPage, createColumnCss, generateDropClassname]
    );

    useDebugValue({ dataGridParams, hasPlannedNextPage, generateDropClassname });

    return { dataGridParams, dndProviderProps, draggedItem };
};

export default useRoadmapList;
