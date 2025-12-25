import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import combinedReducers from "../../../../redux/combinedReducers";
import userQueries from "../../../../redux/queries/user";
import type { RootState } from "../../../../redux/store";
import Layout from "./layout";

const createMockStore = () =>
    configureStore({
        reducer: combinedReducers,
        preloadedState: {
            user: {
                isAuthenticated: true,
                user: { id: 1, username: "testuser" },
            },
        } as Partial<RootState>,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    // Ignore non-serializable actions
                    ignoredActions: ["some/actionType"],
                },
            }).concat(userQueries.middleware),
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
