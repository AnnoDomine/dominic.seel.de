import authQueries from "./queries/auth"
import userQueries from "./queries/user"

const combinedApis = [authQueries.middleware, userQueries.middleware]

export default combinedApis
