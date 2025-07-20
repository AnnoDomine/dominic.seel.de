import { connectedRoutes } from "../../../../utils/routes/routes";

export const ACP_NAVIGATION_ITEMS: Array<Record<"label" | "path", string>> = [
    {
        label: "Users",
        path: connectedRoutes.acp_users,
    },
];
