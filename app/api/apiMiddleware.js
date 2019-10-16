import { API_ACTION_TYPES, API_SUFFIXES } from './constants';
import * as  _ from 'lodash';
import { addNotification } from 'actions';
import { NOTIFICATION_TYPES } from 'constants/notifications';

// const getLevelFromType = (type) => {
//     with (NOTIFICATION_TYPES) {
//         switch (type) {
//             case ERROR: return 100;
//             case SUCCESS: return 25;
//             case WARNING: return 50;
//             case INFO: return 5;
//             default: return 1;
//         }
//     }
// };

export const createNotificationMiddleware = (config = {}) => {
    return store => next => action => {
        if (!_.isNil(config[action.type])) {
            let actionConfig = {
                type: NOTIFICATION_TYPES.INFO,
                message: `Default notification for action ${action.type}`,
                level: 5,
                timeout: 10000,
                ...config[action.type]
            };
            store.dispatch(addNotification(actionConfig.message, actionConfig.type, actionConfig.timeout, actionConfig.level));
        }

        return next(action);
    };
};


export default createNotificationMiddleware;