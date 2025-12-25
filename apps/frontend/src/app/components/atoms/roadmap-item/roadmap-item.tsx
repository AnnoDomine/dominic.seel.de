import { Button, Paper, Skeleton, styled, Typography } from "@mui/material";
import type { RoadmapStatus, TRoadmapItem } from "../../../../types/redux/roadmap";

const RoadmapItemContainer = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "90px",
}));

const RoadmapItemHeader = styled(Typography)();

const RoadmapItemCreated = styled(Typography)();

const RoadmapItemUpdated = styled(Typography)();

const RoadmapItemTarget = styled(Typography)();

type Props = {
    type: "item" | "loading" | "load_more";
    item: TRoadmapItem;
    status: RoadmapStatus;
    triggerLoadMore: (type: RoadmapStatus) => void;
};

const RoadmapItem = ({ type, item, triggerLoadMore, status }: Props) => {
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
        default:
            break;
    }
    return (
        <RoadmapItemContainer>
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
