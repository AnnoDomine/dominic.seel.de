import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./api/base-query";
import { TechnologyListItem } from "../../types/redux/technology";

const technologyQueries = createApi({
    reducerPath: "technologyQueries",
    baseQuery: baseQuery,
    tagTypes: ["Technologies"],
    endpoints: (builder) => ({
        listTechnologies: builder.query<TechnologyListItem[], void>({
            query: () => ({
                url: "/technologies/",
            }),
            providesTags: (result, error) => {
                if (error) {
                    return [];
                }
                return result ? result.map((item) => ({ type: "Technologies" as const, id: item.id })) : [];
            },
        }),
    }),
});

export const { useListTechnologiesQuery } = technologyQueries;

export default technologyQueries;
