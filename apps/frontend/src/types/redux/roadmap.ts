import type { PaginatedResponse } from "../common";

export type TRoadmapItem = {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    target_date: string;
    status: "planned" | "in_progress" | "completed";
};

export type TRoadmapList = PaginatedResponse<TRoadmapItem>;
