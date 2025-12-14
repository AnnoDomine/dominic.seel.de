import type { MockInstance } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { openInNewTab } from "./openInNewTab";

describe("openInNewTab", () => {
    let createElementSpy: MockInstance;
    let mockAnchor: HTMLAnchorElement;

    beforeEach(() => {
        // Mock the anchor element
        mockAnchor = {
            href: "",
            target: "",
            rel: "",
            click: vi.fn(),
            remove: vi.fn(),
        } as unknown as HTMLAnchorElement;

        // Spy on document.createElement and return our mock anchor
        createElementSpy = vi.spyOn(document, "createElement").mockReturnValue(mockAnchor);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should create an anchor tag with correct attributes and simulate a click", () => {
        const url = "https://example.com";
        openInNewTab(url);

        expect(createElementSpy).toHaveBeenCalledWith("a");
        expect(mockAnchor.href).toBe(url);
        expect(mockAnchor.target).toBe("_blank");
        expect(mockAnchor.rel).toBe("noopener noreferrer");
        expect(mockAnchor.click).toHaveBeenCalled();
        expect(mockAnchor.remove).toHaveBeenCalled();
    });
});
