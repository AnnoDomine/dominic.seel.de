import type { Meta, StoryObj } from "@storybook/react";
import type { TRoadmapItem } from "../../../../types/redux/roadmap";
import RoadmapItem from "./roadmap-item";

const mockItem: TRoadmapItem = {
    id: 1,
    title: "Implement Dark Mode",
    description: "Allow users to toggle between light and dark themes.",
    target_date: "2024-12-31T00:00:00Z",
    created_at: "2024-01-01T12:00:00Z",
    updated_at: "2024-01-02T14:30:00Z",
    status: "planned",
};

const meta: Meta<typeof RoadmapItem> = {
    component: RoadmapItem,
    title: "Atoms/RoadmapItem",
    argTypes: {
        triggerLoadMore: { action: "load more triggered" },
    },
};

export default meta;
type Story = StoryObj<typeof RoadmapItem>;

export const Default: Story = {
    args: {
        type: "item",
        item: mockItem,
        status: "planned",
    },
};

export const Loading: Story = {
    args: {
        type: "loading",
        item: mockItem, // Item is ignored in loading state but required by type
        status: "planned",
    },
};

export const LoadMore: Story = {
    args: {
        type: "load_more",
        item: mockItem,
        status: "planned",
    },
};
