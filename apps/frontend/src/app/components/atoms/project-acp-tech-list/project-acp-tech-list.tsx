import { useDroppable } from "@dnd-kit/core";
import { styled } from "@mui/material";
import clsx from "clsx";
import type { TechnologyListItem } from "../../../../types/redux/technology";
import ProjectAcpTechItem from "./project-acp-tech-item";

export type ListZoneId = `list-zone-${"excluded" | "included"}`;

type Props = {
    items: TechnologyListItem[];
    id: ListZoneId;
};

const List = styled("div")(({ theme }) => ({
    width: "40%",
    gap: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: theme.spacing(1),
    height: "500px",
    outline: `1px solid ${theme.palette.primary.main}`,
    transition: "outline 0.3s ease",
    borderRadius: "4px",
    backgroundColor: theme.palette.background.default,
    "&.over": {
        outline: `2px solid ${theme.palette.primary.main}`,
    },
}));

const ProjectAcpTechList = ({ items, id }: Props) => {
    const { setNodeRef, isOver } = useDroppable({ id, data: { id } });
    return (
        <List ref={setNodeRef} className={clsx({ over: isOver })}>
            {items.map((tech) => (
                <ProjectAcpTechItem key={tech.id} item={tech} />
            ))}
        </List>
    );
};

export default ProjectAcpTechList;
