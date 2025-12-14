import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { connectedRoutes, getRouteWithId } from "../../../../utils/routes/routes";
import useProjectList from "../project-list/project-list.hooks";

const ProjectAcpList = () => {
    const { dataGridParams } = useProjectList();
    const navigate = useNavigate();
    return (
        <DataGrid
            disableRowSelectionOnClick
            onRowClick={(params, event) => {
                event.preventDefault();
                navigate(getRouteWithId(connectedRoutes.acp_project_details, "project", params.id));
            }}
            sx={{
                "& .pointer": {
                    cursor: "pointer",
                },
            }}
            {...dataGridParams}
        />
    );
};

export default ProjectAcpList;
