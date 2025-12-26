import type { Active, CollisionDetection, DroppableContainer } from "@dnd-kit/core";
import {
    DndContext,
    DragOverlay,
    MouseSensor,
    pointerWithin,
    rectIntersection,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import type { RectMap } from "@dnd-kit/core/dist/store";
import type { ClientRect, Coordinates } from "@dnd-kit/core/dist/types";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { IconButton, TextField } from "@mui/material";
import { theme } from "../../../../main";
import type { TRoadmapItem } from "../../../../types/redux/roadmap";
import RoadmapItem from "../../atoms/roadmap-item/roadmap-item";
import type { RoadmapBoardProps } from "../roadmap-board/roadmap-board";
import RoadmapBoard from "../roadmap-board/roadmap-board";
import useRoadmapList from "./roadmap-list.hooks";

type CollisionDetectionArgs = {
    active: Active;
    collisionRect: ClientRect;
    droppableRects: RectMap;
    droppableContainers: DroppableContainer[];
    pointerCoordinates: Coordinates | null;
};

const customCollisionDetectionAlgorithm: CollisionDetection = (args: CollisionDetectionArgs) => {
    // First, let's see if there are any collisions with the pointer
    const pointerCollisions = pointerWithin(args);

    // Collision detection algorithms return an array of collisions
    if (pointerCollisions.length > 0) {
        return pointerCollisions;
    }

    // If there are no collisions with the pointer, return rectangle intersections
    return rectIntersection(args);
};

const RoadmapList = () => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });
    const sensors = useSensors(mouseSensor, touchSensor);
    const {
        dndProviderProps,
        draggedItem,
        data,
        fetchNextPage,
        searchValue,
        handleChangeSearch,
        handleChangeSearchValue,
    } = useRoadmapList();
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: theme.spacing(0, 2),
                height: "100%",
                overflow: "clip",
                gap: "8px",
            }}
        >
            <div>
                <TextField
                    value={searchValue}
                    onChange={handleChangeSearch}
                    variant="standard"
                    placeholder="Search..."
                    slotProps={{
                        input: {
                            startAdornment: !searchValue ? (
                                <SearchTwoToneIcon color="primary" sx={{ marginRight: "8px" }} fontSize="small" />
                            ) : undefined,
                            endAdornment: searchValue ? (
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleChangeSearchValue("");
                                    }}
                                    size="small"
                                    sx={{ marginLeft: "8px" }}
                                >
                                    <ClearTwoToneIcon color="primary" fontSize="small" />
                                </IconButton>
                            ) : undefined,
                        },
                    }}
                />
            </div>
            <DndContext {...dndProviderProps} sensors={sensors} collisionDetection={customCollisionDetectionAlgorithm}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        border: "1px solid #ccc",
                        flex: 1,
                        minHeight: 0,
                    }}
                >
                    {data.map((col) => (
                        <RoadmapBoard key={col.field} {...col} fetchNextPage={fetchNextPage} />
                    ))}
                </div>
                {draggedItem && (
                    <DragOverlay>
                        {(draggedItem.active.data.current as RoadmapBoardProps).type === "status" ? (
                            <RoadmapBoard
                                key={(draggedItem.active.data.current as RoadmapBoardProps).field}
                                {...(draggedItem.active.data.current as RoadmapBoardProps)}
                                isOverlay
                            />
                        ) : (
                            <RoadmapItem
                                isOverlay
                                type="item"
                                item={draggedItem.active.data.current as TRoadmapItem}
                                triggerLoadMore={() => null}
                                status={(draggedItem.active.data.current as TRoadmapItem).status}
                            />
                        )}
                    </DragOverlay>
                )}
            </DndContext>
        </div>
    );
};

export default RoadmapList;
