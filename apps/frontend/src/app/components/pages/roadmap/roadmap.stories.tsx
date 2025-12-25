import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { combinedReducers } from "../../../../redux/combinedReducers";
import roadmapApi from "../../../../redux/queries/roadmap";
import Roadmap from "./roadmap";

const createMockStore = () =>
    configureStore({
        reducer: combinedReducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(roadmapApi.middleware),
    });

const meta: Meta<typeof Roadmap> = {
    component: Roadmap,
    title: "Pages/Roadmap",
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
type Story = StoryObj<typeof Roadmap>;

export const Default: Story = {};
