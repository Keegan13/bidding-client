import {
  SELECT_ASSIGNMENT, DESELECT_ASSIGNMENT, REMOVE_ASSIGNMENT, REMOVE_NOTIFICATION, ADD_NOTIFICATION, REMOVE_FAILED_ACTION
} from './types';

/**
 * Dispatched when clicked on BiddingCard
 *
 * @type {Function} actionCreator
 *
 * @param {string} assignmentId id of assignment in store
 *
 * @return {object} An action object with a type of SELECT_ASSIGNMENT
 */
export function selectAssignment(assignmentId) {
  return {
    type: SELECT_ASSIGNMENT,
    id: assignmentId
  };
}

/**
 * Dispatched when no assignments in focus
 *
 * @return {object} An action object with a type of DESELECT_ASSIGNMENT
 */
export function deselectAssignment() {
  return {
    type: DESELECT_ASSIGNMENT
  };
}


/**
 * Dispatched an action to remove assignment from UI
 *
 * @param {string|number} assignmentId - id of an assignment to be removed
 *
 * @return {object} An action object with a type of DESELECT_ASSIGNMENT
 */
export function removeAssignment(assignmentId) {
  return {
    type: REMOVE_ASSIGNMENT,
    id: assignmentId
  };
}


/**
 * Dispatches an action, that adds  notification to 'notification' section of store
 *
 * @param {string} message - id of an assignment to be removed
 * @param {type} type
 *
 * @return {object} An action object with a type of DESELECT_ASSIGNMENT
 */
export function addNotification(message, type, timeout, level) {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      message,
      type,
      timeout,
      level
    }
  };
}


/**
 * Dispatched an action to remove assignment from UI
 *
 * @param {string|number} assignmentId - id of an assignment to be removed
 *
 * @return {object} An action object with a type of DESELECT_ASSIGNMENT
 */
export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    id
  };
}


/**
 * Dispatched an action to remove assignment from UI
 *
 * @param {string|number} assignmentId - id of an assignment to be removed
 *
 * @return {object} An action object with a type of DESELECT_ASSIGNMENT
 */
export function retryAction(failedAction) {
  return {
    type: failedAction.type,
    ...failedAction.parameters,
    failedId: failedAction.id
  };
}


export function removeFailedAction(id) {
  return {
    type: REMOVE_FAILED_ACTION,
    failedId: id
  };
}


// /**
//  * Dispatched an action to remove assignment from UI
//  *
//  * @param {string|number} assignmentId - id of an assignment to be removed
//  *
//  * @return {object} An action object with a type of DESELECT_ASSIGNMENT
//  */
// export function removeObsoleteNotifications() {
//     return {
//         type: REMOVE_NOTIFICATION,
//         id: assignmentId
//     }
// }
