export type ProjectListItem = {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    status: "active" | "archived" | "concept";
    type: "work" | "private" | "study" | "other";
};

export type ProjectDetails = ProjectListItem & {
    description: string;
    role: "frontend" | "backend" | "full_stack" | "devops" | "designer" | "pm" | "other";
    technologies: number[];
    start_date: string | null;
    end_date: string | null;
    image: string | null;
    project_url: string | null;
    github_url: string | null;
};
