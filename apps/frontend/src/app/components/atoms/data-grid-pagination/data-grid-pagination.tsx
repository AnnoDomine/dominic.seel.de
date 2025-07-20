import { styled, Typography } from "@mui/material";
import { gridRowCountSelector, gridRowsLoadingSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";

const DataGridPaginationContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
}));

const DataGridLoadingDot = styled("span")(({ theme }) => ({
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    animation: "blink 1.4s infinite both",
    "@keyframes blink": {
        "0%, 100%": { opacity: 0 },
        "50%": { opacity: 1 },
    },
}));

function DataGridPagination() {
    const apiRef = useGridApiContext();
    const rowCount = useGridSelector(apiRef, gridRowCountSelector);
    const isLoading = useGridSelector(apiRef, gridRowsLoadingSelector);
    return (
        <DataGridPaginationContainer>
            <Typography>{isLoading ? <DataGridLoadingDot /> : ""}</Typography>
            <Typography>Total rows: {rowCount}</Typography>
        </DataGridPaginationContainer>
    );
}

export default DataGridPagination;
