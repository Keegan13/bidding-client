import { hubNewAssignment } from './actions';
import { dateReceivedPipe } from 'api/helpers';

const bindActionsToConnection = (dispatch, connection) => {
    connection.on("", (ass) => {
        dispatch(hubNewAssignment(dateReceivedPipe(ass)));
    });
};

export default bindActionsToConnection;