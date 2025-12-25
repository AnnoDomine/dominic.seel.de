import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { combinedReducers } from "../../../../redux/combinedReducers";
import projectApi from "../../../../redux/queries/project";
import Projects from "./projects";

const createMockStore = () =>
    configureStore({
        reducer: combinedReducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware),
    });

const meta: Meta<typeof Projects> = {
    component: Projects,
    title: "Pages/Projects",
    decorators: [
        (Story) => (
            <Provider store={createMockStore()}>
                <MemoryRouter>
                    <div style={{ height: "600px", width: "100%" }}>
                        <Story />
                    </div>
                </MemoryRouter>
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Projects>;

export const Default: Story = {};
