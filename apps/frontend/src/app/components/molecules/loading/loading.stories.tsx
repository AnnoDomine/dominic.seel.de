import type { Meta, StoryObj } from "@storybook/react";
import Loading from "./loading";

const meta: Meta<typeof Loading> = {
    component: Loading,
    title: "Molecules/Loading",
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {};
