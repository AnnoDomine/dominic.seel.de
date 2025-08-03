import { Divider, styled } from "@mui/material";
import ListInformation from "../list-information/list-information";
import useUserDetails from "./user-details.hooks";

const UserDetailsContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
});

const UserDetails = () => {
    const { user, isLoading } = useUserDetails();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <div>User not found</div>;
    }
    return (
        <UserDetailsContainer>
            <ListInformation label="ID" value={user.id} />
            <ListInformation label="First name" value={user.first_name || "No first name stored"} />
            <ListInformation label="Last name" value={user.last_name || "No last name stored"} />
            <ListInformation label="Email" value={user.email} />
            <Divider orientation="horizontal" flexItem />
            <ListInformation label="Username" value={user.username} />
            <ListInformation label="Is active" value={user.is_active} booleanAsIcon />
            <ListInformation label="Is superuser" value={user.is_superuser} booleanAsIcon />
            <ListInformation label="Is staff" value={user.is_staff} booleanAsIcon />
            <ListInformation
                label="Last login"
                value={user.last_login ? new Date(user.last_login).toLocaleString() : "Never logged in"}
            />
            <ListInformation label="Date joined" value={new Date(user.date_joined).toLocaleDateString()} />
        </UserDetailsContainer>
    );
};

export default UserDetails;
