import { Dialog, DialogContent, Divider, Typography } from "@mui/material";
import type { TRoadmapItem } from "../../../../types/redux/roadmap";

type Props = {
    item: TRoadmapItem;
    open: boolean;
    onClose: () => void;
};

const RoadmapDetails = ({ item, ...props }: Props) => {
    const { title, description, target_date, status, related_project } = item;
    const isTargetDateAfterToday = new Date(item.target_date) > new Date();
    const formatedStatus = (status.charAt(0).toUpperCase() + status.slice(1)).replace("_", " ");
    if (!props.open) {
        return null;
    }
    return (
        <Dialog {...props}>
            <DialogContent dividers>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="caption">
                            Created: {new Date(item.created_at).toLocaleDateString()}
                        </Typography>
                        <Typography>{formatedStatus}</Typography>
                        <Typography variant="caption">
                            Updated: {new Date(item.updated_at).toLocaleDateString()}
                        </Typography>
                    </div>
                    <Divider></Divider>
                    <Typography variant="h4" align="center" fontWeight={600}>
                        {title}
                    </Typography>
                    <Divider></Divider>
                    <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: description }} />
                    <Divider></Divider>
                    <Typography
                        variant="body1"
                        align="center"
                        color={isTargetDateAfterToday || status === "completed" ? "success" : "error"}
                        fontWeight={600}
                        sx={{
                            maxHeight: "400px",
                            overflow: "auto",
                        }}
                    >
                        Target Date: {new Date(target_date).toLocaleDateString()}
                    </Typography>
                    {related_project && (
                        <>
                            <Divider></Divider>
                            <Typography variant="body1" align="center">
                                Related Project: {related_project}
                            </Typography>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RoadmapDetails;
