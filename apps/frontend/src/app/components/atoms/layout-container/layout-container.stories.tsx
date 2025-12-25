import type { Meta, StoryObj } from "@storybook/react";
import LayoutContainer from "./layout-container";

const meta: Meta<typeof LayoutContainer> = {
    component: LayoutContainer,
    title: "Atoms/LayoutContainer",
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof LayoutContainer>;

export const Default: Story = {
    args: {
        children: "Content goes here",
    },
};
