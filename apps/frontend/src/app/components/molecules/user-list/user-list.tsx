import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { connectedRoutes, getRouteWithId } from "../../../../utils/routes/routes";
import useUserList from "./user-list.hooks";

const UserList = () => {
    const { dataGridParams } = useUserList();
    const navigate = useNavigate();
    return (
        <DataGrid
            disableRowSelectionOnClick
            onRowClick={(params, event) => {
                event.preventDefault();
                navigate(getRouteWithId(connectedRoutes.acp_user_details, "user", params.id));
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

export default UserList;
