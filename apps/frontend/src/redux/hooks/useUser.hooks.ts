import { useCallback, useDebugValue, useMemo } from "react";
import { useLoginMutation } from "../queries/auth";
import { useGetUserQuery, useLogoutMutation } from "../queries/user";

const useUser = () => {
    const { data: user, refetch: fetchUser } = useGetUserQuery();
    const [login] = useLoginMutation();
    const [logout] = useLogoutMutation();

    const isAuthenticated = useMemo(() => !!user, [user]);
    const userData = user;

    const handleLogin = useCallback(
        async (credentials: Record<"email" | "password", string>) => {
            await login(credentials)
                .unwrap()
                .then(() => {
                    console.log("Login successful");
                    fetchUser();
                })
                .catch((error) => {
                    console.error("Login failed:", error);
                    logout();
                });
        },
        [login, fetchUser, logout]
    );

    useDebugValue({ isAuthenticated, userData });

    return {
        isAuthenticated,
        handleLogin,
        logout,
    };
};

export default useUser;
