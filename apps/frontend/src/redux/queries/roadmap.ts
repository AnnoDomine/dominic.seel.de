import { createApi } from "@reduxjs/toolkit/query/react";
import type { PaginationQueryParams } from "../../types/common";
import type { TRoadmapList } from "../../types/redux/roadmap";
import { paginatedEndpoint } from "../helpers/endpoint";
import baseQuery from "./api/base-query";

const roadmapQueries = createApi({
    reducerPath: "roadmap",
    baseQuery: baseQuery,
    tagTypes: ["Roadmap"],
    endpoints: (builder) => ({
        getRoadmap: builder.query<TRoadmapList, PaginationQueryParams>({
            query: (params) => ({
                url: paginatedEndpoint("roadmap", params),
            }),
            providesTags: (result, _error, params) => {
                return [
                    ...(result?.results || []).map(({ id }) => ({
                        type: "Roadmap" as const,
                        id,
                        params: JSON.stringify({ ...params }),
                    })),
                    { type: "Roadmap", id: "LIST", params: JSON.stringify({ ...params }) },
                ];
            },
        }),
    }),
});

export const { useLazyGetRoadmapQuery } = roadmapQueries;
export default roadmapQueries;
