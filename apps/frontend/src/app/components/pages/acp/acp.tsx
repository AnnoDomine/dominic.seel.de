import useUser from "../../../../redux/hooks/useUser.hooks"
import Login from "../../organisams/login/login"

const Acp = () => {
    const { isAuthenticated } = useUser()
    return !isAuthenticated ? <Login /> : "logged in"
}

export default Acp
