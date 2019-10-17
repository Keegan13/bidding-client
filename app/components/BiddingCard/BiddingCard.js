import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import './style.scss';
import { lighten, makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';
import Countdown from 'react-countdown-now';
import LinearProgress from '@material-ui/core/LinearProgress';
import LoadingIndicator from 'components/LoadingIndicator';
import { ASSIGNMENT_STATUSES } from 'models';
import { AssignmentPropType } from '../../models';

const STATUSES = {
  pending: "pending",
  placed: "placed",
  toBePlaced: "to-be-placed",
  error: "error"
};

const BorderLinearProgress = withStyles({
  root: {
    height: 17,
    backgroundColor: lighten('#ffffff', 0.5),
  },
  bar: {
    backgroundColor: '#717571'
  },
})(LinearProgress);


const getAssignmentProgress = (assignment) => {
  const { amount, placedBets } = assignment;
  const placedAmount = placedBets.reduce((agg, next) => agg += next.volume, 0);
  let progress = Math.round(placedAmount / amount * 100);

  return progress > 100 ? 100 : progress;
};

const isTimeOut = (ass) => {
  let endTicks = moment(ass.startDateTime).valueOf() + ass.timeSpan;
  let nowTicks = Date.now();
  return nowTicks >= endTicks ? true : false;
};


const getStatusClass = (assignment) => {
  const isError = (ass) => ass.status === ASSIGNMENT_STATUSES.ERROR ? true : false;
  const isPlaced = (ass) => ass.status === ASSIGNMENT_STATUSES.PLACED || ass.placedBets.reduce((agg, next) => agg += next.volume, 0) >= ass.amount ? true : false;
  const isToBePlaced = (ass) => ass.status === ASSIGNMENT_STATUSES.TO_BE_PLACED || !ass.placedBets || ass.placedBets.length == 0 ? true : false;
  const isPending = (ass) => ass.status === ASSIGNMENT_STATUSES.PENDING ? true : false;


  if (isError(assignment)) {
    return STATUSES.error;
  }

  if (isPending(assignment)) {
    return STATUSES.pending;
  }
  if (isToBePlaced(assignment)) {
    return STATUSES.toBePlaced;
  }

  if (isPlaced(assignment)) {
    return STATUSES.placed;
  }

  return STATUSES.pending;
};

const BiddingCard = ({ assignment, ...other }) => {

  if (!assignment) {
    return <LoadingIndicator />;
  }

  const [status, setStatus] = useState(getStatusClass(assignment));
  const [progress, setProgress] = useState(getAssignmentProgress(assignment));
  const [timeout, setTimeout] = useState(isTimeOut(assignment));

  useEffect(() => {
    setStatus(getStatusClass(assignment));
    setProgress(getAssignmentProgress(assignment));
  }, [assignment]);

  const onCountdownCompleteHandler = (value) => {
    if (value.completed) {
      setTimeout(true);
    }
  };

  const countDownRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span className="countdown-text">Timeout!</span>;//<span>DONE</span>
      // switch (status) {
      //   case STATUSES.pending: return <span className={"bidding-status " + status}></span>
      //   case STATUSES.placed: return <span className={"bidding-status " + status}></span>
      //   case STATUSES.toBePlaced: return <span className={"bidding-status " + status}>Time </span>
      //   case STATUSES.timeout: return <span className={"bidding-status " + status}>Timeout</span>
      //   default: return "";
      // }
    } else {
      // Render a countdown
      return <span className="countdown-text">{hours * 3600 + minutes * 60 + seconds} s</span>;
    }
  };

  return (<Card
    className={`bidding-card ${status} ${timeout ? 'timeout' : null}`} {...other}>

    <h4>{assignment.location}</h4>
    <Countdown
      date={moment(assignment.startDateTime).valueOf() + assignment.timeSpan}
      renderer={countDownRenderer}
      // controlled={true}
      onComplete={onCountdownCompleteHandler}
    />
    <p>
      Init {moment(assignment.startDateTime).format("YYYY-MM-DD hh:mm:ss")}
      Deadline {moment(assignment.startDateTime).add(assignment.timeSpan, 'milliseconds').format("hh:mm:ss")}
      <br />

      Amount: {assignment.amount}

    </p>
    <p>
      Received: {moment(assignment.receivedDate).format("MM-DD hh:mm:ss")}
    </p>
    <BorderLinearProgress
      variant="determinate"
      color="secondary"
      value={progress}
    />
  </Card>)
};

BiddingCard.propTypes = {
  assignment: AssignmentPropType.isRequired
};

export default BiddingCard;
