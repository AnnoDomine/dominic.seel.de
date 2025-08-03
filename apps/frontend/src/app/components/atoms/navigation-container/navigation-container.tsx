import { AppBar, styled } from "@mui/material"

const NavigationContainer = styled(AppBar)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    padding: "16px",
    borderBottom: `1px solid ${theme.palette.divider}`,
}))

export default NavigationContainer
