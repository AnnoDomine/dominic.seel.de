import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";
import ContentContainer from "../../atoms/content-container/content-container";
import LayoutContainer from "../../atoms/layout-container/layout-container";
import Loading from "../../molecules/loading/loading";
import Navigation from "../navigation/navigation";

const Layout = () => {
    return (
        <LayoutContainer>
            <Navigation />
            <ContentContainer>
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
            </ContentContainer>
        </LayoutContainer>
    );
};

export default Layout;
