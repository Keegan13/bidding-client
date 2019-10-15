import * as _ from 'lodash';
import { createDefaultApiHandlers } from './helpers';
import { API_ACTION_TYPES as Types } from './constants';
import { replace } from 'connected-react-router';

//Types
export const apiTypes = [..._.values(Types)];


function replaceOrInsert(array, assignment) {
    let index = array.findIndex(x => x.id == assignment.id);
    if (index != -1) {
        return [...array.slice(0, index > 0 ? index : 0), assignment, ...array.slice(index + 1)]
    }

    return [...array, assignment];
}

//Handlers
const apiHandlers =
{
    ...createDefaultApiHandlers(apiTypes),
    //it's a place to override default handlers
    [Types.SPLIT_BID_SUCCESS]: (state, action) => {
        let { assignments } = state;
        let index = assignments.findIndex(x => x.id == action.payload.assignmentId);
        if (index != -1) {
            let targetAssignment = assignments[index];
            let updated = Object.assign({}, targetAssignment, {
                placedBets: [...targetAssignment.placedBets, action.payload]
            });

            return {
                ...state,
                assignments: [...assignments.slice(0, index > 0 ? index : 0), updated, ...assignments.slice(index + 1)],
                [Types.SPLIT_BID_PENDING]: false,
                pending: false
            }
        }
        return state;
    },
    [Types.SET_ASSIGNMENT_STATUS_SUCCESS]: (state, action) => {
        const { assignments } = state;
        let targetAssignment = assignments.find(x => x.id == action.payload.assignmentId);
        if (_.isNil(targetAssignment)) {
            return state;
        }

        return { ...state, assignments: replaceOrInsert(assignments, { ...targetAssignment, status: action.payload.status }) }
    },
    [Types.ADD_COMMENT_SUCCESS]: (state, action) => {
        return state;
    },
    [Types.LOAD_ASSIGNMENTS_SUCCESS]: (state, action) => {

        return {
            ...state,
            assignments: [...action.payload],
            [Types.LOAD_ASSIGNMENTS_PENDING]: false, pending: false
        }
    },
    [Types.LOAD_ASSIGNMENT_SUCCESS]: (state, action) => {
        let receivedAssignment = action.payload;
        return { ...state, assignments: replaceOrInsert(state.assignments, receivedAssignment) };
    }
}

export default apiHandlers;