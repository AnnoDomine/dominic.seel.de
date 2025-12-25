import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import combinedReducers from "../../../../redux/combinedReducers"; // Assuming this is your root reducer
import userQueries from "../../../../redux/queries/user";
import type { RootState } from "../../../../redux/store";
import connectedRoutes from "../../../../utils/routes/routes"; // Import routes object
import NavigationIcon from "./navigation-icon";

// Mock the Redux store for isolated testing
const createMockStore = (isAuthenticated: boolean) =>
    configureStore({
        reducer: combinedReducers, // Use your actual combined reducers
        preloadedState: {
            user: {
                isAuthenticated: isAuthenticated,
                user: isAuthenticated ? { id: 1, username: "testuser" } : null,
            },
            // Add other slices if NavigationIcon implicitly uses them
        } as Partial<RootState>, // Cast as Partial<RootState> for type safety in mock
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userQueries.middleware),
    });

const meta: Meta<typeof NavigationIcon> = {
    component: NavigationIcon,
    title: "Molecules/NavigationIcon",
    args: {
        type: "home",
    },
    argTypes: {
        type: {
            control: "select",
            options: Object.keys(connectedRoutes),
            description: "The type of navigation icon to render",
        },
    },
    parameters: {
        isAuthenticated: {
            control: "boolean",
            defaultValue: true,
            description: "Whether the user is authenticated or not",
        },
    },
    decorators: [
        (Story, context) => {
            // Create a store based on the isAuthenticated arg
            const store = createMockStore(context.parameters.isAuthenticated);
            return (
                <Provider store={store}>
                    <Story />
                </Provider>
            );
        },
    ],
};

export default meta;
type Story = StoryObj<typeof NavigationIcon>;

export const Route: Story = {
    args: {
        type: "acp",
    },
};
