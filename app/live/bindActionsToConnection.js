import { dateReceivedPipe } from 'api/helpers';
import { hubNewAssignment } from './actions';

const bindActionsToConnection = (dispatch, connection) => {
  connection.on('', (ass) => {
    dispatch(hubNewAssignment(dateReceivedPipe(ass)));
  });
};

export default bindActionsToConnection;
