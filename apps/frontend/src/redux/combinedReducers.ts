import { combineReducers } from "@reduxjs/toolkit"
import authQueries from "./queries/auth"
import userQueries from "./queries/user"

const combinedReducers = combineReducers({
    [authQueries.reducerPath]: authQueries.reducer,
    [userQueries.reducerPath]: userQueries.reducer,
})

export type CombinedReducers = typeof combinedReducers
export default combinedReducers
