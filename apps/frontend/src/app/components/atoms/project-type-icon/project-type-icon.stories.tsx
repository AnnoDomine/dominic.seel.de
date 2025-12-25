import type { Meta, StoryObj } from "@storybook/react";
import ProjectTypeIcon from "./project-type-icon";

const meta: Meta<typeof ProjectTypeIcon> = {
    component: ProjectTypeIcon,
    title: "Atoms/ProjectTypeIcon",
    argTypes: {
        type: {
            control: "select",
            options: ["work", "private", "study", "other"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof ProjectTypeIcon>;

export const Work: Story = {
    args: {
        type: "work",
    },
};

export const Private: Story = {
    args: {
        type: "private",
    },
};

export const Study: Story = {
    args: {
        type: "study",
    },
};

export const Other: Story = {
    args: {
        type: "other",
    },
};
