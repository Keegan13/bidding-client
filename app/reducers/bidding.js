import apiHandlers from 'api/handlers';
import hubHandlers from 'live/handlers';
import appHandlers from 'containers/BiddingPage/handlers';
import createReducer from 'utils/createReducer';
import getStateFromWindow from 'utils/getValueFromEnvironment';
import { dateReceivedPipe } from 'api/helpers';

let assignmentsFromWindow = getStateFromWindow((window) => window.assignments);

const initialState = {
    assignments: [...dateReceivedPipe(assignmentsFromWindow)] || [],
    selectedId: null,
    pending: false,
    bet: {
        volume: '',
        placed: 1,
        win: 1
    }
};

const biddingReducer = createReducer(initialState,
    {
        ...apiHandlers,
        ...hubHandlers,
        ...appHandlers
    });

export default biddingReducer;


