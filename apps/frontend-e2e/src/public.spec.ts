import { expect, test } from "@playwright/test";

test.describe("Public Access", () => {
    test.beforeEach(async ({ page }) => {
        // Mock Projects API
        await page.route("*/**/api/projects/**", async (route) => {
            const json = {
                count: 2,
                next: null,
                previous: null,
                results: [
                    {
                        id: 1,
                        title: "Test Project 1",
                        created_at: "2023-01-01T00:00:00Z",
                        updated_at: "2023-01-02T00:00:00Z",
                        status: "active",
                        type: "private",
                    },
                    {
                        id: 2,
                        title: "Test Project 2",
                        created_at: "2023-02-01T00:00:00Z",
                        updated_at: "2023-02-02T00:00:00Z",
                        status: "concept",
                        type: "work",
                    },
                ],
            };
            await route.fulfill({ json });
        });

        // Mock Roadmap API (assuming similar structure)
        await page.route("*/**/api/roadmap/**", async (route) => {
            const json = {
                count: 1,
                results: [
                    {
                        id: 1,
                        title: "Roadmap Item 1",
                        description: "Todo",
                        status: "planned",
                        target_date: "2025-01-01",
                    },
                ],
            };
            await route.fulfill({ json });
        });
    });

    test("Landing page loads", async ({ page }) => {
        await page.goto("/");

        // Check title or main header

        await expect(page).toHaveTitle(/Frontend/i);

        await expect(page.getByText("Home")).toBeVisible();
    });

    test("Projects page loads and displays projects", async ({ page }) => {
        await page.goto("/projects");

        // Wait for loading to finish (optional, but good for debugging)

        // await expect(page.getByRole("progressbar")).not.toBeVisible();

        // Verify projects are listed

        await expect(page.getByText("Test Project 1")).toBeVisible();

        await expect(page.getByText("Test Project 2")).toBeVisible();
    });

    test("Roadmap page loads", async ({ page }) => {
        await page.goto("/roadmap");

        // Verify roadmap items are listed
        await expect(page.getByText("Roadmap Item 1")).toBeVisible();
    });
});
