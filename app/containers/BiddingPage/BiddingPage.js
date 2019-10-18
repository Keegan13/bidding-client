import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import BiddingDashboard from 'components/BiddingDashboard';
import BiddingSummary from 'components/BiddingSummary';
import NotificationQueue from 'components/NotificationQueue';
import './style.scss';
import { makeStyles } from '@material-ui/styles';
import { NotificationPropType, AssignmentPropType } from 'models';

const useStyles = makeStyles((theme) => ({
  biddingPage: {
    margin: '20px'
  }
}));

const BiddingPage = ({
  notifications, assignments, loadAssignments, removeNotification, connectToHub
}) => {
  const classes = useStyles();
  const onClose = (id) => {
    removeNotification(id);
  };

  useEffect(() => {
    // loadAssignments();
    connectToHub();
  }, []);

  return (
    <div className={classes.biddingPage}>
      <NotificationQueue notifications={notifications} onNotificationClose={onClose} onNotificationTimeout={onClose} />
      <BiddingSummary assignments={assignments} />
      <BiddingDashboard />
    </div>
  );
};


BiddingPage.propTypes = {
  notifications: PropTypes.arrayOf(NotificationPropType).isRequired,
  assignments: PropTypes.arrayOf(AssignmentPropType).isRequired,
  removeNotification: PropTypes.func,
  connectToHub: PropTypes.func,
};

export default BiddingPage;
