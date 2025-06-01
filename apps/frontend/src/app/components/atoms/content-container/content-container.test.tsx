import { it, describe, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import ContentContainer from "./content-container"

describe("ContentContainer", () => {
    it("renders without crashing", () => {
        render(<ContentContainer data-testid="content-container">Content</ContentContainer>)
        const contentContainer = screen.getByTestId("content-container")
        expect(contentContainer).toMatchSnapshot()
    })
})
