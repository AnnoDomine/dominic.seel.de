import type { Meta, StoryObj } from "@storybook/react";
import Spacer from "./spacer";

const meta: Meta<typeof Spacer> = {
    component: Spacer,
    title: "Atoms/Spacer",
    decorators: [
        (Story) => (
            <div style={{ display: "flex", width: "100%", height: "50px", border: "1px dashed grey" }}>
                <div style={{ width: "50px", background: "red" }} />
                <Story />
                <div style={{ width: "50px", background: "blue" }} />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Spacer>;

export const Default: Story = {};
