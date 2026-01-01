import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],
    addons: [
        "@storybook/addon-docs",
        "@storybook/addon-a11y",
        "@storybook/addon-highlight",
        "storybook-addon-material-ui",
    ],
    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {
            builder: {
                viteConfigPath: "vite.config.ts",
            },
        },
    },
};

function getAbsolutePath(value: string): string {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
