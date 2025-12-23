import type { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useImmer } from "use-immer";
import { useLazyGetProjectQuery } from "../../../../redux/queries/project";
import type { ProjectDetails } from "../../../../types/redux/project";

const useProjectAcpDetails = () => {
    const params = useParams<{ projectId: string }>();
    const projectId = params.projectId ? parseInt(params.projectId, 10) : -1; // Default to -1 if projectId is not provided

    const [project, setProject] = useImmer<ProjectDetails | null>(null);

    const [fetchProject, { currentData: cachedData, isLoading }] = useLazyGetProjectQuery();

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

    const untrackedFields: Array<keyof ProjectDetails> = ["created_at", "id", "end_date", "start_date", "updated_at"];

    const hasAnyChanges = useMemo(
        () =>
            Object.entries(changedValues)
                .filter(([k, _v]) => !untrackedFields.includes(k as keyof ProjectDetails))
                .some(([_, v]) => v),
        [changedValues]
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: Runs initial
    useEffect(() => {
        if (projectId !== -1) {
            fetchProject(projectId)
                .unwrap()
                .then((data) => {
                    setProject(data);
                });
        }
    }, []);

    return {
        project,
        isLoading,
        handleChangeValue,
        changedValues,
        hasAnyChanges,
    };
};

export default useProjectAcpDetails;
