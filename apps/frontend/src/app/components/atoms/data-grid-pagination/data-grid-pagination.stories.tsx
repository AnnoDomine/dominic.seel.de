import { DataGrid } from "@mui/x-data-grid";
import type { Meta, StoryObj } from "@storybook/react";
import DataGridPagination from "./data-grid-pagination";

const meta: Meta<typeof DataGridPagination> = {
    component: DataGridPagination,
    title: "Atoms/DataGridPagination",
    decorators: [
        (Story) => (
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={[]}
                    columns={[{ field: "col1", headerName: "Column 1", width: 150 }]}
                    slots={{
                        pagination: Story,
                    }}
                    pagination
                />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof DataGridPagination>;

export const Default: Story = {};
