import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import './style.scss';
import clsx from 'clsx';
import {
  lighten,
  withStyles
} from '@material-ui/core/styles';
import moment from 'moment';
import Countdown from 'react-countdown-now';
import LinearProgress from '@material-ui/core/LinearProgress';
import LoadingIndicator from 'components/LoadingIndicator';
import { ASSIGNMENT_STATUSES, AssignmentPropType } from 'models';
import { IconButton } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';


const STATUSES = {
  pending: 'pending',
  placed: 'placed',
  toBePlaced: 'to-be-placed',
  error: 'error'
};

const useStyles = makeStyles({
  biddingCard: {
    display: 'inline-block',
    margin: '20px',
    padding: '5px',
    width: '350px',
    height: '210px',
    position: 'relative',
    '&: hover': {
      cursor: 'pointer',
      boxShadow: 'gray 0px 0px 5px 5px'
    },
    '&.selected': {
      borderColor: 'red'
    },
    '&.pending': {
      backgroundColor: '#ff9900'
    },
    '&.placed': {
      backgroundColor: '#009e0f'
    },
    '&.to-be-placed': {
      backgroundColor: '#ffe599'
    },
    '&.error': {
      backgroundColor: '#ea9999'
    },
    '.countdownText': {
      position: 'absolute',
      top: '0px',
      right: '0px',
      padding: '10px',
      fontWeight: 600
    }
  }
});

const BorderLinearProgress = withStyles({
  root: {
    height: 17,
    backgroundColor: lighten('#ffffff', 0.5),
  },
  bar: {
    backgroundColor: '#cccccc'
  },
})(LinearProgress);


const getAssignmentProgress = (assignment) => {
  const { amount, placedBets } = assignment;
  const placedAmount = placedBets.reduce((agg, next) => agg += next.volume, 0);
  const progress = Math.round(placedAmount / amount * 100);

  return progress > 100 ? 100 : progress;
};

const isTimeOut = (ass) => {
  const endTicks = moment(ass.startDateTime).valueOf() + ass.timeSpan;
  const nowTicks = Date.now();
  return nowTicks >= endTicks;
};


const getStatusClass = (assignment) => {
  const isError = (ass) => (ass.status === ASSIGNMENT_STATUSES.ERROR);
  const isPlaced = (ass) => !!(ass.status === ASSIGNMENT_STATUSES.PLACED || ass.placedBets.reduce((agg, next) => agg += next.volume, 0) >= ass.amount);
  const isToBePlaced = (ass) => (!!(ass.status === ASSIGNMENT_STATUSES.TO_BE_PLACED || !ass.placedBets || ass.placedBets.length == 0));
  const isPending = (ass) => ass.status === ASSIGNMENT_STATUSES.PENDING;


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

const BiddingCard = ({ assignment, withWarning, ...other }) => {
  const classes = useStyles();
  if (!assignment) {
    return <LoadingIndicator />;
  }


  const [state, setState] = useState({
    status: getStatusClass(assignment),
    progress: getAssignmentProgress(assignment),
    timeout: isTimeOut(assignment)
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      status: getStatusClass(assignment),
      progress: getAssignmentProgress(assignment)
    }));
  }, [assignment, withWarning]);

  const onCountdownCompleteHandler = (value) => {
    if (value.completed) {
      setState((state) => ({
        ...state,
        timeout: true
      }));
    }
  };

  const countDownRenderer = ({
    hours, minutes, seconds, completed
  }) => {
    if (completed) {
      // Render a completed state
      return <span className="countdown-text">Timeout!</span>;// <span>DONE</span>
      // switch (status) {
      //   case STATUSES.pending: return <span className={"bidding-status " + status}></span>
      //   case STATUSES.placed: return <span className={"bidding-status " + status}></span>
      //   case STATUSES.toBePlaced: return <span className={"bidding-status " + status}>Time </span>
      //   case STATUSES.timeout: return <span className={"bidding-status " + status}>Timeout</span>
      //   default: return "";
      // }
    }
    // Render a countdown
    return <span className="countdown-text">{hours * 3600 + minutes * 60 + seconds} s</span>;
  };

  console.log('Rerender' + assignment.id);
  return (
    <Card
      className={clsx(classes.biddingCard, state.status, state.timeout ? 'timeout' : null)}
      {...other}
    >
      <h4>{assignment.location}</h4>

      {withWarning ? (
        <div className={'errorWrapper'}>
          <WarningIcon fontSize="large" />
        </div>
      ) : null
      }
      <Countdown
        date={moment(assignment.startDateTime).valueOf() + assignment.timeSpan}
        renderer={countDownRenderer}
        // controlled={true}
        onComplete={onCountdownCompleteHandler}
      />
      <p>
        Init {moment(assignment.startDateTime).format('YYYY-MM-DD hh:mm:ss')}
        Deadline {moment(assignment.startDateTime).add(assignment.timeSpan, 'milliseconds').format('hh:mm:ss')}
        <br />

        Amount: {assignment.amount}

      </p>
      <p>
        Received: {moment(assignment.receivedDate).format('MM-DD hh:mm:ss')}
      </p>
      <BorderLinearProgress
        variant="determinate"
        color="secondary"
        value={state.progress}
      />
    </Card>
  );
};

BiddingCard.propTypes = {
  assignment: AssignmentPropType.isRequired
};

// function propsAreEqual(prev, next) {
//   if (prev === next) return true;
//   if (prev.assignment === next.assignment && prev.withWarning === next.withWarning) {
//     return true;
//   }
//   return false;
// }

export default BiddingCard;
