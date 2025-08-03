"use client";

import styled from "@emotion/styled";
import { Route, Routes } from "react-router-dom";
import routes, { adminControlPanelRoutes, projectRoutes } from "../utils/routes/routes";
import NavigationBack from "./components/molecules/navigation-back/navigation-back";
import ProjectDetails from "./components/molecules/project-details/project-details";
import UserDetails from "./components/molecules/user-details/user-details";
import UserList from "./components/molecules/user-list/user-list";
import AcpNavigation from "./components/organisams/acp-navigation/acp-navigation";
import Acp from "./components/pages/acp/acp";
import Home from "./components/pages/home/home";
import Projects from "./components/pages/projects/projects";
import Layout from "./components/templates/layout/layout";

const StyledApp = styled.div`
    width: -webkit-fill-available;
    height: -webkit-fill-available;
`;

export function App() {
    return (
        <StyledApp>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="" element={<Home />} />
                    <Route path={routes.projects}>
                        <Route index element={<Projects />} />
                        <Route path="*" element={<NavigationBack />}>
                            <Route path={projectRoutes.project} element={<ProjectDetails />} />
                        </Route>
                    </Route>
                    <Route path={routes.roadmap} element={<div>Roadmap Page</div>} />
                    <Route path={routes.acp} element={<Acp />}>
                        <Route index element={<AcpNavigation />} />
                        <Route path="*" element={<NavigationBack />}>
                            <Route path={adminControlPanelRoutes.users} element={<UserList />} />
                            <Route path={adminControlPanelRoutes.user_details} element={<UserDetails />} />
                        </Route>
                    </Route>
                    {/* Add more routes as needed */}
                    {/* Catch-all route for 404 Not Found */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>
            </Routes>
        </StyledApp>
    );
}

export default App;
