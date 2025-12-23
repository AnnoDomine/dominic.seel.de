import { Button, styled } from "@mui/material";
import { useNavigate } from "react-router";
import { ACP_NAVIGATION_ITEMS } from "./acp-navigation.constants";

const AcpNavigationContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    padding: "0px 16px",
    gap: "16px",
    height: "100%",
    width: "100%",
});

const AcpNavigation = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <AcpNavigationContainer>
            {ACP_NAVIGATION_ITEMS.map((item) => (
                <Button
                    key={item.label}
                    variant="contained"
                    color="primary"
                    onClick={() => handleNavigation(item.path)}
                    fullWidth
                >
                    {item.label}
                </Button>
            ))}
        </AcpNavigationContainer>
    );
};

export default AcpNavigation;
