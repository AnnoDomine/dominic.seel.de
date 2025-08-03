import { Button, Divider, FormControl, Paper, TextField, Typography } from "@mui/material"
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone"
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone"
import { useState } from "react"
import useUser from "../../../../redux/hooks/useUser.hooks"

const Login = () => {
    const { handleLogin } = useUser()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("Login attempt with:", { email, password })
        handleLogin({ email, password })
    }

    const handleChangeValue = (type: "email" | "password") => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        switch (type) {
            case "email":
                setEmail(event.target.value)
                break
            case "password":
                setPassword(event.target.value)
                break
            default:
                throw new Error("Invalid type provided")
        }
    }

    return (
        <Paper sx={{ maxWidth: "400px", width: "100%", margin: "auto" }} elevation={3}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5" component="h2" sx={{ textAlign: "center", padding: "20px" }}>
                    Login to ACP
                </Typography>
                <Divider />
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <FormControl>
                        <TextField
                            type="email"
                            placeholder="E-Mail"
                            variant="standard"
                            title="E-Mail"
                            value={email}
                            onChange={handleChangeValue("email")}
                            slotProps={{
                                input: {
                                    id: "email",
                                    tabIndex: 0,
                                    autoComplete: "email",
                                    autoFocus: true,
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            placeholder={showPassword ? "Password" : "*********"}
                            variant="standard"
                            title="Password"
                            value={password}
                            onChange={handleChangeValue("password")}
                            slotProps={{
                                input: {
                                    id: "password",
                                    tabIndex: 1,
                                    autoComplete: "current-password",
                                    endAdornment: showPassword ? (
                                        <VisibilityOffTwoToneIcon
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setShowPassword(false)
                                            }}
                                            sx={{ cursor: "pointer" }}
                                        />
                                    ) : (
                                        <VisibilityTwoToneIcon
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setShowPassword(true)
                                            }}
                                            sx={{ cursor: "pointer" }}
                                        />
                                    ),
                                },
                            }}
                        />
                    </FormControl>
                </div>
                <Divider />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    tabIndex={2}
                    sx={{ margin: "20px" }}
                    data-testid="submit-button"
                >
                    Submit
                </Button>
            </form>
        </Paper>
    )
}

export default Login
