import { FC } from "react";
import routes from "../../../../utils/routes/routes";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import RouteTwoToneIcon from "@mui/icons-material/RouteTwoTone";
import HttpsTwoToneIcon from "@mui/icons-material/HttpsTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import useUser from "../../../../redux/hooks/useUser.hooks";

type Props = {
    type: keyof typeof routes;
};

const NavigationIcon: FC<Props> = ({ type }) => {
    const { isAuthenticated } = useUser();
    switch (type) {
        case "home":
            return <HomeTwoToneIcon />;
        case "projects":
            return <AccountTreeTwoToneIcon />;
        case "roadmap":
            return <RouteTwoToneIcon />;
        case "acp":
            return isAuthenticated ? <LockOpenTwoToneIcon /> : <HttpsTwoToneIcon />;
        default:
            return null;
    }
};

export default NavigationIcon;
