import { useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../../../../redux/queries/user";

const useUserDetails = () => {
    const params = useParams<{ userId: string }>();
    const userId = params.userId ? parseInt(params.userId, 10) : -1; // Default to -1 if userId is not provided

    const { data: user, isLoading } = useGetSingleUserQuery({
        userId,
    });

    return {
        user,
        isLoading,
    };
};

export default useUserDetails;
