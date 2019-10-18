/**
 * Create the store with dynamic reducers
 */
import {
  createStore, applyMiddleware, compose
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createNotificationMiddleware } from 'api/apiMiddleware';
import { NOTIFICATION_TYPES } from 'constant';
import createReducer from './reducers';
import { API_ACTION_TYPES } from './api/constants';

export default function configureStore(initialState = {}) {
  const notificationConfig = {
    // [API_ACTION_TYPES.ADD_COMMENT_ERROR]: {
    //   message: 'Cannot add comment',
    //   type: NOTIFICATION_TYPES.ERROR,
    //   timeout: 10000,
    //   level: 50
    // },
    // [API_ACTION_TYPES.SPLIT_BID_ERROR]: {
    //   message: 'Cannot place bet',
    //   type: NOTIFICATION_TYPES.ERROR,
    //   timeout: 10000,
    //   level: 50
    // },
    // [API_ACTION_TYPES.SET_ASSIGNMENT_STATUS_ERROR]: {
    //   message: "Can't change status",
    //   type: NOTIFICATION_TYPES.ERROR,
    //   timeout: 10000,
    //   level: 50
    // }
  };


  let middleware = [];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
  }

  middleware = [...middleware, thunk, createNotificationMiddleware(notificationConfig)];


  const enhancers = [applyMiddleware(...middleware)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
      // Prevent recomputing reducers for `replaceReducer`
      shouldHotReload: false
    })
    : compose;
  /* eslint-enable */

  const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers));

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
      store.dispatch({ type: '@@REDUCER_INJECTED' });
    });
  }

  return store;
}
