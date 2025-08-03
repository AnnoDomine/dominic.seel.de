import AutoFixHighTwoToneIcon from "@mui/icons-material/AutoFixHighTwoTone";

import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import type { ProjectListItem } from "../../../../types/redux/project";

type IconProps = {
    type: ProjectListItem["type"];
};

export const TypeIcons = ({ type }: IconProps) => {
    switch (type) {
        case "work":
            return <WorkTwoToneIcon fontSize="small" titleAccess="Work Project" />;
        case "private":
            return <HomeWorkTwoToneIcon fontSize="small" titleAccess="Private Project" />;
        case "study":
            return <SchoolTwoToneIcon fontSize="small" titleAccess="Study Project" />;
        case "other":
            return <AutoFixHighTwoToneIcon fontSize="small" titleAccess="Other Project" />;
        default:
            return null;
    }
};

const ProjectTypeIcon = ({ type }: IconProps) => (
    <strong style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <TypeIcons type={type} />
    </strong>
);

export default ProjectTypeIcon;
