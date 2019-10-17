/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Import root app
import BiddingPage from './containers/BiddingPage';
// Load the favicon
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
/* eslint-enable import/no-webpack-loader-syntax */


import 'styles/theme.scss';


import configureStore from './configureStore';

// Import all initialization stuff
import { registerOpenSans } from './init';

registerOpenSans();

// Create redux store with history
const initialState = {};
const store = configureStore(initialState);
const rootElement = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
      <BiddingPage />
      {/* </ConnectedRouter> */}
    </Provider>,
    rootElement
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(rootElement);
    render();
  });
}

render();
