import React from 'react';
import { PropTypes } from 'prop-types';
import BiddingDashboard from 'components/BiddingDashboard';
import BiddingSummary from 'components/BiddingSummary';
import NotificationQueue from 'components/NotificationQueue';
import './style.scss';

export default class BiddingPage extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = (id) => {
      const { removeNotification } = this.props;
      removeNotification(id);
    };
  }

  componentDidMount() {
    const { loadAssignments, connectToHub } = this.props;
    //loadAssignments();
    connectToHub();
  }


  render() {
    const { assignments, notifications } = this.props;
    return (
      <div className="bidding-page">
        <NotificationQueue notifications={notifications} onNotificationClose={this.onClose} onNotificationTimeout={this.onClose} />
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


