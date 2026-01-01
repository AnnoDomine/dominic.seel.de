import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import AcpNavigation from "./acp-navigation";

const meta: Meta<typeof AcpNavigation> = {
    component: AcpNavigation,
    title: "Organisms/AcpNavigation",
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div style={{ width: "300px", height: "100vh", borderRight: "1px solid gray" }}>
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof AcpNavigation>;

export const Default: Story = {};
