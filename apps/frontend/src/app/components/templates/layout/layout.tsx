import { Outlet } from "react-router-dom"
import Navigation from "../navigation/navigation"
import LayoutContainer from "../../atoms/layout-container/layout-container"

const Layout = () => {
    return (
        <>
            <Navigation />
            <LayoutContainer>
                <Outlet />
            </LayoutContainer>
        </>
    )
}

export default Layout
