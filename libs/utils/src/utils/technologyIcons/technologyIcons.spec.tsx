import { describe, expect, it } from "vitest";
import { technologyIcons } from "./technologyIcons";

describe("technologyIcons", () => {
    it("should match the expected schema for all entries", () => {
        Object.keys(technologyIcons).forEach((key) => {
            const entry = technologyIcons[key];
            expect(entry).toHaveProperty("tags");
            expect(entry).toHaveProperty("Icon");

            expect(Array.isArray(entry.tags)).toBe(true);
            expect(entry.tags.length).toBeGreaterThan(0);

            // Icon should be a function (component) or null
            if (entry.Icon !== null) {
                expect(typeof entry.Icon).toBe("function");
            } else {
                expect(entry.Icon).toBeNull();
            }
        });
    });

    it("should contain specific known keys", () => {
        expect(technologyIcons).toHaveProperty("react");
        expect(technologyIcons.react.tags).toContain("javascript");
        expect(technologyIcons.react.Icon).not.toBeNull();

        expect(technologyIcons).toHaveProperty("python");
        expect(technologyIcons.python.tags).toContain("language");

        // Test a key with null Icon
        expect(technologyIcons).toHaveProperty("ant");
        expect(technologyIcons.ant.Icon).toBeNull();
    });
});
