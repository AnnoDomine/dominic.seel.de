import { createApi } from "@reduxjs/toolkit/query/react";
import type { LoginPayload } from "../../types/redux/user";
import baseQuery from "./api/base-query";

const authQueries = createApi({
    reducerPath: "authQuery",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<void, LoginPayload>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = authQueries;
export default authQueries;
