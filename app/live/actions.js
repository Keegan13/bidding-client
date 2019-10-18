import { ASSIGNMENT_STATUSES } from 'models';

export const HUB_CONNECTION_PENDING = 'HUB_CONNECTION_PENDING';
export const HUB_CONNECTION_ESTABLISHED = 'HUB_CONNECTION_ESTABLISHED';
export const HUB_CONNECTION_ERROR = 'HUB_CONNECTION_ERROR';
export const HUB_CONNECTION_DISCONNECTED = 'HUB_CONNECTION_DISCONNECTED';
export const HUB_NEW_ASSIGNMENT_RECEIVED = 'HUB_NEW_ASSIGNMENT_RECEIVED';

/**
 *
 * @param {object} assignment - assignment from received from hub
 */
export function hubNewAssignment(assignment) {
  assignment.status = ASSIGNMENT_STATUSES.TO_BE_PLACED;
  return {
    type: HUB_NEW_ASSIGNMENT_RECEIVED,
    payload: assignment
  };
}

export function hubConnectionDisconnected() {
  return {
    type: HUB_CONNECTION_DISCONNECTED
  };
}

export function hubConnectionConnected() {
  return {
    type: HUB_CONNECTION_ESTABLISHED
  };
}
export function hubConnectionError() {
  return {
    type: HUB_CONNECTION_ERROR
  };
}

export function hubConnectionPending() {
  return {
    type: HUB_CONNECTION_PENDING
  };
}
