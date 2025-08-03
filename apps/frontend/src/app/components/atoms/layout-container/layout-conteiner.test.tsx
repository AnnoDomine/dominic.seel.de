import { it, describe, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import LayoutContainer from "./layout-container"

describe("LayoutContainer", () => {
    it("renders without crashing", () => {
        render(<LayoutContainer data-testid="layout-container">Content</LayoutContainer>)
        const layoutContainer = screen.getByTestId("layout-container")
        expect(layoutContainer).toMatchSnapshot()
    })
})
