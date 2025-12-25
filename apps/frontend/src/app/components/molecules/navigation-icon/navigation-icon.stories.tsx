import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { combinedReducers } from "../../../../redux/combinedReducers"; // Assuming this is your root reducer
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
    });

const meta: Meta<typeof NavigationIcon> = {
    component: NavigationIcon,
    title: "Molecules/NavigationIcon",
    argTypes: {
        type: {
            control: "select",
            options: Object.keys(connectedRoutes), // Use keys of your routes object
        },
        // Add a control for isAuthenticated in Storybook UI
        isAuthenticated: {
            control: "boolean",
            defaultValue: false,
        },
    },
    decorators: [
        (Story, context) => {
            // Create a store based on the isAuthenticated arg
            const store = createMockStore(context.args.isAuthenticated);
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

export const HomeRoute: Story = {
    args: {
        type: "home",
        isAuthenticated: false,
    },
};

export const ProjectsRoute: Story = {
    args: {
        type: "projects",
        isAuthenticated: false,
    },
};

export const RoadmapRoute: Story = {
    args: {
        type: "roadmap",
        isAuthenticated: false,
    },
};

export const AcpRouteAuthenticated: Story = {
    args: {
        type: "acp",
        isAuthenticated: true,
    },
};

export const AcpRouteUnauthenticated: Story = {
    args: {
        type: "acp",
        isAuthenticated: false,
    },
};
