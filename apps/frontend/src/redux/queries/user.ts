import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "./api/base-query"
import { LoginResponse } from "../../types/redux/user"

const userQueries = createApi({
    reducerPath: "userQueries",
    baseQuery: baseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query<LoginResponse, void, LoginResponse>({
            query: () => ({
                url: "/auth/user",
            }),
            providesTags: (result, error) => {
                if (error) {
                    return []
                }
                if (result) {
                    return ["User"]
                }
                return []
            },
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
                    await queryFulfilled
                    // Optionally, you can dispatch an action to update the state after logout
                    window.location.reload() // Reload the page to reflect the logout
                } catch (error) {
                    console.error("Logout failed:", error)
                }
            },
        }),
    }),
})

export const { useGetUserQuery, useLogoutMutation } = userQueries
export default userQueries
