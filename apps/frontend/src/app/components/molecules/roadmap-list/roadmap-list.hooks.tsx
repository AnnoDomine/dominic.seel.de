import type { DragEndEvent, DragMoveEvent, DragStartEvent } from "@dnd-kit/core";
import type { Props } from "@dnd-kit/core/dist/components/DndContext/DndContext";
import { useCallback, useDebugValue, useMemo, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { useListRoadmapInfiniteQuery, usePartialUpdateRoadmapItemMutation } from "../../../../redux/queries/roadmap";
import type { PaginationQueryParams } from "../../../../types/common";
import type { RoadmapStatus, TRoadmapItem, TRoadmapList } from "../../../../types/redux/roadmap";
import useLocalPreferences from "../../../../utils/local-preferences/local-preferences";
import type { RoadmapBoardProps } from "../roadmap-board/roadmap-board";
import { LOAD_MORE_ITEM, LOADING_ITEM } from "./roadmap-list.constants";
import { RoadmapAdditionalItems } from "./roadmap-list.enums";

export type ItemDef = {
    id: string;
    type: "item" | "loading" | "load_more" | "fake";
    item: TRoadmapItem;
};

export type RowDef = {
    planned: ItemDef[];
    in_progress: ItemDef[];
    completed: ItemDef[];
    on_hold: ItemDef[];
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
    const [getPreferences, setPreferences] = useLocalPreferences();

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [search, setSearch] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string | null>(null);

    const handleChangeSearchValue = useCallback((value: string | null) => {
        setSearchValue(value);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setSearch(value);
        }, 500);
    }, []);

    const handleChangeSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation();
            e.preventDefault();
            handleChangeSearchValue(e.target.value);
        },
        [handleChangeSearchValue]
    );

    const [draggedItem, setDraggedItem] = useImmer<DragStartEvent | null>(null);

    const [columnOrder, setColumnOrder] = useState<Array<(typeof columnMap)[number]["field"]> | null>(
        getPreferences("roadmap_column_order") || columnMap.map((c) => c.field)
    );
    const [usedColumnOrder, setUsedColumnOrder] = useState<Array<(typeof columnMap)[number]["field"]>>(
        getPreferences("roadmap_column_order") || columnMap.map((c) => c.field)
    );

    const appliedColumnOrder = useMemo(() => {
        if (draggedItem && (draggedItem.active.data.current as RoadmapBoardProps).type === "status") {
            return columnOrder || usedColumnOrder;
        }
        return usedColumnOrder;
    }, [columnOrder, usedColumnOrder, draggedItem]);

    const parseQueryParams = useCallback(
        (status: RoadmapStatus): Omit<PaginationQueryParams, "page" | "page_size"> => {
            const params: Omit<PaginationQueryParams, "page" | "page_size"> = {};
            if (search) params.search = search;
            const ordering = undefined;
            if (ordering) params.ordering = ordering;
            const filters = {};
            if (filters) params.filters = filters;

            return { ...params, filters: { ...params.filters, status } };
        },
        [search]
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

    const orderSetterHelper = useCallback(
        (draft: Array<RoadmapStatus>, dropId: RoadmapStatus, draggedId: RoadmapStatus) => {
            // Get the current index of the dragged item
            const draggedIdx = draft.indexOf(draggedId);
            // Get the index of the dropped item. Over means always befor the column
            const dropIdx = draft.indexOf(dropId);

            const currentColumnOrder = [...draft];
            console.table({ currentColumnOrder, draggedIdx, dropIdx });
            currentColumnOrder.splice(dropIdx, 0, currentColumnOrder.splice(draggedIdx, 1)[0]);
            return currentColumnOrder;
        },
        []
    );

    const handleColumOrderChanges = useCallback(
        (item: DragMoveEvent | DragEndEvent, apply = false) => {
            if (
                !item.over ||
                !draggedItem ||
                (draggedItem.active.data.current as RoadmapBoardProps).type !== "status"
            ) {
                return;
            }

            // Now lets place the dragged item one index befor the dropped item
            if (apply) {
                setUsedColumnOrder((draft) => {
                    const newOrder = columnOrder || draft;
                    setPreferences("roadmap_column_order", newOrder);
                    setColumnOrder(null);
                    return newOrder;
                });
            } else {
                setColumnOrder((draft) =>
                    orderSetterHelper(
                        draft || usedColumnOrder,
                        item.over?.id as RoadmapStatus,
                        (draggedItem.active.data.current as RoadmapBoardProps).field
                    )
                );
            }
        },
        [draggedItem, setPreferences, orderSetterHelper, usedColumnOrder, columnOrder]
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
            if (!draggedItem) return;
            if (item && (draggedItem.active.data.current?.type as unknown as string) === "status") {
                handleColumOrderChanges(item, true);
                return;
            }
            if (item?.over && item.over.id !== (draggedItem?.active.data.current as TRoadmapItem).status) {
                updateRoadmapItem({
                    id: draggedItem.active.id as number,
                    status: item.over.id as RoadmapStatus,
                })
                    .unwrap()
                    .then(() => {
                        refetchInfinityQueries(["all"]);
                    });
            }
            setDraggedItem(null);
        },
        [setDraggedItem, draggedItem, updateRoadmapItem, refetchInfinityQueries, handleColumOrderChanges]
    );

    const onDragOver = useCallback(
        (item: DragMoveEvent) => {
            handleColumOrderChanges(item);
        },
        [handleColumOrderChanges]
    );

    const dndProviderProps = useMemo(
        (): Props => ({
            onDragEnd,
            onDragStart,
            onDragOver,
        }),
        [onDragEnd, onDragStart, onDragOver]
    );

    const fetchNextPage = useCallback(
        (type: RoadmapStatus) => {
            console.log(`fetch next page (${type})`);
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

    const parseFlatMap = useCallback(
        (map: TRoadmapItem[], isLoading: boolean, hasMore: boolean, status: RoadmapStatus) => {
            const mapCache = [...map];
            if (isLoading) {
                mapCache.push({ ...LOADING_ITEM, status });
            } else if (hasMore) {
                mapCache.push({ ...LOAD_MORE_ITEM, status });
            }
            return mapCache;
        },
        []
    );

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

    const createdRows = useMemo((): RowDef => {
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
            plannedHaveMore,
            "planned"
        );
        const flatInProgress = parseFlatMap(
            inProgress?.pages.flatMap((page) => page.results) || [],
            isFetchingInProgress,
            inProgressHaveMore,
            "in_progress"
        );
        const flatCompleted = parseFlatMap(
            completed?.pages.flatMap((page) => page.results) || [],
            isFetchingCompleted,
            completedHaveMore,
            "completed"
        );
        const flatOnHold = parseFlatMap(
            onHold?.pages.flatMap((page) => page.results) || [],
            isFetchingOnHold,
            onHoldHaveMore,
            "on_hold"
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

        const cells: RowDef = {
            planned: [],
            in_progress: [],
            completed: [],
            on_hold: [],
        };

        itemArray.forEach((idx) => {
            if (flatPlanned[idx]) {
                cells.planned.push({
                    id: flatPlanned[idx].id.toString(),
                    type: getItemType(flatPlanned[idx]),
                    item: flatPlanned[idx],
                });
            }
            if (flatInProgress[idx]) {
                cells.in_progress.push({
                    id: flatInProgress[idx].id.toString(),
                    type: getItemType(flatInProgress[idx]),
                    item: flatInProgress[idx],
                });
            }
            if (flatCompleted[idx]) {
                cells.completed.push({
                    id: flatCompleted[idx].id.toString(),
                    type: getItemType(flatCompleted[idx]),
                    item: flatCompleted[idx],
                });
            }
            if (flatOnHold[idx]) {
                cells.on_hold.push({
                    id: flatOnHold[idx].id.toString(),
                    type: getItemType(flatOnHold[idx]),
                    item: flatOnHold[idx],
                });
            }
        });
        return cells;
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

    const data = useMemo(
        () =>
            columnMap
                .map((c) => ({
                    field: c.field,
                    headerName: c.label,
                    cells: createdRows[c.field] || [],
                }))
                .sort((a, b) => appliedColumnOrder.indexOf(a.field) - appliedColumnOrder.indexOf(b.field)),
        [createdRows, appliedColumnOrder]
    );

    useDebugValue({ data, hasPlannedNextPage, generateDropClassname, appliedColumnOrder });

    return {
        data,
        dndProviderProps,
        draggedItem,
        fetchNextPage,
        searchValue,
        handleChangeSearch,
        handleChangeSearchValue,
    };
};

export default useRoadmapList;
