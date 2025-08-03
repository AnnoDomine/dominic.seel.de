import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContentContainer from "./content-container";

describe("ContentContainer", () => {
    it("renders without crashing", () => {
        render(<ContentContainer data-testid="content-container">Content</ContentContainer>);
        const contentContainer = screen.getByTestId("content-container");
        expect(contentContainer).toMatchSnapshot();
    });
});
