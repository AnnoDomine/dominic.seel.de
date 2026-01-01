import { styled } from "@mui/material";

const LayoutContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.default,
    overflow: "auto",
}));

export default LayoutContainer;
