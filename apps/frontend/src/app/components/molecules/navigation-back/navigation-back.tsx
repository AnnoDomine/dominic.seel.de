import { Button, Divider, styled } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceTwoToneIcon from "@mui/icons-material/KeyboardBackspaceTwoTone";

const NavigationBackContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    padding: "0 8px",
    width: "100%",
    gap: "16px",
    height: "-webkit-fill-available",
});

const OutletContainer = styled("div")({
    flex: 1,
    padding: "0px",
    height: "-webkit-fill-available",
});

const NavigationBack = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const splitByParams = location.pathname.split("?");
        const pathWithoutParams = splitByParams[0];
        const splitByRoute = pathWithoutParams.split("/");
        const routeOneLevelUp = splitByRoute.slice(0, -1).join("/");
        navigate(routeOneLevelUp);
    };

    return (
        <NavigationBackContainer>
            <div>
                <Button onClick={handleBack} startIcon={<KeyboardBackspaceTwoToneIcon />}>
                    Back
                </Button>
            </div>
            <Divider />
            <OutletContainer>
                <Outlet />
            </OutletContainer>
        </NavigationBackContainer>
    );
};

export default NavigationBack;
