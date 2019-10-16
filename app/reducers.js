/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
//import { connectRouter } from 'connected-react-router';
import biddingReducer from './reducers/bidding';
//import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import { reducer as notifReducer } from 'redux-notifications';


/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {

  const rootReducer = combineReducers({
    global: globalReducer,
    bidding: biddingReducer,
    notifs: notifReducer,
    ...injectedReducers,

  });

  return rootReducer;
}
