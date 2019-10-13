import React from 'react';
import { PropTypes } from 'prop-types';
import BiddingDashboard from '../../components/BiddingDashboard';
import  BiddingSummary  from 'components/BiddingSummary';
import './style.scss';

export default class BiddingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loadAssignments } = this.props;
    loadAssignments();
  }
  shouldComponentUpdate(){

    return true;
  }

  render() {
    const { assignment, assignments } = this.props;
    const { onCallMyAction, myValue } = this.props;

    return (
      <div className="bidding-page">
        <BiddingSummary assignments={assignments} />
        <BiddingDashboard />
      </div>
    );
  }
}

BiddingPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  on: PropTypes.func
};


