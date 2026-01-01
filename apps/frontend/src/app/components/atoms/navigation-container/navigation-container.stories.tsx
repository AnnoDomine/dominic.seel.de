import type { Meta, StoryObj } from "@storybook/react";
import NavigationContainer from "./navigation-container";

const meta: Meta<typeof NavigationContainer> = {
    component: NavigationContainer,
    title: "Atoms/NavigationContainer",
};

export default meta;
type Story = StoryObj<typeof NavigationContainer>;

export const Default: Story = {
    args: {
        children: "Navigation Content",
    },
};
