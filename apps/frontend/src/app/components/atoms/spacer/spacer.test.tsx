import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Spacer from "./spacer"

describe("Spacer", () => {
    it("renders without crashing", () => {
        render(<Spacer data-testid="spacer" />)
        const spacer = screen.getByTestId("spacer")
        expect(spacer).toMatchSnapshot()
    })
})
