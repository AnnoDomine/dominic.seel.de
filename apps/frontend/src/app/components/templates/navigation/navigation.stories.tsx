import { combinedReducers } from "../../../../redux/combinedReducers";
import type { RootState } from "../../../../redux/store";

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
    });

const meta: Meta<typeof Navigation> = {
    component: Navigation,
    title: "Templates/Navigation",
    decorators: [
        (Story, context) => (
            <Provider store={createMockStore(context.args.isAuthenticated)}>
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
            </Provider>
        ),
    ],
    argTypes: {
        isAuthenticated: {
            control: "boolean",
            defaultValue: false,
        },
    },
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
