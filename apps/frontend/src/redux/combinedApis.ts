import authQueries from "./queries/auth";
import projectQueries from "./queries/project";
import roadmapQueries from "./queries/roadmap";
import technologyQueries from "./queries/technology";
import userQueries from "./queries/user";

const combinedApis = [
    authQueries.middleware,
    userQueries.middleware,
    projectQueries.middleware,
    technologyQueries.middleware,
    roadmapQueries.middleware,
];

export default combinedApis;
