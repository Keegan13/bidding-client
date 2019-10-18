import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { FailedActionPropType } from 'models';
import CachedIcon from '@material-ui/icons/Cached';
import CloseIcon from '@material-ui/icons/Close';
import Notification from 'components/Notification';
import { NOTIFICATION_TYPES } from 'constant';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: 'red',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
}));


const RetryNotification = ({
  action, onRetry, onClose, ...other
}) => {
  const classes = useStyles();
  const { message } = action;

  const handleClose = () => {
    if (onClose) {
      onClose(action.id);
    }
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry(action);
    }
  };

  return (
    <SnackbarContent
      className={classes.error}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <ErrorIcon
            className={clsx(classes.icon, classes.iconVariant)}
          />
          {message}
        </span>
      )
      }
      action={
        [
          <IconButton key="retry" aria-label="retry" color="inherit" onClick={handleRetry}>
            <CachedIcon className={''} />
          </IconButton>,
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon className={''} />
          </IconButton>,
        ]}
      {...other}
    />
  );
};

RetryNotification.propTypes = {
  action: FailedActionPropType.isRequired,
  onRetry: PropTypes.func,
  onClose: PropTypes.func
};

export default RetryNotification;
