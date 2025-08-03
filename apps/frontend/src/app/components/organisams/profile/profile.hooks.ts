import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useImmer } from "use-immer";
import * as zod from "zod";
import { useGetUserQuery, useUpdateUserMutation } from "../../../../redux/queries/user";
import type { LoginResponse } from "../../../../types/redux/user";

const useProfile = () => {
    const { data: user, isLoading } = useGetUserQuery();
    const [updateUser] = useUpdateUserMutation();

    const [updatedUser, setUpdatedUser] = useImmer<LoginResponse | null>(user || null);

    const changeableUserInformation: (keyof Omit<LoginResponse, "pk" | "email">)[] = [
        "username",
        "first_name",
        "last_name",
    ];

    const validationSchema = zod
        .object({
            username: zod.string().min(1, "Username is required"),
            first_name: zod.string().min(1, "First name is required"),
            last_name: zod.string().min(1, "Last name is required"),
        })
        .required();

    const fieldPlaceholders: Record<keyof Omit<LoginResponse, "pk" | "email">, string> = {
        username: "Username",
        first_name: "First Name",
        last_name: "Last Name",
    };

    const handleUpdateUser = useCallback(
        async (userData: Omit<LoginResponse, "pk" | "email">) => {
            try {
                await updateUser({ ...userData, pk: user?.pk || -1 }).unwrap();
            } catch (error) {
                console.error("Failed to update user:", error);
            }
        },
        [updateUser, user]
    );

    const onSubmit: SubmitHandler<Omit<LoginResponse, "pk" | "email">> = useCallback(
        (data) => handleUpdateUser(data),
        [handleUpdateUser]
    );

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Omit<LoginResponse, "pk" | "email">>({
        defaultValues: updatedUser || {},
        mode: "onChange",
        resolver: zodResolver(validationSchema),
        reValidateMode: "onChange",
    });

    useEffect(() => {
        if (user) {
            setUpdatedUser(user);
        }
    }, [user, setUpdatedUser]);

    return {
        updatedUser,
        isLoading,
        handleUpdateUser,
        control,
        onSubmit,
        handleSubmit,
        changeableUserInformation,
        fieldPlaceholders,
        errors,
    };
};

export default useProfile;
