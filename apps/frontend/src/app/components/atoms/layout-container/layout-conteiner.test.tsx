import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LayoutContainer from "./layout-container";

describe("LayoutContainer", () => {
    it("renders without crashing", () => {
        render(<LayoutContainer data-testid="layout-container">Content</LayoutContainer>);
        const layoutContainer = screen.getByTestId("layout-container");
        expect(layoutContainer).toMatchSnapshot();
    });
});
