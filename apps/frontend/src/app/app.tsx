import styled from "@emotion/styled"
import { Route, Routes, Link } from "react-router-dom"
import Layout from "./components/templates/layout/layout"
import routes from "../utils/routes/routes"

const StyledApp = styled.div`
    width: 100%;
    height: 100%;
`

export function App() {
    return (
        <StyledApp>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="" element={<div>Home Page</div>} />
                    <Route path={routes.projects} element={<div>Project Page</div>} />
                    <Route path={routes.roadmap} element={<div>Roadmap Page</div>} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>
            </Routes>
        </StyledApp>
    )
}

export default App
