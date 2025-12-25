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
                "& .MuiDataGrid-row": {
                    height: "130px !important",
                    "--height": "130px !important",
                    maxHeight: "130px !important",
                },
                "& .MuiDataGrid-virtualScrollerContent": {
                    flexBasis: "130px !important",
                },
            }}
            {...dataGridParams}
        />
    );
};

export default RoadmapList;
