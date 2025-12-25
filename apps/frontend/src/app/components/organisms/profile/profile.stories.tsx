import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import combinedReducers from "../../../../redux/combinedReducers";
import userApi from "../../../../redux/queries/user";
import Profile from "./profile";

// Mock store with RTK Query middleware
const createMockStore = () =>
    configureStore({
        reducer: combinedReducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
    });

const meta: Meta<typeof Profile> = {
    component: Profile,
    title: "Organisms/Profile",
    decorators: [
        (Story) => (
            <Provider store={createMockStore()}>
                <div style={{ height: "500px", position: "relative" }}>
                    <Story />
                </div>
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const Closed: Story = {
    args: {
        isProfileOpen: false,
    },
};

export const Open: Story = {
    args: {
        isProfileOpen: true,
    },
};
