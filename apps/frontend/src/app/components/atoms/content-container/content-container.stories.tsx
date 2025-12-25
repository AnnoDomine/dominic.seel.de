import type { Meta, StoryObj } from "@storybook/react";
import ContentContainer from "./content-container";

const meta: Meta<typeof ContentContainer> = {
    component: ContentContainer,
    title: "Atoms/ContentContainer",
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof ContentContainer>;

export const Default: Story = {
    args: {
        children: "Content goes here",
    },
};
