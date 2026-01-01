import { useDraggable } from "@dnd-kit/core";
import { styled } from "@mui/material";
import type { TechnologyListItem } from "../../../../types/redux/technology";
import TechIcon from "../tech-icon/tech-icon";

type Props = { item: TechnologyListItem };

const Item = styled("div")(({ theme }) => ({
    width: "100%",
    padding: "8px",
    outline: "1px solid black",
    borderRadius: "4px",
    gap: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: theme.palette.background.paper,
}));

const ProjectAcpTechItem = ({ item }: Props) => {
    const { setNodeRef, attributes, listeners } = useDraggable({ id: item.id, data: item });
    return (
        <Item key={item.id} ref={setNodeRef} {...attributes} {...listeners}>
            <TechIcon name={item.name} />
            {item.human_readable_name}
        </Item>
    );
};

export default ProjectAcpTechItem;
