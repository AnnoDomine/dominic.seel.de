import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import combinedReducers from "../../../../redux/combinedReducers";
import userQueries from "../../../../redux/queries/user";
import type { RootState } from "../../../../redux/store";
import Login from "./login";

// Mock store
const createMockStore = () =>
    configureStore({
        reducer: combinedReducers,
        // We don't need detailed user state for Login, just the slice existence
        preloadedState: {
            user: {
                isAuthenticated: false,
                user: null,
            },
        } as Partial<RootState>,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userQueries.middleware),
    });

const meta: Meta<typeof Login> = {
    component: Login,
    title: "Organisms/Login",
    decorators: [
        (Story) => (
            <Provider store={createMockStore()}>
                <Story />
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Login>;

export const Default: Story = {};
