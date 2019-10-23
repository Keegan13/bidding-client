import * as _ from 'lodash';
import { createDefaultApiHandlers } from './helpers';
import { API_ACTION_TYPES as Types } from './constants';

// Types
export const apiTypes = [..._.values(Types)];

// Handlers
const apiHandlers = {
  ...createDefaultApiHandlers(apiTypes),
  // it's a place to override default handlers
  [Types.SPLIT_BID_SUCCESS]: (state, action) => {
    const { assignments } = state;
    const index = assignments.findIndex((x) => x.id === action.payload.assignmentId);
    if (index !== -1) {
      const targetAssignment = assignments[index];
      const updated = Object.assign({}, targetAssignment, {
        placedBets: [...targetAssignment.placedBets, action.payload]
      });

      return {
        ...state,
        assignments: [...assignments.slice(0, index > 0 ? index : 0), updated, ...assignments.slice(index + 1)],
        [Types.SPLIT_BID_PENDING]: false,
        pending: false
      };
    }
    return state;
  },
  [Types.SET_ASSIGNMENT_STATUS_SUCCESS]: (state, action) => {
    const { assignments } = state;
    const targetAssignment = assignments.find((x) => x.id === action.payload.assignmentId);
    if (_.isNil(targetAssignment)) {
      return state;
    }

    return { ...state, assignments: replaceOrInsert(assignments, { ...targetAssignment, status: action.payload.status }) };
  },
  [Types.LOAD_ASSIGNMENTS_SUCCESS]: (state, action) => ({
    ...state,
    assignments: [...action.payload],
    [Types.LOAD_ASSIGNMENTS_PENDING]: false,
    pending: false
  }),
  [Types.LOAD_ASSIGNMENT_SUCCESS]: (state, action) => {
    const receivedAssignment = action.payload;
    return { ...state, assignments: replaceOrInsert(state.assignments, receivedAssignment) };
  },
  [Types.ADD_COMMENT_SUCCESS]: (state, action) => {
    const comment = action.payload;

    if (_.isNil(comment) || _.isNil(comment.id)) {
      return state;
    }

    const { assignments } = state;
    const targetAssignment = assignments.find((x) => x.id === action.payload.assignmentId);

    if (_.isNil(targetAssignment)) {
      return state;
    }

    return { ...state, assignments: replaceOrInsert(state.assignments, { ...targetAssignment, comments: [...(targetAssignment.comments || []), comment] }) };
  },
  [Types.GET_ASSIGNMENTS_SUCCESS]: (state, action) => {
    const { items } = action.payload;
    return { ...state, bookmakers: [...items] }
  }
}

/**
 * Helpers
 */

function replaceOrInsert(array, assignment) {
  const index = array.findIndex((x) => x.id === assignment.id);
  if (index !== -1) {
    return [...array.slice(0, index > 0 ? index : 0), assignment, ...array.slice(index + 1)];
  }

  return [...array, assignment];
}

export default apiHandlers;
