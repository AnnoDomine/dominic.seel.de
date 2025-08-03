import { DataGrid } from "@mui/x-data-grid";
import useRoadmapList from "./roadmap-list.hooks";

const RoadmapList = () => {
    const { dataGridParams } = useRoadmapList();
    return (
        <DataGrid
            disableRowSelectionOnClick
            sx={{
                "& .pointer": {
                    cursor: "pointer",
                },
            }}
            {...dataGridParams}
        />
    );
};

export default RoadmapList;
