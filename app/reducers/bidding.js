import apiHandlers from 'api/handlers';
import hubHandlers from 'live/handlers';
import appHandlers from 'containers/BiddingPage/handlers';
import createReducer from 'utils/createReducer';

const initialState = {
    assignments: [],
    selectedId: null,
    pending: false
};

const biddingReducer = createReducer(initialState,
    {
        ...apiHandlers,
        ...hubHandlers,
        ...appHandlers
    });

export default biddingReducer 