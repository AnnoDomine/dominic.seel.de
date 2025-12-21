import { useCallback, useDebugValue } from "react";
import { useLoginMutation } from "../queries/auth";
import { useLazyGetUserQuery, useLogoutMutation } from "../queries/user";

const useUser = () => {
    const [fetchUser, { data: user }] = useLazyGetUserQuery();
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
