import {basicRequest} from "@/service/api";

export const getCommunityStatistics = (handler) => {
    basicRequest({
        path: '/statistics',
        method: 'get',
        handler: handler
    });
};
