import type { Meta, StoryObj } from "@storybook/react";
import TechnologyModal from "./technology-modal";

const meta: Meta<typeof TechnologyModal> = {
    component: TechnologyModal,
    title: "Atoms/TechnologyModal",
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof TechnologyModal>;

export const Default: Story = {
    args: {
        technology: {
            id: 1,
            name: "react",
            human_readable_name: "React",
            description: "A JavaScript library for building user interfaces.",
        },
    },
};

export const WithUnknownIcon: Story = {
    args: {
        technology: {
            id: 2,
            name: "unknown-tech",
            human_readable_name: "Unknown Tech",
            description: "A technology without a predefined icon.",
        },
    },
};
