import { Divider, IconButton, styled } from "@mui/material";
import useProjectDetails from "./project-details.hooks";
import ListInformation from "../list-information/list-information";
import ProjectStatusIcon from "../../atoms/project-status-icon/project-status-icon";
import ProjectTypeIcon from "../../atoms/project-type-icon/project-type-icon";

import HouseTwoToneIcon from "@mui/icons-material/HouseTwoTone";
import GitHubIcon from "@mui/icons-material/GitHub";
import { openInNewTab } from "@utils";
import ProjectRoleIcon from "../../atoms/project-role-icon/project-role-icon";
import TechnologyList from "../technology-list/technoligy-list";

const ProjectDetailsContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: "100%",
    justifyContent: "space-between",
});

const TitleContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    gap: "8px",
});

const RowContainer = styled("div")({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
    width: "100%",
});

const DescriptionContainer = styled("div")({
    height: "100%",
});

const DescriptionOuterContainer = styled("div")({
    height: "100%",
});

const InformationContainer = styled("div")({
    "&.description": {
        height: "-webkit-fill-available",
    },
    "&.sub-information": {
        margin: "0px 12px",
    },
});

const ProjectDetails = () => {
    const { project, isLoading } = useProjectDetails();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!project) {
        return <div>Project not found</div>;
    }
    return (
        <ProjectDetailsContainer>
            <InformationContainer>
                <ListInformation
                    label="Name"
                    value={
                        <TitleContainer>
                            {project.image && (
                                <img src={project.image} alt="Project" style={{ maxWidth: "20px", height: "auto" }} />
                            )}
                            {project.title}
                            <IconButton size="small">
                                <ProjectRoleIcon role={project.role} />
                            </IconButton>
                        </TitleContainer>
                    }
                />
            </InformationContainer>
            <Divider />
            <InformationContainer className="description">
                <DescriptionOuterContainer>
                    <ListInformation
                        label="Description"
                        value={
                            <DescriptionContainer
                                dangerouslySetInnerHTML={{ __html: project.description || "No description provided" }}
                            />
                        }
                        maxHeight
                    />
                </DescriptionOuterContainer>
            </InformationContainer>
            <Divider />
            <InformationContainer>
                <ListInformation
                    label="Technologies"
                    value={<TechnologyList technologies={project.technologies || []} />}
                />
            </InformationContainer>
            <Divider />
            <InformationContainer className="sub-information">
                <RowContainer>
                    <ListInformation
                        label="Status"
                        value={
                            <IconButton size="small">
                                <ProjectStatusIcon status={project.status} />
                            </IconButton>
                        }
                    />
                    <ListInformation
                        label="Type"
                        value={
                            <IconButton size="small">
                                <ProjectTypeIcon type={project.type} />
                            </IconButton>
                        }
                    />
                </RowContainer>
                <RowContainer>
                    <ListInformation
                        label="Start Date"
                        value={
                            project.start_date ? new Date(project.start_date).toLocaleDateString() : "Not started yet"
                        }
                    />
                    <ListInformation
                        label="End Date"
                        value={project.end_date ? new Date(project.end_date).toLocaleDateString() : "In progress"}
                    />
                </RowContainer>
                <RowContainer>
                    <ListInformation
                        label="Project URL"
                        value={
                            project.project_url ? (
                                <IconButton
                                    onClick={() => openInNewTab(project.project_url || "")}
                                    size="small"
                                    title="Open Project URL"
                                >
                                    <HouseTwoToneIcon fontSize="small" />
                                </IconButton>
                            ) : (
                                "No project URL provided"
                            )
                        }
                    />
                    <ListInformation
                        label="GitHub URL"
                        value={
                            project.github_url ? (
                                <IconButton
                                    onClick={() => openInNewTab(project.github_url || "")}
                                    size="small"
                                    title="Open GitHub Repository"
                                >
                                    <GitHubIcon fontSize="small" />
                                </IconButton>
                            ) : (
                                "No GitHub URL provided"
                            )
                        }
                    />
                </RowContainer>
            </InformationContainer>
        </ProjectDetailsContainer>
    );
};

export default ProjectDetails;
