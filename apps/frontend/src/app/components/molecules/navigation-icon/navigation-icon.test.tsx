import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("NavigationIcon", () => {
    // Use a helper function to mock useUser for clarity
    const mockUseUser = (isAuthenticated: boolean) => {
        vi.doMock("../../../../redux/hooks/useUser.hooks", () => ({
            __esModule: true,
            default: vi.fn(() => ({
                isAuthenticated,
            })),
        }));
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetModules();
        mockUseUser(false);
        vi.mock("../../../../redux/queries/auth", () => ({
            useLoginMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
        }));
        vi.mock("../../../../redux/queries/user", () => ({
            useGetUserQuery: vi.fn(() => ({ data: null, refetch: vi.fn() })),
            useLogoutMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
        }));
    });
    afterEach(() => {
        vi.clearAllMocks();
        vi.restoreAllMocks();
    });

    it("renders the correct icon for 'home", async () => {
        const { default: NavigationIcon } = await import("./navigation-icon");
        render(<NavigationIcon type="home" />);
        const navigationIcon = screen.getByTestId("HomeTwoToneIcon");

        expect(navigationIcon).toMatchSnapshot();
    });

    it("renders the correct icon for 'projects'", async () => {
        const { default: NavigationIcon } = await import("./navigation-icon");
        render(<NavigationIcon type="projects" />);
        const navigationIcon = screen.getByTestId("AccountTreeTwoToneIcon");

        expect(navigationIcon).toMatchSnapshot();
    });

    it("renders the correct icon for 'roadmap'", async () => {
        const { default: NavigationIcon } = await import("./navigation-icon");
        render(<NavigationIcon type="roadmap" />);
        const navigationIcon = screen.getByTestId("RouteTwoToneIcon");

        expect(navigationIcon).toMatchSnapshot();
    });

    it("renders the correct icon for 'admin-control-panel' when not logged in", async () => {
        const { default: NavigationIcon } = await import("./navigation-icon");
        render(<NavigationIcon type="acp" />);
        const navigationIcon = screen.getByTestId("HttpsTwoToneIcon");

        expect(navigationIcon).toMatchSnapshot();
    });

    it("renders the correct icon for 'admin-control-panel' when logged in", async () => {
        mockUseUser(true);
        const { default: NavigationIcon } = await import("./navigation-icon");
        render(<NavigationIcon type="acp" />);
        const navigationIcon = screen.getByTestId("LockOpenTwoToneIcon");

        expect(navigationIcon).toMatchSnapshot();
    });
});
