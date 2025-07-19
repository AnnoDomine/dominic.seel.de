import { useImmer } from "use-immer";
import { useGetUserQuery, useUpdateUserMutation } from "../../../../redux/queries/user";
import { LoginResponse } from "../../../../types/redux/user";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const useProfile = () => {
    const { data: user, isLoading } = useGetUserQuery();
    const [updateUser] = useUpdateUserMutation();

    const [updatedUser, setUpdatedUser] = useImmer<LoginResponse | null>(user || null);

    const changeableUserInformation: (keyof LoginResponse)[] = ["username", "first_name", "last_name", "email"];

    const handleUpdateUser = useCallback(
        async (userData: Partial<LoginResponse>) => {
            try {
                await updateUser(userData).unwrap();
            } catch (error) {
                console.error("Failed to update user:", error);
            }
        },
        [updateUser]
    );

    const { control, handleSubmit } = useForm<LoginResponse>({
        defaultValues: updatedUser || {},
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<LoginResponse> = useCallback((data) => handleUpdateUser(data), [handleUpdateUser]);

    const handleFieldChange = useCallback(
        <K extends keyof LoginResponse>(field: K, value: LoginResponse[K]) => {
            setUpdatedUser((draft) => {
                if (draft) {
                    draft[field] = value;
                }
            });
        },
        [setUpdatedUser]
    );

    useEffect(() => {
        if (user) {
            setUpdatedUser(user);
        }
    }, [user, setUpdatedUser]);

    return {
        updatedUser,
        isLoading,
        handleUpdateUser,
        handleFieldChange,
        control,
        handleSubmit,
        changeableUserInformation,
    };
};

export default useProfile;
