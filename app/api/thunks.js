import { resolveAction, dateReceivedPipe } from './helpers';
import { API_ACTION_TYPES as ApiTypes } from './constants';
import api from './index';

/**
 * Makes asynchronous request to place bet endpoint
 *
 * @param  {string} assignmentId - Id of assignment
 * @param  {number} volume - amount of money
 * @param  {(string|number)} odds -  win chances
 * 
 * @return {function}  - that handled by react-thunk middleware 
 */
export function placeBetThunk(assignmentId, volume, odds) {
    return (dispatch) => {
        dispatch(resolveAction(ApiTypes.SPLIT_BID_PENDING));
        api.placeBet(assignmentId, volume, odds)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                res = dateReceivedPipe(res);
                dispatch(resolveAction(ApiTypes.SPLIT_BID_SUCCESS, res));
                return res;
            })
            .catch(error => {
                dispatch(resolveAction(ApiTypes.SPLIT_BID_ERROR, error));
            })
    };
}

/**
 * Makes asynchronous request to active assignments endpoint
 * 
 * @return {function}  - that accepts  dispatch as parameter and makes asynchronous call to api
 */
export function loadAssignmentsThunk() {
    return (dispatch) => {

        dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENTS_PENDING));
        api.loadAssignments()
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                res = dateReceivedPipe(res);
                dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENTS_SUCCESS, res));
                return res;
            })
            .catch(error => {
                dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENTS_ERROR, error));
            })
    };
}

/**
 * Makes asynchronous request to load or reload single assignment
 * 
 * @return {function}  - that accepts  dispatch as parameter and makes asynchronous call to api
 */
export function loadOrReloadAssignmentThunk(assignmentId) {
    return (dispatch) => {

        dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENT_PENDING));
        api.loadAssignment(assignmentId)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                res = dateReceivedPipe(res);
                dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENT_SUCCESS, res));
                return res;
            })
            .catch(error => {
                dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENT_ERROR, error));
            })
    };
}


/**
 * Makes asynchronous request to load or reload single assignment
 * 
 * @return {function}  - that accepts  dispatch as parameter and makes asynchronous call to api
 */
export function addCommentThunk(assignmentId, text) {
    return (dispatch) => {
        dispatch(resolveAction(ApiTypes.ADD_COMMENT_PENDING));
        api.addComment(assignmentId, text)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                res = dateReceivedPipe(res);
                dispatch(resolveAction(ApiTypes.ADD_COMMENT_SUCCESS, res));
                return res;
            })
            .catch(error => {
                dispatch(resolveAction(ApiTypes.ADD_COMMENT_ERROR, error));
            })
    };
}

/**
 * Makes asynchronous request to load or reload single assignment
 * 
 * @return {function}  - that accepts  dispatch as parameter and makes asynchronous call to api
 */
export function setAssignmentStatusThunk(assignmentId, status) {
    return (dispatch) => {
        dispatch(resolveAction(ApiTypes.SET_ASSIGNMENT_STATUS_PENDING));
        api.setStatus(assignmentId, status)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                res = dateReceivedPipe(res);
                dispatch(resolveAction(ApiTypes.SET_ASSIGNMENT_STATUS_SUCCESS, res));
                return res;
            })
            .catch(error => {
                dispatch(resolveAction(ApiTypes.SET_ASSIGNMENT_STATUS_ERROR, error));
            })
    };
}