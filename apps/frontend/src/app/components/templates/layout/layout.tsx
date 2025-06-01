import { Outlet } from "react-router-dom"
import Navigation from "../navigation/navigation"
import LayoutContainer from "../../atoms/layout-container/layout-container"
import ContentContainer from "../../atoms/content-container/content-container"

const Layout = () => {
    return (
        <LayoutContainer>
            <Navigation />
            <ContentContainer>
                <Outlet />
            </ContentContainer>
        </LayoutContainer>
    )
}

export default Layout
