import { useDraggable } from "@dnd-kit/core";
import { Button, Skeleton, styled, Typography } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import type { RoadmapStatus, TRoadmapItem } from "../../../../types/redux/roadmap";
import RoadmapDetails from "../roadmap-details/roadmap-details";

const RoadmapItemContainer = styled("div")(({ theme }) => ({
    margin: theme.spacing(1, 1, 1, 1),
    padding: theme.spacing(1, 2, 1, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    transition: "background-color 0.3s ease, outline 0.3s ease, opacity 0.3s ease",
    outline: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
    opacity: 0.7,
    height: "110px",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
        outline: `2px solid ${theme.palette.primary.light}`,
        opacity: 1,
        cursor: "grab",
    },
    "&.dragged": {
        opacity: 0.3,
        cursor: "grabbing",
    },
    "&.overlay": {
        outline: `2px solid ${theme.palette.primary.light}`,
        opacity: 0.5,
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
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
    const dragProps = useDraggable({
        id: item.id,
        data: { ...item, type: "item" },
    });
    const isActiveItem = dragProps.isDragging;

    const draggingProps = {
        ref: dragProps.setNodeRef,
        className: clsx({ dragged: isActiveItem, overlay: isOverlay }),
        ...dragProps.attributes,
        ...dragProps.listeners,
    };

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
                            console.log(`load more triggered (${status})`);
                            triggerLoadMore(status);
                        }}
                    >
                        Load more...
                    </Button>
                </div>
            );
        default:
            break;
    }
    return (
        <>
            <RoadmapItemContainer
                {...draggingProps}
                key={item.id}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDetailsOpen(true);
                }}
            >
                <RoadmapItemHeader
                    variant="h4"
                    sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        textWrap: "nowrap",
                        whiteSpace: "nowrap",
                        width: "100%",
                    }}
                    title={item.title}
                >
                    {item.title}
                </RoadmapItemHeader>
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
            <RoadmapDetails item={item} open={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
        </>
    );
};

export default RoadmapItem;
