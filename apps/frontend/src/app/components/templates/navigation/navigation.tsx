import { IconButton, Menu, MenuItem } from "@mui/material"
import NavigationContainer from "../../atoms/navigation-container/navigation-container"
import Spacer from "../../atoms/spacer/spacer"
import { useNavigate } from "react-router-dom"
import { MouseEvent, useState } from "react"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded"
import routes from "../../../../utils/routes/routes"

const logo = new URL("./logo_transparent.png", import.meta.url).href

const Navigation = () => {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
    const navigate = useNavigate()

    const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(event.currentTarget)
    }
    const handleSelect = (route: string) => {
        setMenuAnchorEl(null)
        navigate(route)
    }
    return (
        <NavigationContainer>
            <img
                src={logo}
                alt="Logo"
                style={{ height: "40px", width: "40px", cursor: "pointer" }}
                onClick={() => handleSelect(routes.home)}
            />
            <Spacer />
            <IconButton
                id="navigation-menu-button"
                aria-controls={menuAnchorEl ? "navigation-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuAnchorEl ? "true" : undefined}
                onClick={handleMenuClick}
            >
                {menuAnchorEl ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
            </IconButton>
            <Menu
                id="navigation-menu"
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={() => setMenuAnchorEl(null)}
            >
                {Object.entries(routes).map(([key, route]) => (
                    <MenuItem key={key} id={`navigation-item-${key}`} onClick={() => handleSelect(route)}>
                        {key.toUpperCase()}
                    </MenuItem>
                ))}
            </Menu>
        </NavigationContainer>
    )
}

export default Navigation
