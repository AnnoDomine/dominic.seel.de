import { styled } from "@mui/material"

const LayoutContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "-webkit-fill-available",
    height: "-webkit-fill-available",
    backgroundColor: theme.palette.background.default,
}))

export default LayoutContainer
