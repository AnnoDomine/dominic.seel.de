import type { Meta, StoryObj } from "@storybook/react";
import ProjectRoleIcon from "./project-role-icon";

const meta: Meta<typeof ProjectRoleIcon> = {
    component: ProjectRoleIcon,
    title: "Atoms/ProjectRoleIcon",
    argTypes: {
        role: {
            control: "select",
            options: ["frontend", "backend", "full_stack", "devops", "designer", "pm", "other"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof ProjectRoleIcon>;

export const Frontend: Story = {
    args: {
        role: "frontend",
    },
};

export const Backend: Story = {
    args: {
        role: "backend",
    },
};

export const FullStack: Story = {
    args: {
        role: "full_stack",
    },
};

export const DevOps: Story = {
    args: {
        role: "devops",
    },
};

export const Designer: Story = {
    args: {
        role: "designer",
    },
};

export const PM: Story = {
    args: {
        role: "pm",
    },
};

export const Other: Story = {
    args: {
        role: "other",
    },
};
