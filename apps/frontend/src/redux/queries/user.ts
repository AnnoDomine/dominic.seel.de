import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./api/base-query";
import { LoginResponse, SingleUserItem, UserListItem } from "../../types/redux/user";
import { PaginatedResponse, PaginationQueryParams } from "../../types/common";
import { paginatedEndpoint } from "../helpers/endpoint";

const userQueries = createApi({
    reducerPath: "userQueries",
    baseQuery: baseQuery,
    tagTypes: ["User", "Users"],
    endpoints: (builder) => ({
        getUser: builder.query<LoginResponse, void, LoginResponse>({
            query: () => ({
                url: "/auth/user",
            }),
            providesTags: (result, error) => {
                if (error) {
                    return [];
                }
                if (result) {
                    return ["User"];
                }
                return [];
            },
        }),
        updateUser: builder.mutation<LoginResponse, Omit<LoginResponse, "email">>({
            query: (userData) => ({
                url: `/users/${userData.pk}/`,
                method: "PATCH",
                body: userData,
            }),
            invalidatesTags: ["User"],
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                body: {},
            }),
            invalidatesTags: () => ["User"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Optionally, you can dispatch an action to update the state after logout
                    window.location.reload(); // Reload the page to reflect the logout
                } catch (error) {
                    console.error("Logout failed:", error);
                }
            },
        }),
        listUsers: builder.query<PaginatedResponse<UserListItem>, PaginationQueryParams>({
            query: (queryParams) => ({
                url: paginatedEndpoint("/users/", queryParams),
            }),
            providesTags: (result, error, params) => {
                if (error) {
                    return [];
                }
                return result
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: "Users" as const,
                              id,
                              params: JSON.stringify({ ...params }),
                          })),
                          { type: "Users", id: "LIST", params: JSON.stringify({ ...params }) },
                      ]
                    : [{ type: "Users", id: "LIST", params: JSON.stringify({ ...params }) }];
            },
        }),
        getSingleUser: builder.query<SingleUserItem | undefined, { userId: number }>({
            query: ({ userId }) => ({
                url: `/users/${userId}/`,
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useLogoutMutation,
    useUpdateUserMutation,
    useListUsersQuery,
    useGetSingleUserQuery,
    useLazyListUsersQuery,
} = userQueries;
export default userQueries;
