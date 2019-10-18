import connection from '.';
import {
  hubConnectionPending, hubConnectionDisconnected, hubConnectionConnected, hubConnectionError
} from './actions';
import bindHubToDispatch from './bindActionsToConnection';

/**
 * Makes asynchronous request to place bet endpoint
 *
 * @param  {string} assignmentId - Id of assignment
 * @param  {number} volume - amount of money
 * @param  {(string|number)} odds -  win chances
 *
 * @return {function}  - that handled by react-thunk middleware
 */
export function connectToHubThunk() {
  return (dispatch) => {
    dispatch(hubConnectionPending());
    connection.start()
      .then((conn) => {
        dispatch(hubConnectionConnected());
        bindHubToDispatch(dispatch, conn);
      })
      .catch((error) => {
        dispatch(hubConnectionError(error));
        console.error(error);
      });
  };
}
