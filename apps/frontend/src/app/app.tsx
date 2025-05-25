import styled from "@emotion/styled"
import NxWelcome from "./nx-welcome"

import { Route, Routes, Link } from "react-router-dom"

const StyledApp = styled.div`
    // Your style here
`

export function App() {
    return (
        <StyledApp>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            This is the generated root route. <Link to="/page-2">Click here for page 2.</Link>
                        </div>
                    }
                />
                <Route
                    path="/page-2"
                    element={
                        <div>
                            <Link to="/">Click here to go back to root page.</Link>
                        </div>
                    }
                />
            </Routes>
        </StyledApp>
    )
}

export default App
