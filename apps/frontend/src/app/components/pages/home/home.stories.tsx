import type { Meta, StoryObj } from "@storybook/react";
import Home from "./home";

const meta: Meta<typeof Home> = {
    component: Home,
    title: "Pages/Home",
};

export default meta;
type Story = StoryObj<typeof Home>;

export const Default: Story = {};
