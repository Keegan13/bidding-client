import connection from '.';
import faker from 'faker';
import { hubConnectionPending, hubConnectionDisconnected, hubConnectionConnected, hubConnectionError } from './actions';
import bindHubToDispatch from './bindActionsToConnection';
import { dateReceivedPipe } from 'api/helpers';

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
                console.log('Successfully connected to hub');
                bindHubToDispatch(dispatch, conn);
            })
            .catch((error) => {
                dispatch(hubConnectionError());
                console.log('Error connecting to hub');
                console.error(error);
            });
    };
}

