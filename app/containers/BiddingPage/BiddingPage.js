/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import './style.scss';
import { PropTypes } from 'prop-types';
import BiddingCard from '../../components/BiddingCard';
import BiddingDashboard from '../../components/BiddingDashboard';
import { loadAssignmentsThunk } from '../../api/thunks';
import  BiddingSummary  from 'components/BiddingSummary';

export default class BiddingPage extends React.Component {
  constructor(props) {
    super(props);

    this.callThunk = () => {
      const { splitBidAction } = this.props;

      splitBidAction({
        id: 12,
        amount: 10000,
        race: "fasdfsadf"
      });
    }
  }
  componentDidMount() {
    const { loadAssignments } = this.props;
    loadAssignments();
  }
  shouldComponentUpdate(){

    return true;
  }
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component

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


