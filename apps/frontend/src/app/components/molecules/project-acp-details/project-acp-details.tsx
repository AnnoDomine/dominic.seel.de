import { Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ROLE_MENU, STATUS_MENU, TYPE_MENU } from "./project-acp-details.constants";
import useProjectAcpDetails from "./project-acp-details.hooks";

const ProjectAcpDetails = () => {
    const { project, isLoading, handleChangeValue, changedValues } = useProjectAcpDetails();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!project) {
        return <div>Project not found</div>;
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                height: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <Typography>ID: {project.id}</Typography>
                <Divider flexItem orientation="vertical" />
                <Typography>
                    Start: {project.start_date ? new Date(project.start_date).toLocaleDateString() : "Not started yet"}
                </Typography>
                <Divider flexItem orientation="vertical" />
                <Typography>
                    End: {project.end_date ? new Date(project.end_date).toLocaleDateString() : "In progress"}
                </Typography>
                <Divider flexItem orientation="vertical" />
                <Typography>
                    Created:{" "}
                    {project.created_at ? new Date(project.created_at).toLocaleDateString() : "Not created yet"}
                </Typography>
                <Divider flexItem orientation="vertical" />
                <Typography>
                    Last updated:{" "}
                    {project.updated_at ? new Date(project.updated_at).toLocaleDateString() : "Not updated yet"}
                </Typography>
            </div>
            <Divider flexItem />
            <TextField
                id="title"
                label="Title"
                value={project.title}
                onChange={(e) => handleChangeValue("title", e.target.value)(e)}
                fullWidth
                color={changedValues.title ? "success" : "primary"}
            />
            <TextField
                id="description"
                label="Description"
                value={project.description}
                onChange={(e) => handleChangeValue("description", e.target.value)(e)}
                fullWidth
                multiline
                rows={4}
                color={changedValues.description ? "success" : "primary"}
            />
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    width: "100%",
                    justifyContent: "space-between",
                }}
            >
                <FormControl
                    sx={{
                        width: "30%",
                    }}
                    color={changedValues.status ? "success" : "primary"}
                >
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        id="status"
                        label="Status"
                        value={project.status}
                        onChange={(e) => handleChangeValue("status", e.target.value)(e)}
                    >
                        {STATUS_MENU.map((status) => (
                            <MenuItem key={status.id} value={status.value}>
                                {status.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl
                    sx={{
                        width: "30%",
                    }}
                    color={changedValues.type ? "success" : "primary"}
                >
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                        id="type"
                        label="Type"
                        value={project.type}
                        onChange={(e) => handleChangeValue("type", e.target.value)(e)}
                    >
                        {TYPE_MENU.map((type) => (
                            <MenuItem key={type.id} value={type.value}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl
                    sx={{
                        width: "30%",
                    }}
                    color={changedValues.role ? "success" : "primary"}
                >
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        id="role"
                        label="Role"
                        value={project.role}
                        onChange={(e) => handleChangeValue("role", e.target.value)(e)}
                    >
                        {ROLE_MENU.map((role) => (
                            <MenuItem key={role.id} value={role.value}>
                                {role.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <TextField
                id="project_url"
                label="Project URL"
                value={project.project_url}
                onChange={(e) => handleChangeValue("project_url", e.target.value)(e)}
                fullWidth
                color={changedValues.project_url ? "success" : "primary"}
            />
            <TextField
                id="github_url"
                label="GitHub URL"
                value={project.github_url}
                onChange={(e) => handleChangeValue("github_url", e.target.value)(e)}
                fullWidth
                color={changedValues.github_url ? "success" : "primary"}
            />
            <Divider flexItem />
            <Divider flexItem />
        </div>
    );
};

export default ProjectAcpDetails;
