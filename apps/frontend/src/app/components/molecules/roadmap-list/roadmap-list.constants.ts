import type { TRoadmapItem } from "../../../../types/redux/roadmap";
import { RoadmapAdditionalItems } from "./roadmap-list.enums";

export const EMPTY_ITEM: Omit<TRoadmapItem, "title"> = {
    id: -1,
    created_at: "",
    updated_at: "",
    description: "",
    target_date: "",
    status: "planned",
    related_project: null,
};

export const LOADING_ITEM: TRoadmapItem = { ...EMPTY_ITEM, title: RoadmapAdditionalItems.LOADING };
export const LOAD_MORE_ITEM: TRoadmapItem = { ...EMPTY_ITEM, title: RoadmapAdditionalItems.LOAD_MORE };
