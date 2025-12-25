import { expect, test } from "@playwright/test";

test.describe("Authentication", () => {
    test("Login flow success", async ({ page }) => {
        let isLoggedIn = false;

        // Mock Login API
        await page.route("*/**/api/auth/login", async (route) => {
            if (route.request().method() === "POST") {
                isLoggedIn = true; // Set state to logged in
                await route.fulfill({ status: 200, json: { key: "dummy-token" } });
            } else {
                await route.continue();
            }
        });

        // Mock User Info API (dynamic response based on isLoggedIn)
        await page.route("*/**/api/auth/user", async (route) => {
            if (isLoggedIn) {
                await route.fulfill({
                    status: 200,
                    json: {
                        id: 1,
                        username: "admin",
                        email: "admin@example.com",
                        is_staff: true,
                        is_superuser: true,
                    },
                });
            } else {
                // Return 401 or 403 or null to simulate not logged in
                await route.fulfill({ status: 401, json: { detail: "Authentication credentials were not provided." } });
            }
        });

        // Visit Admin Control Panel
        await page.goto("/admin-control-panel");

        // Expect Login form to be visible (because isLoggedIn is false)
        await expect(page.getByText("Login to ACP")).toBeVisible();

        // Fill credentials
        await page.locator("#email").fill("admin@example.com");
        await page.locator("#password").fill("password123");

        // Click Login
        await page.getByRole("button", { name: "Submit" }).click();

        // Expect Login form to disappear (meaning we are authenticated)
        // This implicitly waits for the login POST -> isLoggedIn=true -> refetch -> GET user -> 200 -> re-render
        await expect(page.getByText("Login to ACP")).not.toBeVisible();

        // Check for something that appears in ACP
        await expect(page.getByRole("button", { name: "Users" })).toBeVisible();
    });

    test("Login flow failure", async ({ page }) => {
        // Mock User Info API to always fail (not logged in)
        await page.route("*/**/api/auth/user", async (route) => {
            await route.fulfill({ status: 401, json: { detail: "Authentication credentials were not provided." } });
        });

        // Mock Login API failure
        await page.route("*/**/api/auth/login", async (route) => {
            await route.fulfill({ status: 401, json: { detail: "Invalid credentials" } });
        });

        await page.goto("/admin-control-panel");

        await page.locator("#email").fill("wrong@example.com");
        await page.locator("#password").fill("wrongpass");
        await page.getByRole("button", { name: "Submit" }).click();

        // Check that we are still on the login page / form still visible
        await expect(page.getByText("Login to ACP")).toBeVisible();
    });
});
