import type { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useImmer } from "use-immer";
import { useLazyGetProjectQuery, useUpdateProjectMutation } from "../../../../redux/queries/project";
import type { ProjectDetails } from "../../../../types/redux/project";

const useProjectAcpDetails = () => {
    const params = useParams<{ projectId: string }>();
    const projectId = params.projectId ? parseInt(params.projectId, 10) : -1; // Default to -1 if projectId is not provided

    const [project, setProject] = useImmer<ProjectDetails | null>(null);

    const [fetchProject, { currentData: cachedData, isLoading: isProjectFetching }] = useLazyGetProjectQuery();

    const [updateProject, { isLoading: isProjectUpdating }] = useUpdateProjectMutation();

    const isLoading = isProjectFetching || isProjectUpdating;

    const handleChangeValue = useCallback(
        <K extends keyof ProjectDetails = keyof ProjectDetails>(field: K, value: ProjectDetails[K]) =>
            (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
                event.stopPropagation();
                event.preventDefault();
                setProject((draft) => {
                    if (draft) {
                        draft[field] = value;
                    }
                });
            },
        [setProject]
    );

    const changedValues = useMemo(
        () =>
            Object.keys(project || {}).reduce(
                (acc, cur) => {
                    acc[cur as keyof ProjectDetails] =
                        project?.[cur as keyof ProjectDetails] !== cachedData?.[cur as keyof ProjectDetails];
                    return acc;
                },
                {} as Record<keyof ProjectDetails, boolean>
            ),
        [project, cachedData]
    );

    const untrackedFields: Array<keyof ProjectDetails> = [
        "created_at",
        "id",
        "end_date",
        "start_date",
        "updated_at",
        "technologies", // Techs auto update on change with optimistic UI
        "image",
    ];

    const hasFieldChanges = useMemo(
        () =>
            Object.entries(changedValues)
                .filter(([k, _v]) => !untrackedFields.includes(k as keyof ProjectDetails))
                .reduce(
                    (a, [k, v]) => {
                        a[k as keyof ProjectDetails] = v;
                        return a;
                    },
                    {} as Record<keyof ProjectDetails, boolean>
                ),
        [changedValues]
    );

    const hasAnyChanges = useMemo(() => Object.entries(hasFieldChanges).some(([_, v]) => v), [hasFieldChanges]);

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            if (!project) return;
            e.preventDefault();
            e.stopPropagation();

            const payload: Partial<ProjectDetails> & Pick<ProjectDetails, "id"> = { id: project.id };

            for (const key in hasFieldChanges) {
                if (hasFieldChanges[key as keyof typeof hasFieldChanges]) {
                    const fieldKey = key as keyof ProjectDetails;
                    payload[fieldKey] = project[fieldKey];
                }
            }

            try {
                await updateProject(payload).unwrap();
            } catch (error) {
                console.error("Error updating project:", error);
                alert("Failed to update project. Please check the console for details.");
            }
        },
        [updateProject, project, hasFieldChanges]
    );

    useEffect(() => {
        if (projectId !== -1) {
            fetchProject(projectId)
                .unwrap()
                .then((data) => {
                    setProject(data);
                });
        }
    }, [projectId, fetchProject, setProject]);

    return {
        project,
        isLoading,
        handleChangeValue,
        changedValues,
        handleSubmit,
        hasAnyChanges,
    };
};

export default useProjectAcpDetails;
