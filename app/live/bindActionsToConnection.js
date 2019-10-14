import { hubNewAssignment } from './actions';

const bindActionsToConnection = (dispatch, connection) => {
    connection.on("", (ass) => {
        dispatch(hubNewAssignment(ass));
    });
};

export default bindActionsToConnection;