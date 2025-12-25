import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router";
import NavigationBack from "./navigation-back";

const meta: Meta<typeof NavigationBack> = {
    component: NavigationBack,
    title: "Molecules/NavigationBack",
    parameters: {
        layout: "fullscreen",
    },
    decorators: [
        // Decorator to provide React Router context
        (Story) => (
            <MemoryRouter initialEntries={["/mock/path/details"]}>
                <Routes>
                    <Route path="/mock/path/details" element={<Story />} />
                    <Route path="/mock/path" element={<div>Navigated back to /mock/path</div>} />
                    <Route path="/" element={<div>Navigated back to root</div>} />
                </Routes>
            </MemoryRouter>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof NavigationBack>;

export const Default: Story = {};
