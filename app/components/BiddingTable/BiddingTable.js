import { makeStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import BiddingCard from 'components/BiddingCard';
import LoadingIndicator from 'components/LoadingIndicator';
import RetryNotification from 'components/RetryNotification';
import { AssignmentPropType, FailedActionPropType } from 'models';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import BetForm from './BetForm';
import BetTable from './BetTable';
import StatusSwitch from './StatusSwitch';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  feedbackArea: {
    width: '100%',
    margin: '10px'
  }
});

const getAmountLeft = (assignment) => {
  const placed = assignment.placedBets.reduce((agg, next) => agg += next.volume, 0);
  return assignment.amount - placed;
};

const BiddingTable = ({
  assignment, setAssignmentStatus, addComment, failedActions, removeFailedAction, retryFailedAction
}) => {
  const [text, setText] = useState('');
  const classes = useStyles();

  const onAddComment = (id) => {
    addComment(id, text);
  };

  const onTextChange = (event) => {
    const { value } = event.target;
    setText(value);
  };


  if (!assignment) {
    return <LoadingIndicator />;
  }

  const failedForCurrent = failedActions.filter((x) => x.parameters.assignmentId === assignment.id);
  const withWarning = failedForCurrent.length > 0;

  return (
    <div className={classes.wrapper}>
      <div className={classes.column}>
        {failedForCurrent.map((item) => (<RetryNotification key={item.id} action={item} onClose={() => { removeFailedAction(item.id); }} onRetry={() => { retryFailedAction(item); }} />))}
        <BiddingCard assignment={assignment} withWarning={withWarning} />
        <StatusSwitch assignment={assignment} onStatusChange={({ assignmentId, status }) => setAssignmentStatus(assignmentId, status)} />
        <div>
          <p>Comments</p>
          {assignment.comments ? assignment.comments.map((item) => <p key={item.id}>{item.text}</p>
          ) : null}

          <TextareaAutosize rows={4} className={classes.feedbackArea} value={text} onChange={onTextChange}></TextareaAutosize>
        </div>
        <button type="button" onClick={() => onAddComment(assignment.id)}>Add</button>
        {/* <button className="btn btn-primary" onClick={() => reloadAssignment(assignment.id)}>Reload</button> */}
      </div>
      <div className={classes.column}>
        <div>
          <h4>Left: {getAmountLeft(assignment)}</h4>
          <div>
            <BetForm />
          </div>
        </div>
        <div>
          <BetTable bets={assignment.placedBets}></BetTable>
        </div>
      </div>
    </div>
  );
};

BiddingTable.propTypes = {
  assignment: AssignmentPropType.isRequired,
  setAssignmentStatus: PropTypes.func,
  addComment: PropTypes.func.isRequired,
  failedActions: PropTypes.arrayOf(FailedActionPropType),
  removeFailedAction: PropTypes.func,
  retryFailedAction: PropTypes.func
};

export default BiddingTable;
