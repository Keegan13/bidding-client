import * as _ from 'lodash';
import { API_SUFFIXES } from '../constants';
import { convertToPendingAction, convertToErrorAction } from './actions';

function successHandler(state, action) {
  return {
    ...state,
    ...action.payload,
    [convertToPendingAction(action.type)]: false,
    pending: false
  };
}

function failureHandler(state, action) {
  return {
    ...state,
    errorObject: action.payload,
    error: action.error,
    failedActions: [...state.failedActions, action.failedAction],
    [convertToErrorAction(action.type)]: false,
    pending: false
  };
}

function pendingHandler(state, action) {
  return {
    ...state,
    [action.type]: true,
    pending: true
  };
}

function getApiActionHandler(type, handler = null) {
  if (!_.isNil(handler)) {
    return handler;
  }

  if (type.endsWith(API_SUFFIXES.SUCCESS)) {
    return successHandler;
  }

  if (type.endsWith(API_SUFFIXES.PENDING)) {
    return pendingHandler;
  }

  if (type.endsWith(API_SUFFIXES.ERROR)) {
    return failureHandler;
  }

  return (state, action) => state;
}

/**
 * Creates object with default api handlers
 *
 * @param {string[]} apiActionTypes - an array of api action types
 *
 * @return {object} - object with default handlers for api actions bound to corresponding filed
 */
export function createDefaultApiHandlers(apiActionTypes) {
  return _.reduce(apiActionTypes, (agg, next) => ({ ...agg, [next]: getApiActionHandler(next) }), {});
}
