import { useCallback } from "react";
import { useParams } from "react-router";
import { useGetSingleUserQuery, useUpdateUserMutation } from "../../../../redux/queries/user";
import type { SingleUserItem } from "../../../../types/redux/user";

const useUserDetails = () => {
    const params = useParams<{ userId: string }>();
    const userId = params.userId ? parseInt(params.userId, 10) : -1; // Default to -1 if userId is not provided

    const { data: user, isLoading } = useGetSingleUserQuery({
        userId,
    });

    const [updateUser] = useUpdateUserMutation();

    const handleUpdateUser = useCallback(
        async (userData: Partial<Omit<SingleUserItem, "email">>) => {
            const updatedData: Partial<Omit<SingleUserItem, "email">> & Pick<SingleUserItem, "id"> = {
                id: userId,
                ...userData,
            };

            try {
                await updateUser(updatedData);
            } catch (error) {
                console.error("Error updating user:", error);
            }
        },
        [updateUser, userId]
    );

    return {
        user,
        isLoading,
        handleUpdateUser,
    };
};

export default useUserDetails;
