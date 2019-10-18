import React, { useState } from 'react';
import BiddingCard from 'components/BiddingCard';
import LoadingIndicator from 'components/LoadingIndicator';
import BetForm from './BetForm';
import BetTable from './BetTable';
import StatusSwitch from './StatusSwitch';
import PropTypes from 'prop-types';
import { AssignmentPropType } from 'models';
import './style.scss';
import { makeStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  }

});

const getAmountLeft = (assignment) => {
  const placed = assignment.placedBets.reduce((agg, next) => agg += next.volume, 0);
  return assignment.amount - placed;
};
const BiddingTable = ({ assignment, onClose, setStatus, addComment }) => {

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

  return (
    <div className={classes.wrapper}>
      <div className={classes.column}>
        <BiddingCard assignment={assignment} />
        <StatusSwitch assignment={assignment} onStatusChange={({ assignmentId, status }) => setStatus(assignmentId, status)} />
        <div>
          <p>Comments</p>
          {assignment.comments ? assignment.comments.map((item) => <p key={item.id}>{item.text}</p>
          ) : null}

          
          <TextareaAutosize rows={4} className="feedback-area" value={text} onChange={onTextChange}></TextareaAutosize>
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
    </div >
  );

}

BiddingTable.propTypes = {
  assignment: AssignmentPropType.isRequired,
  setStatus: PropTypes.func,
  addComment: PropTypes.func.isRequired
};

export default BiddingTable;
