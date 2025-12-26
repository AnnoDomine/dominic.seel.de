import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Divider } from "@mui/material";
import { theme } from "../../../../main";
import type { RoadmapStatus, TRoadmapItem } from "../../../../types/redux/roadmap";
import RoadmapItem from "../../atoms/roadmap-item/roadmap-item";
import type { ItemDef } from "../roadmap-list/roadmap-list.hooks";

type Props = {
    field: RoadmapStatus;
    headerName: string;
    cells: ItemDef[];
    fetchNextPage: (type: RoadmapStatus) => void;
    isOverlay?: boolean;
};

export type RoadmapBoardProps = Props & { type: "status" | "item" };

const RoadmapBoard = ({ field, cells, headerName, fetchNextPage, isOverlay }: Props) => {
    const {
        setNodeRef: setDragNodeRef,
        listeners,
        attributes,
        active,
        isDragging,
    } = useDraggable({
        id: field,
        data: { field, cells, headerName, fetchNextPage: () => null, type: "status" },
    });

    const { setNodeRef: setDropNodeRef, isOver } = useDroppable({
        id: field,
        disabled: !!active && active.data.current?.status === field,
    });

    const isDropable = active && active.data.current?.status !== field;
    const isWithItemOver =
        active &&
        active.data.current?.status !== field &&
        isOver &&
        (active.data.current as TRoadmapItem & { type: "item" | "status" }).type === "item" &&
        !isDragging;

    return (
        <div
            key={field}
            style={{
                display: "flex",
                flexDirection: "column",
                boxShadow: isWithItemOver ? `inset 0px 0px 30px -2px ${theme.palette.primary.main}` : "none",
                backgroundColor: theme.palette.background.paper,
                border: isDropable
                    ? `2px dashed ${theme.palette.primary.main}`
                    : `0.5px solid ${theme.palette.divider}`,
                minHeight: "800px",
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                opacity: isOverlay || isDragging ? 0.3 : 1,
                overflow: isOverlay ? "hidden" : "auto",
            }}
            ref={setDropNodeRef}
        >
            <div
                key={`col-${field}-header`}
                style={{ fontWeight: "bold", textAlign: "center", padding: "8px", cursor: "grab" }}
                ref={setDragNodeRef}
                {...attributes}
                {...listeners}
            >
                {headerName}
            </div>
            <Divider />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    height: "100%",
                    overflow: "auto",
                    transition: "background-color 0.3s ease",
                    backgroundColor: isDropable ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,1)",
                }}
            >
                {cells.map((cell, idx) => (
                    <>
                        <RoadmapItem
                            key={cell.id}
                            type={cell.type}
                            item={cell.item}
                            triggerLoadMore={fetchNextPage}
                            status={cell.item.status}
                        />
                        {idx + 1 < cells.length && <Divider />}
                    </>
                ))}
            </div>
        </div>
    );
};

export default RoadmapBoard;
