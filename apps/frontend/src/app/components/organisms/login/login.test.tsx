import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Login from "./login"; // Assuming the component is in the same directory as the test file

// Mock the useUser hook globally for this test file
const mockHandleLogin = vi.fn();
vi.mock("../../../../redux/hooks/useUser.hooks", () => ({
    __esModule: true,
    default: () => ({
        handleLogin: mockHandleLogin,
        // If useUser returns other properties that Login component might use,
        // you would need to mock them here as well.
    }),
}));

describe("Login Component", () => {
    beforeEach(() => {
        // Clear all mock calls before each test to ensure isolation
        mockHandleLogin.mockClear();
    });

    // Test case 1: Ensures the component renders all expected elements
    it("renders the login form elements correctly", () => {
        render(<Login />);

        // Check for the main heading
        expect(screen.getByRole("heading", { name: /login to acp/i })).toMatchSnapshot();

        // Check for email and password input fields using their placeholders
        // (or data-testid if you prefer, I added data-testid in the component for better selection)
        expect(screen.getByPlaceholderText("E-Mail")).toMatchSnapshot();
        expect(screen.getByPlaceholderText("*********")).toMatchSnapshot(); // Initial placeholder for password

        // Check for the submit button
        expect(screen.getByRole("button", { name: /submit/i })).toMatchSnapshot();
    });

    // Test case 2: Verifies that typing into the input fields updates their values
    it("updates email and password field values on change", () => {
        render(<Login />);

        // Get the input elements using their data-testids (added in the component)
        const emailInput = screen.getByTitle("E-Mail") as HTMLInputElement;
        const passwordInput = screen.getByTitle("Password") as HTMLInputElement;

        const emailInnerInput = emailInput.getElementsByClassName("MuiInputBase-input")[0] as HTMLInputElement;
        const passwordInnerInput = passwordInput.getElementsByClassName("MuiInputBase-input")[0] as HTMLInputElement;

        // Simulate typing into the email field
        fireEvent.change(emailInnerInput, { target: { value: "test@example.com" } });
        expect(emailInnerInput.value).toBe("test@example.com");

        // Simulate typing into the password field
        fireEvent.change(passwordInnerInput, { target: { value: "mysecurepassword" } });
        expect(passwordInnerInput.value).toBe("mysecurepassword");
    });

    // Test case 3: Checks the password visibility toggle functionality
    it("toggles password visibility when the eye icon is clicked", () => {
        render(<Login />);

        const passwordInput = screen.getByTitle("Password") as HTMLInputElement;
        const showPasswordIcon = screen.getByTestId("VisibilityTwoToneIcon"); // Initial icon: show password

        const passwordInnerInput = passwordInput.getElementsByClassName("MuiInputBase-input")[0] as HTMLInputElement;

        // Initially, the password input type should be 'password'
        expect(passwordInnerInput.type).toBe("password");
        // The 'show password' icon should be visible
        expect(showPasswordIcon).toMatchSnapshot();

        // Simulate clicking the 'show password' icon
        fireEvent.click(showPasswordIcon);

        // After click, the password input type should be 'text'
        expect(passwordInnerInput.type).toBe("text");
        // The 'hide password' icon should now be visible
        const hidePasswordIcon = screen.getByTestId("VisibilityOffTwoToneIcon");
        expect(hidePasswordIcon).toMatchSnapshot();

        // Simulate clicking the 'hide password' icon
        fireEvent.click(hidePasswordIcon);

        // After second click, the password input type should revert to 'password'
        expect(passwordInnerInput.type).toBe("password");
        // The 'show password' icon should be visible again
        expect(screen.getByTestId("VisibilityTwoToneIcon")).toMatchSnapshot();
    });

    // Test case 4: Verifies that form submission triggers handleLogin with correct data
    it("calls handleLogin with the correct email and password on form submission", () => {
        render(<Login />);

        const emailInput = screen.getByTitle("E-Mail");
        const passwordInput = screen.getByTitle("Password");
        const submitButton = screen.getByTestId("submit-button"); // Using data-testid for the button

        const emailInnerInput = emailInput.getElementsByClassName("MuiInputBase-input")[0] as HTMLInputElement;
        const passwordInnerInput = passwordInput.getElementsByClassName("MuiInputBase-input")[0] as HTMLInputElement;

        // Fill in the email and password fields
        fireEvent.change(emailInnerInput, { target: { value: "user@test.com" } });
        fireEvent.change(passwordInnerInput, { target: { value: "password123" } });

        // Simulate form submission by clicking the submit button
        fireEvent.click(submitButton);

        // Assert that handleLogin was called exactly once
        expect(mockHandleLogin).toHaveBeenCalledTimes(1);
        // Assert that handleLogin was called with the correct email and password
        expect(mockHandleLogin).toHaveBeenCalledWith({
            email: "user@test.com",
            password: "password123",
        });
    });
});
