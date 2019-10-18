import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Notification from 'components/Notification';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const OrderByLevel = (notifications) => notifications.sort((left, right) => (left.level > right.level ? 1 : 0));

const NotificationQueue = ({
  notifications = [], onNotificationClick, onNotificationClose, onNotificationTimeout, ...other
}) => {
  const classes = useStyles();

  const handleClick = (event, id) => {
    if (onNotificationClick) {
      onNotificationClick(id);
    }
  };

  const handleClose = (event, id) => {
    if (onNotificationClose) {
      onNotificationClose(id);
    }
  };

  const handleTimeout = (id) => {
    if (onNotificationTimeout) {
      onNotificationTimeout(id);
    }
  };

  return (
    <div style={{ position: 'fixed', zIndex: 30000 }} {...other}>
      {
        OrderByLevel(notifications).map((item) => (
          <Notification
            key={item.id}
            notification={item}
            variant={item.type}
            className={classes.margin}
            onClose={handleClose}
            onClick={handleClick}
            onTimeout={handleTimeout}
          />
        ))
      }
    </div>
  );
};


NotificationQueue.propTypes = {
  className: PropTypes.string,
  onNotificationClose: PropTypes.func,
  onNotificationClick: PropTypes.func,
  onNotificationTimeout: PropTypes.func,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default NotificationQueue;
