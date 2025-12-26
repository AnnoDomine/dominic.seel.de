import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Button, Skeleton, styled, Typography } from "@mui/material";
import clsx from "clsx";
import type { RoadmapStatus, TRoadmapItem } from "../../../../types/redux/roadmap";

const RoadmapItemContainer = styled("div")(({ theme }) => ({
    margin: theme.spacing(1, 0, 1, 0),
    padding: theme.spacing(1, 4, 1, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    transition: "background-color 0.3s ease border 0.3s ease opacity 0.3s ease",
    border: "2px solid rgba(255,255,255,1)",
    backgroundColor: "rgba(255,255,255,1)",
    opacity: 0.7,
    height: "90px",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
        border: "2px solid rgba(255,255,255,0.5)",
        opacity: 1,
    },
    "&.dragged": {
        opacity: 0.3,
    },
    "&.overlay": {
        opacity: 0.5,
    },
    "&.dropable": {
        borderColor: "rgba(20,234,1,1)",
    },
    "&.over": {
        borderColor: "rgba(25,142,33,1)",
        backgroundColor: "rgba(20,234,1,0.3)",
    },
    "&.invisible": {
        visibility: "hidden",
    },
}));

const RoadmapItemHeader = styled(Typography)();

const RoadmapItemCreated = styled(Typography)();

const RoadmapItemUpdated = styled(Typography)();

const RoadmapItemTarget = styled(Typography)();

type Props = {
    type: "item" | "loading" | "load_more" | "fake";
    item: TRoadmapItem;
    status: RoadmapStatus;
    triggerLoadMore: (type: RoadmapStatus) => void;
    isOverlay?: boolean;
};

const RoadmapItem = ({ type, item, triggerLoadMore, status, isOverlay }: Props) => {
    const dragProps = useDraggable({
        id: item.id,
        data: item,
    });
    const dropProps = useDroppable({
        id: item.id,
        data: item,
    });
    const isActiveItem = dragProps.isDragging;
    const disableDrag = !isActiveItem && dragProps.active?.id !== dragProps.over?.id;

    const draggingProps = {
        ref: dragProps.setNodeRef,
        className: clsx({ dragged: isActiveItem, overlay: isOverlay }),
        ...dragProps.attributes,
        ...dragProps.listeners,
    };

    const droppingProps = {
        ref: dropProps.setNodeRef,
        className: clsx({
            dropable: dragProps.active && dragProps.active.id !== item.id,
            over: item.id === dropProps.over?.id,
        }),
    };

    const usedProps = disableDrag ? droppingProps : draggingProps;

    switch (type) {
        case "loading":
            return (
                <RoadmapItemContainer>
                    <RoadmapItemHeader variant="h4">
                        <Skeleton variant="text" width={300} />
                    </RoadmapItemHeader>
                    <RoadmapItemTarget variant="body1" sx={{ display: "flex", gap: "8px" }}>
                        Target: <Skeleton variant="text" width={100} />
                    </RoadmapItemTarget>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <RoadmapItemCreated variant="caption" sx={{ display: "flex", gap: "8px" }}>
                            Created: <Skeleton variant="text" width={100} />
                        </RoadmapItemCreated>
                        <RoadmapItemUpdated variant="caption" sx={{ display: "flex", gap: "8px" }}>
                            Updated: <Skeleton variant="text" width={100} />
                        </RoadmapItemUpdated>
                    </div>
                </RoadmapItemContainer>
            );
        case "load_more":
            return (
                <div
                    style={{
                        margin: "8px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            triggerLoadMore(status);
                        }}
                    >
                        Load more...
                    </Button>
                </div>
            );
        case "fake": {
            return <RoadmapItemContainer {...droppingProps} className="invisible" />;
        }
        default:
            break;
    }
    return (
        <RoadmapItemContainer {...usedProps} key={item.id}>
            <RoadmapItemHeader variant="h4">{item.title}</RoadmapItemHeader>
            <RoadmapItemTarget variant="body1">
                Target: {new Date(item.target_date).toLocaleDateString()}
            </RoadmapItemTarget>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <RoadmapItemCreated variant="caption">
                    Created: {new Date(item.created_at).toLocaleDateString()}
                </RoadmapItemCreated>
                <RoadmapItemUpdated variant="caption">
                    Updated: {new Date(item.updated_at).toLocaleDateString()}
                </RoadmapItemUpdated>
            </div>
        </RoadmapItemContainer>
    );
};

export default RoadmapItem;
