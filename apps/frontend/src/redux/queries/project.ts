import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./api/base-query";
import { PaginatedResponse, PaginationQueryParams } from "../../types/common";
import { ProjectDetails, ProjectListItem } from "../../types/redux/project";
import { paginatedEndpoint } from "../helpers/endpoint";

const projectQueries = createApi({
    reducerPath: "projectQueries",
    baseQuery: baseQuery,
    tagTypes: ["Project", "Projects"],
    endpoints: (builder) => ({
        getProject: builder.query<ProjectDetails, number>({
            query: (projectId) => ({
                url: `/projects/${projectId}/`,
            }),
            providesTags: (result, error, projectId) => {
                if (error) {
                    return [];
                }
                return result ? [{ type: "Project", id: projectId }] : [];
            },
        }),
        listProjects: builder.query<PaginatedResponse<ProjectListItem>, PaginationQueryParams>({
            query: (queryParams) => ({
                url: paginatedEndpoint("/projects/", queryParams),
            }),
            providesTags: (result, error, params) => {
                if (error) {
                    return [];
                }
                return result
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: "Projects" as const,
                              id,
                              params: JSON.stringify({ ...params }),
                          })),
                          { type: "Projects", id: "LIST", params: JSON.stringify({ ...params }) },
                      ]
                    : [{ type: "Projects", id: "LIST", params: JSON.stringify({ ...params }) }];
            },
        }),
    }),
});

export const { useGetProjectQuery, useLazyListProjectsQuery } = projectQueries;

export default projectQueries;
