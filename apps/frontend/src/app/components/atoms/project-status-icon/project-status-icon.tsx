import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveTwoTone";
import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone";
import type { ProjectListItem } from "../../../../types/redux/project";

type Props = {
    status: ProjectListItem["status"];
};

export const StatusIcon = ({ status }: Props) => {
    switch (status) {
        case "active":
            return <DesignServicesTwoToneIcon fontSize="small" titleAccess="Active Project" />;
        case "archived":
            return <ArchiveTwoToneIcon fontSize="small" titleAccess="Archived Project" />;
        case "concept":
            return <AccessTimeTwoToneIcon fontSize="small" titleAccess="Concept Project" />;
        default:
            return null;
    }
};

const ProjectStatusIcon = ({ status }: Props) => (
    <strong style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <StatusIcon status={status} />
    </strong>
);

export default ProjectStatusIcon;
