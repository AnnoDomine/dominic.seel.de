import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Button, Dialog, DialogContent, LinearProgress, styled } from "@mui/material";
import ProjectAcpTechItem from "../../atoms/project-acp-tech-list/project-acp-tech-item";
import ProjectAcpTechList from "../../atoms/project-acp-tech-list/project-acp-tech-list";
import useProjectAcpTechnologies from "./project-acp-technologies.hooks";

type Props = {
    id: number;
};

const ListContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: "8px",
}));

const ProjectAcpTechnoliogies = ({ id }: Props) => {
    const { open, setOpen, includedTechs, excludedTechs, isLoading, dndProviderProps, draggedItem } =
        useProjectAcpTechnologies(id);
    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => setOpen(true)} type="button">
                Technologies
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <DialogContent dividers>
                    <div
                        style={{
                            height: "0px",
                            position: "relative",
                            top: "-16px",
                            width: "100%",
                            overflow: "visible",
                        }}
                    >
                        {isLoading && <LinearProgress />}
                    </div>
                    <DndContext {...dndProviderProps}>
                        <ListContainer>
                            <ProjectAcpTechList items={excludedTechs} id="list-zone-excluded" />
                            <ProjectAcpTechList items={includedTechs} id="list-zone-included" />
                        </ListContainer>
                        {draggedItem && (
                            <DragOverlay>
                                <ProjectAcpTechItem item={draggedItem} />
                            </DragOverlay>
                        )}
                    </DndContext>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProjectAcpTechnoliogies;
