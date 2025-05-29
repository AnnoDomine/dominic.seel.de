import { styled } from "@mui/material"

const LayoutContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "auto",
    height: "-webkit-fill-available",
    backgroundColor: theme.palette.background.default,
    padding: "16px",
}))

export default LayoutContainer
