import * as _ from 'lodash';
import { removeFailedAction } from 'actions';
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
  return async (dispatch) => {
    dispatch(resolveAction(ApiTypes.SPLIT_BID_PENDING));
    try {
      let data = await api.placeBet(assignmentId, volume, odds);
      if (data.error) {
        throw (data.error);
      }
      data = dateReceivedPipe(data);
      dispatch(resolveAction(ApiTypes.SPLIT_BID_SUCCESS, { payload: data }));
      return data;
    } catch (error) {
      const failedAction = {
        id: Date.now(),
        message: 'Failed to place bet!',
        retry: placeBetThunk.bind(this, assignmentId, volume, odds),
        retryFunctionName: placeBetThunk.name,
        parameters: { assignmentId, volume, odds },
        actionType: ApiTypes.SPLIT_BID_ERROR,
        dateFailed: new Date(Date.now())
      };
      dispatch(resolveAction(ApiTypes.SPLIT_BID_ERROR, { error, failedAction }));
    }
  };
}

/**
 * Makes asynchronous request to active assignments endpoint
 *
 * @return {function}  - that accepts  dispatch as parameter and makes asynchronous call to api
 */
export function loadAssignmentsThunk() {
  return async (dispatch) => {
    dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENTS_PENDING));

    try {
      let response = await api.loadAssignments();

      if (response.error) {
        throw (response.error);
      }
      response = dateReceivedPipe(response);
      dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENTS_SUCCESS, { payload: response }));
      return response;
    } catch (error) {
      const failedAction = {
        id: Date.now(),
        message: 'Failed to load assignments',
        retry: loadAssignmentsThunk.bind(this),
        retryFunctionName: loadAssignmentsThunk.name,
        parameters: {},
        actionType: ApiTypes.LOAD_ASSIGNMENTS_ERROR,
        dateFailed: new Date(Date.now())
      };
      dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENTS_ERROR, { error, failedAction }));
    }
  };
}

/**
 * Makes asynchronous request to load or reload single assignment
 *
 * @return {function}  - that accepts  dispatch as parameter and makes asynchronous call to api
 */
export function loadOrReloadAssignmentThunk(assignmentId) {
  return async (dispatch) => {
    dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENT_PENDING));
    try {
      let response = await api.loadAssignment(assignmentId);

      if (response.error) {
        throw (response.error);
      }
      response = dateReceivedPipe(response);
      dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENT_SUCCESS, { payload: response }));
      return response;
    } catch (error) {
      const failedAction = {
        id: Date.now(),
        message: 'Failed to update assignment',
        retry: loadOrReloadAssignmentThunk.bind(this, assignmentId),
        retryFunctionName: loadOrReloadAssignmentThunk.name,
        parameters: { assignmentId },
        actionType: ApiTypes.LOAD_ASSIGNMENT_ERROR,
        dateFailed: new Date(Date.now())
      };

      dispatch(resolveAction(ApiTypes.LOAD_ASSIGNMENT_ERROR, { error, failedAction }));
    }
  };
}


/**
 * Makes asynchronous request to load or reload single assignment
 *
 * @return {function}  - that accepts  dispatch as parameter and makes asynchronous call to api
 */
export function addCommentThunk(assignmentId, text) {
  return async (dispatch) => {
    dispatch(resolveAction(ApiTypes.ADD_COMMENT_PENDING));
    try {
      let response = await api.addComment(assignmentId, text);
      if (response.error) {
        throw (response.error);
      }
      response = dateReceivedPipe(response);
      dispatch(resolveAction(ApiTypes.ADD_COMMENT_SUCCESS, { payload: response }));

      return response;
    } catch (error) {
      const failedAction = {
        id: Date.now(),
        message: 'Failed to add comment',
        retry: addCommentThunk.bind(this, assignmentId, text),

        retryFunctionName: addCommentThunk.name,
        parameters: { assignmentId, text },
        actionType: ApiTypes.ADD_COMMENT_ERROR,
        dateFailed: new Date(Date.now())
      };
      dispatch(resolveAction(ApiTypes.ADD_COMMENT_ERROR, { error, failedAction }));
    }
  };
}

/**
 * Makes asynchronous request to load or reload single assignment
 *
 * @return {function}  - that accepts  dispatch as parameter and makes asynchronous call to api
 */
export function setAssignmentStatusThunk(assignmentId, status) {
  return async (dispatch) => {
    dispatch(resolveAction(ApiTypes.SET_ASSIGNMENT_STATUS_PENDING));

    try {
      let response = await api.setStatus(assignmentId, status);
      if (response.error) {
        throw (response.error);
      }
      response = dateReceivedPipe(response);
      dispatch(resolveAction(ApiTypes.SET_ASSIGNMENT_STATUS_SUCCESS, { payload: response }));
      return response;
    } catch (error) {
      const failedAction = {
        id: Date.now(),
        message: 'Failed to change assignment status',
        retry: setAssignmentStatusThunk.bind(this, assignmentId, status),

        retryFunctionName: setAssignmentStatusThunk.name,
        parameters: { assignmentId, status },
        actionType: ApiTypes.SET_ASSIGNMENT_STATUS_ERROR,
        dateFailed: new Date(Date.now())
      };
      dispatch(resolveAction(ApiTypes.SET_ASSIGNMENT_STATUS_ERROR, { error, failedAction }));
    }
  };
}

/**
 * Repeats failed action
 *
 * @param {object} failedAction - action with id and retry
 *
 * @return {function}  - that accepts  dispatch as parameter and retry to call previously failed thunk/action
 */
export function retryRequestThunk(failedAction) {
  return async (dispatch) => {
    dispatch(removeFailedAction(failedAction.id));
    await failedAction.retry()(dispatch);
  };
}
