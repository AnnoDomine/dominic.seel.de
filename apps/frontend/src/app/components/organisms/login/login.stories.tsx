import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { combinedReducers } from "../../../../redux/combinedReducers";
import type { RootState } from "../../../../redux/store";

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
