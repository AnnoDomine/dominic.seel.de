import type { Active, CollisionDetection, DroppableContainer } from "@dnd-kit/core";
import { DndContext, DragOverlay, pointerWithin, rectIntersection } from "@dnd-kit/core";
import type { RectMap } from "@dnd-kit/core/dist/store";
import type { ClientRect, Coordinates } from "@dnd-kit/core/dist/types";
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
    const { dndProviderProps, draggedItem, data, fetchNextPage } = useRoadmapList();
    return (
        <DndContext {...dndProviderProps} collisionDetection={customCollisionDetectionAlgorithm}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    margin: "16px",
                    border: "1px solid #ccc",
                    height: "100%",
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
    );
};

export default RoadmapList;
