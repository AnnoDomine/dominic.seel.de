const pathIds = {
    user: ":userId",
    project: ":projectId",
};

const routes = {
    home: "/",
    projects: "/projects",
    roadmap: "/roadmap",
    acp: "/admin-control-panel",
};

const projectRoutes = {
    project: `${pathIds.project}`,
};

const adminControlPanelRoutes = {
    users: "users",
    user_details: `users/${pathIds.user}`,
    projects: "projects",
    project_details: `projects/${pathIds.project}`,
};

const connectedRoutes = {
    acp_users: `${routes.acp}/${adminControlPanelRoutes.users}`,
    acp_user_details: `${routes.acp}/${adminControlPanelRoutes.users}/${pathIds.user}`,
    project_details: `${routes.projects}/${pathIds.project}`,
    acp_projects: `${routes.acp}/${adminControlPanelRoutes.projects}`,
    acp_project_details: `${routes.acp}/${adminControlPanelRoutes.projects}/${pathIds.project}`,
};

const getRouteWithId = (route: string, path: keyof typeof pathIds, id: string | number) => {
    return route.replace(pathIds[path], String(id));
};

export { routes, adminControlPanelRoutes, connectedRoutes, getRouteWithId, projectRoutes };

export default routes;
