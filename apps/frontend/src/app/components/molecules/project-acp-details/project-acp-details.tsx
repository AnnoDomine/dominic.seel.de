import type { Theme } from "@mui/material";
import {
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    styled,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { ROLE_MENU, STATUS_MENU, TYPE_MENU } from "./project-acp-details.constants";
import useProjectAcpDetails from "./project-acp-details.hooks";

const ProjectContainer = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: "100%",
}));

const BaseInfoContainer = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    [`${theme.breakpoints.down("md")}`]: {
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
    },
}));

const SelectContainer = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    [`${theme.breakpoints.down("md")}`]: {
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        gap: "16px",
    },
}));

const SelectFormControl = styled(FormControl)(({ theme }) => ({
    width: "30%",
    [`${theme.breakpoints.down("md")}`]: {
        width: "100%",
    },
}));

const ActionContainer = styled("div")(({ theme }) => ({
    display: "flex",
    gap: "16px",
    justifyContent: "flex-end",
    width: "100%",
    [`${theme.breakpoints.down("md")}`]: {
        flexDirection: "column",
        alignItems: "stretch",
        width: "100%",
        gap: "16px",
        position: "sticky",
        bottom: "0px",
        backgroundColor: "white",
        padding: "16px 0px",
        zIndex: theme.zIndex.appBar + 1,
        borderTop: `1px solid ${theme.palette.divider}`,
    },
}));

const ProjectAcpDetails = () => {
    const { project, isLoading, handleChangeValue, changedValues, hasAnyChanges } = useProjectAcpDetails();
    const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
    const baseInforDividerOrientation = !downMd ? "vertical" : "horizontal";
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!project) {
        return <div>Project not found</div>;
    }
    return (
        <ProjectContainer>
            <BaseInfoContainer>
                <Typography>ID: {project.id}</Typography>
                <Divider flexItem orientation={baseInforDividerOrientation} />
                <Typography>
                    Start: {project.start_date ? new Date(project.start_date).toLocaleDateString() : "Not started yet"}
                </Typography>
                <Divider flexItem orientation={baseInforDividerOrientation} />
                <Typography>
                    End: {project.end_date ? new Date(project.end_date).toLocaleDateString() : "In progress"}
                </Typography>
                <Divider flexItem orientation={baseInforDividerOrientation} />
                <Typography>
                    Created:{" "}
                    {project.created_at ? new Date(project.created_at).toLocaleDateString() : "Not created yet"}
                </Typography>
                <Divider flexItem orientation={baseInforDividerOrientation} />
                <Typography>
                    Last updated:{" "}
                    {project.updated_at ? new Date(project.updated_at).toLocaleDateString() : "Not updated yet"}
                </Typography>
            </BaseInfoContainer>
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
            <Divider flexItem />
            <SelectContainer>
                <SelectFormControl color={changedValues.status ? "success" : "primary"}>
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
                </SelectFormControl>
                <SelectFormControl color={changedValues.type ? "success" : "primary"}>
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
                </SelectFormControl>
                <SelectFormControl color={changedValues.role ? "success" : "primary"}>
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
                </SelectFormControl>
            </SelectContainer>
            <Divider flexItem />
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
            {!downMd && <Divider flexItem />}
            <ActionContainer>
                <Button variant="outlined">Technologies</Button>
                <Button variant="outlined" color="secondary">
                    Add new
                </Button>
                <Button variant="contained" disabled={!hasAnyChanges} color="primary">
                    Update
                </Button>
            </ActionContainer>
            {!downMd && <Divider flexItem />}
        </ProjectContainer>
    );
};

export default ProjectAcpDetails;
