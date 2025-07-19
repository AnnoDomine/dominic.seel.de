import useProfile from "./profile.hooks";
import { Controller } from "react-hook-form";
import { Button, Input } from "@mui/material";

const Profile = () => {
    const { isLoading, handleUpdateUser, control, handleSubmit, changeableUserInformation } = useProfile();
    return (
        <form onSubmit={handleSubmit(handleUpdateUser)}>
            {changeableUserInformation.map((field) => (
                <Controller key={field} name={field} control={control} render={({ field }) => <Input {...field} />} />
            ))}
            <Button type="submit" disabled={isLoading}>
                Update Profile
            </Button>
        </form>
    );
};

export default Profile;
