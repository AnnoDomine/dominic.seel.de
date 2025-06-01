"use client"

import styled from "@emotion/styled"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/templates/layout/layout"
import routes from "../utils/routes/routes"
import Home from "./components/pages/home/home"
import Projects from "./components/pages/projects/projects"
import Acp from "./components/pages/acp/acp"

const StyledApp = styled.div`
    width: -webkit-fill-available;
    height: -webkit-fill-available;
`

export function App() {
    return (
        <StyledApp>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="" element={<Home />} />
                    <Route path={routes.projects} element={<Projects />} />
                    <Route path={routes.roadmap} element={<div>Roadmap Page</div>} />
                    <Route path={routes["admin-control-panel"]} element={<Acp />} />
                    {/* Add more routes as needed */}
                    {/* Catch-all route for 404 Not Found */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>
            </Routes>
        </StyledApp>
    )
}

export default App
