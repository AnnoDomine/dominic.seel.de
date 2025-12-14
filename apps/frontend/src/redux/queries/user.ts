import { createApi } from "@reduxjs/toolkit/query/react";
import type { PaginatedResponse, PaginationQueryParams } from "../../types/common";
import type { LoginResponse, SingleUserItem, UserListItem } from "../../types/redux/user";
import { paginatedEndpoint } from "../helpers/endpoint";
import baseQuery from "./api/base-query";

const userQueries = createApi({
    reducerPath: "userQueries",
    baseQuery: baseQuery,
    tagTypes: ["User", "Users", "SingleUser"],
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
        updateUser: builder.mutation<
            SingleUserItem,
            Partial<Omit<SingleUserItem, "email">> & Pick<SingleUserItem, "id">
        >({
            query: (userData) => ({
                url: `/users/${userData.id}/`,
                method: "PATCH",
                body: userData,
            }),
            invalidatesTags: ["User", "Users", "SingleUser"],
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                // Optimistic update entry
                const patchedResult = dispatch(
                    userQueries.util.updateQueryData("getSingleUser", { userId: args.id }, (draft) => {
                        Object.assign(draft || {}, args);
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchedResult.undo();
                    console.error("Error updating user:", error);
                }
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                body: {},
            }),
            invalidatesTags: () => ["User"],
            async onQueryStarted(_, { queryFulfilled }) {
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
            providesTags: (result, error, { userId }) => {
                if (error) {
                    return [];
                }
                if (result) {
                    return [{ type: "SingleUser", id: userId }];
                }
                return [];
            },
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
