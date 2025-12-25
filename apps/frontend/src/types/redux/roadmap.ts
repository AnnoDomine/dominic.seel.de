import type { PaginatedResponse } from "../common";

export type RoadmapStatus = "planned" | "in_progress" | "completed" | "on_hold";

export type TRoadmapItem = {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    target_date: string;
    status: RoadmapStatus;
};

export type TRoadmapList = PaginatedResponse<TRoadmapItem>;
