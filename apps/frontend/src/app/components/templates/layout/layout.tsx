import { Outlet } from "react-router-dom";
import ContentContainer from "../../atoms/content-container/content-container";
import LayoutContainer from "../../atoms/layout-container/layout-container";
import Navigation from "../navigation/navigation";

const Layout = () => {
    return (
        <LayoutContainer>
            <Navigation />
            <ContentContainer>
                <Outlet />
            </ContentContainer>
        </LayoutContainer>
    );
};

export default Layout;
