import { useCallback, useDebugValue } from "react";
import { useLoginMutation } from "../queries/auth";
import { useGetUserQuery, useLogoutMutation } from "../queries/user";

const useUser = () => {
    const { data: user, refetch } = useGetUserQuery();
    const [login] = useLoginMutation();
    const [logout] = useLogoutMutation();

    const isAuthenticated = Boolean(user);
    const userData = user;

    const handleLogin = useCallback(
        async (credentials: Record<"email" | "password", string>) => {
            await login(credentials)
                .unwrap()
                .then(() => {
                    console.log("Login successful");
                    refetch();
                })
                .catch((error) => {
                    console.error("Login failed:", error);
                    logout();
                });
        },
        [login, refetch, logout]
    );

    useDebugValue({ isAuthenticated, userData });

    return {
        isAuthenticated,
        userData,
        getUser: refetch,
        handleLogin,
        logout,
    };
};

export default useUser;
