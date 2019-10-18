import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import * as _ from 'lodash';
import { AssignmentPropType, ASSIGNMENT_STATUSES } from 'models';
import PropTypes from 'prop-types';
import React from 'react';
import { getAssignmentStatus } from 'selectors';
import { classes } from 'istanbul-lib-coverage';

const useStyles = makeStyles({
  wrapper: {

  },
  [ASSIGNMENT_STATUSES.TO_BE_PLACED]: {
    color: '#50431b',
    backgroundColor: '#ffe599'
  },
  [ASSIGNMENT_STATUSES.PENDING]: {
    color: '#6d4d1e',
    backgroundColor: '#ff9900'
  },
  [ASSIGNMENT_STATUSES.PLACED]: {
    color: '#0a4410',
    backgroundColor: '#009e0f'
  },
  [ASSIGNMENT_STATUSES.ERROR]: {
    color: '#633a3a',
    backgroundColor: '#ea9999'
  }
});

const canToPlaced = (assignment) => {
  if (assignment.status === ASSIGNMENT_STATUSES.PLACED) {
    return false;
  }

  if (assignment.placedBets.reduce((agg, next) => agg += next.volume, 0) >= assignment.amount) {
    return true;
  }

  return false;
};

const canToPending = (assignment) => {
  if (assignment.status === ASSIGNMENT_STATUSES.PENDING) { return false; }
  if (assignment.placedBets.reduce((agg, next) => agg += next.volume, 0) >= assignment.amount) {
    return false;
  }
  return true;
};

const canToError = (assignment) => {
  if (assignment.status === ASSIGNMENT_STATUSES.ERROR) { return false; }
  return true;
};

// const canToBePlaced = (assignment) => {
//   if (assignment.status === ASSIGNMENT_STATUSES.TO_BE_PLACED) { return false; }

//   if (assignment.placedBets.some((x) => x.volume > 0)) { return false; }

//   return true;
// };

const StatusSwitch = ({ assignment, onStatusChange }) => {
  const classes = useStyles();
  const setStatus = (status) => {
    if (!_.isNil(onStatusChange)) {
      onStatusChange({
        assignmentId: assignment.id,
        status
      });
    }
  };

  const status = getAssignmentStatus(assignment);

  return (
    <div className={classes.wrapper}>
      <Button type="button" className={status === ASSIGNMENT_STATUSES.TO_BE_PLACED ? classes[status] : ''} disabled onClick={() => setStatus(ASSIGNMENT_STATUSES.TO_BE_PLACED)}>To be placed</Button>
      <Button type="button" className={status === ASSIGNMENT_STATUSES.PENDING ? classes[status] : ''} disabled={!canToPending(assignment)} onClick={() => setStatus(ASSIGNMENT_STATUSES.PENDING)}>Pending</Button>
      <Button type="button" className={status === ASSIGNMENT_STATUSES.PLACED ? classes[status] : ''} disabled={!canToPlaced(assignment)} onClick={() => setStatus(ASSIGNMENT_STATUSES.PLACED)}>Placed</Button>
      <Button type="button" className={status === ASSIGNMENT_STATUSES.ERROR ? classes[status] : ''} disabled={!canToError(assignment)} onClick={() => setStatus(ASSIGNMENT_STATUSES.ERROR)}>Error</Button>
    </div>
  );
};


StatusSwitch.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
  assignment: AssignmentPropType.isRequired
};

export default StatusSwitch;
