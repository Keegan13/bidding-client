import React from 'react';
import { Helmet } from 'react-helmet';
import BiddingPage from 'containers/BiddingPage';
import Header from 'components/Header';
import Footer from 'components/Footer';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="React.js Boilerplate"
    >
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>
    <Header />
    <BiddingPage />
    <Footer />
  </div>
);

export default App;
