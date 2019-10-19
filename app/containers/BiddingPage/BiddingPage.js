import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { PropTypes } from 'prop-types';
import BiddingDashboard from 'components/BiddingDashboard';
import BiddingSummary from 'components/BiddingSummary';
import IconButton from '@material-ui/core/IconButton';
import NotificationQueue from 'components/NotificationQueue';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationPropType, AssignmentPropType } from 'models';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import BiddingTable from 'components/BiddingTable';
import './style.scss';

const useStyles = makeStyles((theme) => ({
  biddingPage: {
    margin: '20px'
  },
  closeButton: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    zIndex: 10
  },
  paper: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`
  }
}));

const BiddingPage = ({
  notifications,
  assignments,
  selected,
  loadAssignments,
  removeAssignment,
  selectAssignment,
  deselectAssignment,
  removeNotification,
  connectToHub,
  cutters,
  failed
}) => {
  const classes = useStyles();

  const onClose = (id) => {
    removeNotification(id);
  };

  useEffect(() => {
    // loadAssignments();
    connectToHub();
  }, []);

  const handleClose = () => {
    deselectAssignment();
  };

  return (
    <div className={classes.biddingPage}>
      <NotificationQueue notifications={notifications} onNotificationClose={onClose} onNotificationTimeout={onClose} />
      <BiddingSummary assignments={assignments} />
      <BiddingDashboard {...{ assignments, selectAssignment, removeAssignment, cutters, failed }} />
      <Modal
        open={selected ? true : false}
        onClose={handleClose}
      >
        <div className={clsx(classes.modal, classes.paper)}>
          <IconButton className={classes.closeButton} aria-label="close" onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
          <BiddingTable onClose={handleClose} />
        </div>
      </Modal>
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
