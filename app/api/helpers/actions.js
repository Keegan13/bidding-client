import { API_SUFFIXES, ActionRegex } from 'api/constants';
import * as _ from 'lodash';

function apiPending(actionType) {
  return {
    type: actionType
  };
}

function apiSuccess(actionType, payload) {
  return {
    type: actionType,
    payload
  };
}
function apiError(actionType, { error, failedAction }) {
  return {
    type: actionType,
    failedAction,
    error
  };
}

/**
 *  Calls action creator for specified action type and returns it's result
 *
 * @param {string} actionType - redux action type
 * @param {any} [params] - nothing for '*_PENDING' | response for '*_SUCCESS' | error for '*_ERROR'.
 * @param {error} error - error
 * @returns {object} - action
 */
export function resolveAction(actionType, { payload, error, failedAction } = {}) {
  if (actionType.endsWith(API_SUFFIXES.PENDING, actionType.length)) {
    return apiPending(actionType);
  }

  if (actionType.endsWith(API_SUFFIXES.ERROR, actionType.length)) {
    return apiError(actionType, { error, failedAction });
  }

  if (actionType.endsWith(API_SUFFIXES.SUCCESS, actionType.length)) {
    return apiSuccess(actionType, payload);
  }

  return { type: '' };
}

/**
 *
 * @param {string} actionType - name of action type
 */
export function convertToPendingAction(actionType) {
  if (_.isNil(actionType)) {
    throw new Error('actionType parameter is required');
  }

  let actionName = ActionRegex.exec(actionType);
  if (!actionName) {
    actionName = actionType;
    // throw new Error(`Can't convert action ${actionType} to *_PENDING action because it's not a one of API action types`);
  }

  return `${actionName}_${API_SUFFIXES.PENDING}`;
}

/**
 *
 * @param {string} actionType - name of action type
 */
export function convertToErrorAction(actionType) {
  if (_.isNil(actionType)) {
    throw new Error('actionType parameter is required');
  }
  let actionName = ActionRegex.exec(actionType);
  if (!actionName) {
    actionName = actionType;
    // throw new Error(`Can't convert action ${actionType} to *_ERROR action because it's not a one of API action types`);
  }

  return `${actionName}_${API_SUFFIXES.ERROR}`;
}

/**
 *
 * @param {string} action
 *
 * @return {string[]} - an array of api actions suffixed either with  e.g. _PENDING,_ERROR or _SUCCESS;
 */
export function createApiTypes(action) {
  if (_.isNil(action)) {
    throw new Error('action name is required');
  }

  return [
    `${action}_${API_SUFFIXES.PENDING}`,
    `${action}_${API_SUFFIXES.SUCCESS}`,
    `${action}_${API_SUFFIXES.ERROR}`
  ];
}
