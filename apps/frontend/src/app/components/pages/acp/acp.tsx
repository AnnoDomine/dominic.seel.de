import { styled } from "@mui/material";
import useUser from "../../../../redux/hooks/useUser.hooks";
import Login from "../../organisams/login/login";
import { Outlet } from "react-router-dom";

const AcpContainer = styled("div")({
    display: "flex",
    flexDirection: "row",
    padding: "16px",
    gap: "16px",
    height: "-webkit-fill-available",
});

const Acp = () => {
    const { isAuthenticated } = useUser();
    return !isAuthenticated ? (
        <Login />
    ) : (
        <AcpContainer>
            <Outlet />
        </AcpContainer>
    );
};

export default Acp;
