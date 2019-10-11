export const  SELECT_ASSIGNMENT = "SELECT_ASSIGNMENT";
export const  DESELECT_ASSIGNMENT = "DESELECT_ASSIGNMENT";

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