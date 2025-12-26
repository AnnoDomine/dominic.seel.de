import { DndContext, DragOverlay } from "@dnd-kit/core";
import { DataGrid } from "@mui/x-data-grid";
import type { TRoadmapItem } from "../../../../types/redux/roadmap";
import RoadmapItem from "../../atoms/roadmap-item/roadmap-item";
import type { ItemDef, RowDef } from "./roadmap-list.hooks";
import useRoadmapList from "./roadmap-list.hooks";

const RoadmapList = () => {
    const { dataGridParams, dndProviderProps, draggedItem } = useRoadmapList();
    const headers = dataGridParams.columns.map((col) => col.headerName);
    const content = dataGridParams.columns.map(
        (col, idx) => (dataGridParams.rows || []).filter((cell) => cell[col.field as keyof RowDef])[idx]?.id
    );
    console.log(content);
    return (
        <DndContext {...dndProviderProps}>
            <div>
                <div>{dataGridParams.columns.map((col) => col.headerName)}</div>
                <div>
                    {dataGridParams.columns.map((col, idx) => (
                        <div key={`column-${col.field}`}>
                            {
                                (
                                    (dataGridParams.rows || []).filter((cell) => cell[col.field as keyof RowDef])[idx][
                                        col.field as keyof RowDef
                                    ] as ItemDef | null
                                )?.item.title
                            }
                        </div>
                    ))}
                </div>
            </div>
            <DataGrid disableRowSelectionOnClick {...dataGridParams} />
            {draggedItem && (
                <DragOverlay>
                    <RoadmapItem
                        isOverlay
                        type="item"
                        item={draggedItem.active.data.current as TRoadmapItem}
                        triggerLoadMore={() => null}
                        status={(draggedItem.active.data.current as TRoadmapItem).status}
                    />
                </DragOverlay>
            )}
        </DndContext>
    );
};

export default RoadmapList;
