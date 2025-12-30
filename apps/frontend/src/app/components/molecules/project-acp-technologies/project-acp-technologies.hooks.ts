import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useCallback, useMemo, useState } from "react";
import { useImmer } from "use-immer";
import { useGetProjectQuery, useUpdateProjectMutation } from "../../../../redux/queries/project";
import { useListTechnologiesQuery } from "../../../../redux/queries/technology";
import type { TechnologyListItem } from "../../../../types/redux/technology";
import type { ListZoneId } from "../../atoms/project-acp-tech-list/project-acp-tech-list";

const useProjectAcpTechnologies = (id: number) => {
    const [open, setOpen] = useState<boolean>(false);

    const [draggedItem, setDraggedItem] = useImmer<TechnologyListItem | null>(null);

    const { data: technologies, isFetching: isTechsLoading } = useListTechnologiesQuery();
    const { data: project, isFetching: isProjectFetching } = useGetProjectQuery(id);

    const [updateTechs, { isLoading: isTechsUpdating }] = useUpdateProjectMutation();

    const isLoading = isTechsLoading || isProjectFetching || isTechsUpdating;

    const includedTechs = useMemo(
        () => technologies?.filter((tech) => project?.technologies.includes(tech.id)) || [],
        [technologies, project?.technologies]
    );

    const excludedTechs = useMemo(
        () => technologies?.filter((tech) => !project?.technologies.includes(tech.id)) || [],
        [technologies, project?.technologies]
    );

    const updateProject = useCallback(
        async (techs: number[]) => {
            try {
                await updateTechs({ id, technologies: techs });
                // setOpen(false);
            } catch (error) {
                console.error("Error updating project:", error);
            }
        },
        [id, updateTechs]
    );

    const onDragStart = useCallback(
        (event: DragStartEvent) => {
            setDraggedItem(event.active.data.current as unknown as TechnologyListItem);
        },
        [setDraggedItem]
    );

    const onDragEnd = useCallback(
        (event: DragEndEvent) => {
            const currentTechs = [...(project?.technologies || [])];
            switch (event.over?.id as ListZoneId) {
                case "list-zone-included":
                    if (draggedItem && !currentTechs.includes(draggedItem.id)) currentTechs.push(draggedItem.id);
                    break;
                case "list-zone-excluded":
                    if (draggedItem && currentTechs.includes(draggedItem.id))
                        currentTechs.splice(currentTechs.indexOf(draggedItem.id), 1);
                    break;
                default:
                    // Cancle if no id is in "over"
                    return;
            }
            updateProject(currentTechs);
            setDraggedItem(null);
        },
        [setDraggedItem, draggedItem, project?.technologies, updateProject]
    );

    const dndProps = useMemo(() => ({ onDragStart, onDragEnd }), [onDragStart, onDragEnd]);

    return {
        isLoading,
        includedTechs,
        excludedTechs,
        updateProject,
        open,
        setOpen,
        dndProps,
        draggedItem,
    };
};

export default useProjectAcpTechnologies;
