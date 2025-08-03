import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import NavigationContainer from "./navigation-container"

describe("NavigationContainer", () => {
    it("renders without crashing", () => {
        render(<NavigationContainer data-testid="navigation-container">Content</NavigationContainer>)
        const navigationContainer = screen.getByTestId("navigation-container")
        expect(navigationContainer).toMatchSnapshot()
    })
})
