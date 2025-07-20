import { combineReducers } from "@reduxjs/toolkit";
import authQueries from "./queries/auth";
import userQueries from "./queries/user";
import projectQueries from "./queries/project";
import technologyQueries from "./queries/technology";

const combinedReducers = combineReducers({
    [authQueries.reducerPath]: authQueries.reducer,
    [userQueries.reducerPath]: userQueries.reducer,
    [projectQueries.reducerPath]: projectQueries.reducer,
    [technologyQueries.reducerPath]: technologyQueries.reducer,
});

export type CombinedReducers = typeof combinedReducers;
export default combinedReducers;
