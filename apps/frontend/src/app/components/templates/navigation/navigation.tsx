import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import NavigationContainer from "../../atoms/navigation-container/navigation-container";
import Spacer from "../../atoms/spacer/spacer";
import { useLocation, useNavigate } from "react-router-dom";
import { MouseEvent, useMemo, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import routes from "../../../../utils/routes/routes";
import NavigationIcon from "../../molecules/navigation-icon/navigation-icon";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import useUser from "../../../../redux/hooks/useUser.hooks";
import { useGetUserQuery } from "../../../../redux/queries/user";

const logo = new URL("./logo_transparent.png", import.meta.url).href;

const Navigation = () => {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const { isAuthenticated, logout } = useUser();

    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (route: string) => location.pathname === route;

    const getPath = (pathname: string) => {
        const paths = pathname.split("/").filter((path) => path);
        if (paths.length === 0) return "home";
        return paths.join(" - ");
    };

    const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };
    const handleSelect = (route: string) => {
        setMenuAnchorEl(null);
        navigate(route);
    };

    const generatedMenuItems = useMemo(() => {
        const unAuthNavigation = Object.entries(routes).map(([key, route]) => (
            <MenuItem
                key={key}
                id={`navigation-item-${key}`}
                onClick={() => handleSelect(route)}
                selected={isActive(route)}
            >
                <ListItemIcon>
                    <NavigationIcon type={key as keyof typeof routes} />
                </ListItemIcon>
                <ListItemText>{key.toUpperCase()}</ListItemText>
            </MenuItem>
        ));
        const authNavigation = isAuthenticated
            ? [
                  <Divider key="divider" sx={{ my: 1 }} />,
                  <MenuItem
                      key="logout"
                      id="navigation-item-logout"
                      onClick={() => {
                          logout();
                          navigate(routes.home);
                      }}
                  >
                      <ListItemIcon>
                          <LogoutTwoToneIcon />
                      </ListItemIcon>
                      <ListItemText>LOGOUT</ListItemText>
                  </MenuItem>,
              ]
            : [];
        return [...unAuthNavigation, ...authNavigation];
    }, [isAuthenticated, logout, navigate, routes, isActive, handleSelect]);

    return (
        <NavigationContainer position="static" color="default" enableColorOnDark>
            <img
                src={logo}
                alt="Logo"
                style={{ height: "40px", width: "40px", cursor: "pointer" }}
                onClick={() => handleSelect(routes.home)}
            />
            <Spacer />
            <Typography
                variant="h6"
                component="div"
                sx={{
                    flexGrow: 1,
                    margin: "auto",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                }}
                title={getPath(location.pathname).toUpperCase()}
            >
                {getPath(location.pathname).toUpperCase()}
            </Typography>
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
                {generatedMenuItems}
            </Menu>
        </NavigationContainer>
    );
};

export default Navigation;
