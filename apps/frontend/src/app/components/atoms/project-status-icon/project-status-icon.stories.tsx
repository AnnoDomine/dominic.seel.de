import type { Meta, StoryObj } from "@storybook/react";
import ProjectStatusIcon from "./project-status-icon";

const meta: Meta<typeof ProjectStatusIcon> = {
    component: ProjectStatusIcon,
    title: "Atoms/ProjectStatusIcon",
    argTypes: {
        status: {
            control: "select",
            options: ["active", "archived", "concept"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof ProjectStatusIcon>;

export const Active: Story = {
    args: {
        status: "active",
    },
};

export const Archived: Story = {
    args: {
        status: "archived",
    },
};

export const Concept: Story = {
    args: {
        status: "concept",
    },
};
