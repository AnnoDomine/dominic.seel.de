import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import combinedReducers from "../../../../redux/combinedReducers";
import userQueries from "../../../../redux/queries/user";
import type { RootState } from "../../../../redux/store";
import Navigation from "./navigation";

// Mock store
const createMockStore = (isAuthenticated: boolean) =>
    configureStore({
        reducer: combinedReducers,
        preloadedState: {
            user: {
                isAuthenticated: isAuthenticated,
                user: isAuthenticated ? { id: 1, username: "testuser" } : null,
            },
        } as Partial<RootState>,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userQueries.middleware),
    });

const meta: Meta<typeof Navigation> = {
    component: Navigation,
    title: "Templates/Navigation",
    argTypes: {
        isAuthenticated: {
            control: "boolean",
            defaultValue: false,
        },
    },
    decorators: [
        (Story, context) => (
            <Provider store={createMockStore((context.args as { isAuthenticated: boolean }).isAuthenticated)}>
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Unauthenticated: Story = {
    args: {
        isAuthenticated: false,
    },
};

export const Authenticated: Story = {
    args: {
        isAuthenticated: true,
    },
};
