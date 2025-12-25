import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { combinedReducers } from "../../../../redux/combinedReducers";
import type { RootState } from "../../../../redux/store";

const createMockStore = () =>
    configureStore({
        reducer: combinedReducers,
        preloadedState: {
            user: {
                isAuthenticated: true,
                user: { id: 1, username: "testuser" },
            },
        } as Partial<RootState>,
    });

const meta: Meta<typeof Layout> = {
    component: Layout,
    title: "Templates/Layout",
    decorators: [
        (Story) => (
            <Provider store={createMockStore()}>
                <MemoryRouter initialEntries={["/"]}>
                    <Routes>
                        <Route path="/" element={<Story />}>
                            <Route index element={<div>Home Page Content</div>} />
                        </Route>
                    </Routes>
                </MemoryRouter>
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {};
