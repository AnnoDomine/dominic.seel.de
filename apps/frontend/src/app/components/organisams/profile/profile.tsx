import { styled, TextField } from "@mui/material";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import useProfile from "./profile.hooks";

type Props = {
    isProfileOpen: boolean;
};

const Form = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "400px",
    position: "sticky",
    top: "16px",
    width: "0%",
    overflow: "hidden",
    transition: "width 0.3s ease-in-out",
    "&.isProfileOpen": {
        width: "100%",
    },
});

const Profile = ({ isProfileOpen }: Props) => {
    const { isLoading, handleSubmit, control, onSubmit, changeableUserInformation, fieldPlaceholders, errors } =
        useProfile();
    return (
        <Form className={clsx({ isProfileOpen })} onSubmit={handleSubmit(onSubmit)}>
            {changeableUserInformation.map((field) => (
                <Controller
                    key={field}
                    name={field}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            placeholder={fieldPlaceholders[field.name]}
                            error={!!errors[field.name]}
                            helperText={errors[field.name]?.message}
                        />
                    )}
                />
            ))}
            <input type="submit" disabled={isLoading} value="Update Profile" />
        </Form>
    );
};

export default Profile;
