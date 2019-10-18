import React, { useEffect } from 'react';
import { ASSIGNMENT_STATUSES } from 'models';
import PropTypes from 'prop-types';
import { AssignmentPropType } from 'models';
import * as _ from 'lodash';
import Button from '@material-ui/core/Button';

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

  return true;
};

const canToError = (assignment) => {
  if (assignment.status === ASSIGNMENT_STATUSES.ERROR) { return false; }
  return true;
};

const canToBePlaced = (assignment) => {
  if (assignment.status === ASSIGNMENT_STATUSES.TO_BE_PLACED) { return false; }

  if (assignment.placedBets.some((x) => x.volume > 0)) { return false; }

  return true;
};

const StatusSwitch = (props) => {
  const { assignment, onStatusChange } = props;

  useEffect(() => {

  }, [assignment]);


  const setStatus = (status) => {
    if (!_.isNil(onStatusChange)) {
      onStatusChange({
        assignmentId: assignment.id,
        status
      });
    }
  };

  return (
    <div>
      <Button type="button" disabled={!canToBePlaced(assignment)} onClick={() => setStatus(ASSIGNMENT_STATUSES.TO_BE_PLACED)}>To be placed</Button>
      <Button type="button" disabled={!canToPending(assignment)} onClick={() => setStatus(ASSIGNMENT_STATUSES.PENDING)}>Pending</Button>
      <Button type="button" disabled={!canToPlaced(assignment)} onClick={() => setStatus(ASSIGNMENT_STATUSES.PLACED)}>Placed</Button>
      <Button type="button" disabled={!canToError(assignment)} onClick={() => setStatus(ASSIGNMENT_STATUSES.ERROR)}>Error</Button>
    </div>
  );
};


StatusSwitch.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
  assignment: AssignmentPropType.isRequired
};

export default StatusSwitch;
