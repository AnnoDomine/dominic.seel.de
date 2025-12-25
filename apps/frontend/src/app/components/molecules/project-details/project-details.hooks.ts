import { useParams } from "react-router";
import { useGetProjectQuery } from "../../../../redux/queries/project";

const useProjectDetails = () => {
    const params = useParams<{ projectId: string }>();
    const projectId = params.projectId ? parseInt(params.projectId, 10) : -1; // Default to -1 if projectId is not provided

    const { data: project, isLoading } = useGetProjectQuery(projectId);

    return {
        project,
        isLoading,
    };
};

export default useProjectDetails;
