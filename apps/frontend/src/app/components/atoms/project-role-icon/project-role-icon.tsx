import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import DnsTwoToneIcon from "@mui/icons-material/DnsTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import ArchitectureTwoToneIcon from "@mui/icons-material/ArchitectureTwoTone";
import ApartmentTwoToneIcon from "@mui/icons-material/ApartmentTwoTone";
import Diversity3TwoToneIcon from "@mui/icons-material/Diversity3TwoTone";

import { ProjectDetails } from "../../../../types/redux/project";

type Props = {
    role: ProjectDetails["role"];
};

const ProjectRoleIcon = ({ role }: Props) => {
    switch (role) {
        case "frontend":
            return <PublicTwoToneIcon fontSize="small" titleAccess="Frontend Developer" />;
        case "backend":
            return <DnsTwoToneIcon fontSize="small" titleAccess="Backend Developer" />;
        case "full_stack":
            return <AccountTreeTwoToneIcon fontSize="small" titleAccess="Full Stack Developer" />;
        case "devops":
            return <ManageAccountsTwoToneIcon fontSize="small" titleAccess="DevOps Engineer" />;
        case "designer":
            return <ArchitectureTwoToneIcon fontSize="small" titleAccess="Designer" />;
        case "pm":
            return <ApartmentTwoToneIcon fontSize="small" titleAccess="Project Manager" />;
        case "other":
            return <Diversity3TwoToneIcon fontSize="small" titleAccess="Other Role" />;
        default:
            return null;
    }
};

export default ProjectRoleIcon;
