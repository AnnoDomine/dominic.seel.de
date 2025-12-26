import { styled } from "@mui/material";

const ContentContainer = styled("div", {
    name: "content-container",
})(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "-webkit-fill-available",
    height: "-webkit-fill-available",
    backgroundColor: theme.palette.background.default,
    padding: "16px",
    overflow: "hidden",
}));

export default ContentContainer;
