import { styled } from "@mui/material"

const NavigationContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    width: "auto",
    height: "100%",
    backgroundColor: theme.palette.background.default,
    padding: "16px",
}))

export default NavigationContainer
