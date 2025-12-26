import { createApi } from "@reduxjs/toolkit/query/react";
import type { PaginationQueryParams } from "../../types/common";
import type { TRoadmapItem, TRoadmapList } from "../../types/redux/roadmap";
import { paginatedEndpoint } from "../helpers/endpoint";
import baseQuery from "./api/base-query";

const roadmapQueries = createApi({
    reducerPath: "roadmap",
    baseQuery: baseQuery,
    tagTypes: ["Roadmap"],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        listRoadmap: builder.infiniteQuery<
            TRoadmapList,
            Omit<PaginationQueryParams, "page" | "page_size">,
            Pick<PaginationQueryParams, "page" | "page_size">
        >({
            query: ({ queryArg: { filters, ...args }, pageParam }) => ({
                url: paginatedEndpoint("/roadmap/", {}),
                params: { ...pageParam, ...args, ...filters },
            }),
            infiniteQueryOptions: {
                getNextPageParam: (lastPage) => {
                    const next = lastPage.next;
                    if (!next) return undefined;
                    // We only need the params, so we extract them from the next url
                    const splitedNext = new URLSearchParams(next.split("?")[1]);
                    const page = splitedNext.get("page");
                    const page_size = splitedNext.get("page_size");
                    return {
                        page: page ? Number(page) : undefined,
                        page_size: page_size ? Number(page_size) : undefined,
                    };
                },
                initialPageParam: {
                    page: 1,
                    page_size: 25,
                },
            },
        }),
        partialUpdateRoadmapItem: builder.mutation<TRoadmapItem, Partial<TRoadmapItem> & Pick<TRoadmapItem, "id">>({
            query: (roadmapData) => ({
                url: `/roadmap/${roadmapData.id}/`,
                method: "PATCH",
                body: roadmapData,
            }),
        }),
    }),
});

export const { useListRoadmapInfiniteQuery, usePartialUpdateRoadmapItemMutation } = roadmapQueries;
export default roadmapQueries;
