import { combineReducers } from "@reduxjs/toolkit";
import authQueries from "./queries/auth";
import projectQueries from "./queries/project";
import roadmapQueries from "./queries/roadmap";
import technologyQueries from "./queries/technology";
import userQueries from "./queries/user";

const combinedReducers = combineReducers({
    [authQueries.reducerPath]: authQueries.reducer,
    [userQueries.reducerPath]: userQueries.reducer,
    [projectQueries.reducerPath]: projectQueries.reducer,
    [technologyQueries.reducerPath]: technologyQueries.reducer,
    [roadmapQueries.reducerPath]: roadmapQueries.reducer,
});

export type CombinedReducers = typeof combinedReducers;
export default combinedReducers;
