import useUser from "../../../../redux/hooks/useUser.hooks";
import Login from "../../organisams/login/login";
import Profile from "../../organisams/profile/profile";

const Acp = () => {
    const { isAuthenticated } = useUser();
    return !isAuthenticated ? <Login /> : <Profile />;
};

export default Acp;
