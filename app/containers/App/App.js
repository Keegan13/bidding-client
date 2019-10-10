/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { Modal } from 'react-modal';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import BiddingPage from 'containers/BiddingPage';
import Header from 'components/Header';
import Footer from 'components/Footer';
import BiddingTable from 'components/BiddingTable';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="React.js Boilerplate"
    >
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>
    <Header />
    <Switch>
      {/* <Route exact path="/" component={HomePage} /> */}
      <Route exact path="/" component={BiddingPage}/>
      <Route path="/table" component={BiddingTable}/>
      {/* <Route path="/features" component={FeaturePage} /> */}
      <Route path="" component={NotFoundPage} />
    </Switch>

    {/* <Modal>

    </Modal> */}
    <Footer />
  </div>
);

export default App;
