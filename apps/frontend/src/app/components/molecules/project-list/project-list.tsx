import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { connectedRoutes, getRouteWithId } from "../../../../utils/routes/routes";
import useProjectList from "./project-list.hooks";

const ProjectList = () => {
    const { dataGridParams } = useProjectList();
    const navigate = useNavigate();
    return (
        <DataGrid
            disableRowSelectionOnClick
            onRowClick={(params, event) => {
                event.preventDefault();
                navigate(getRouteWithId(connectedRoutes.project_details, "project", params.id));
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

export default ProjectList;
