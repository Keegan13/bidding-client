import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';
import LoadingIndicator from 'components/LoadingIndicator';
import { AssignmentPropType, ASSIGNMENT_STATUSES } from 'models';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown-now';
import { getAssignmentStatus } from 'selectors';
import LinearProgressBar from 'components/LinearProgressBar';



const useStyles = makeStyles({
  cardWrapper: {
    backgroundColor: 'white'
  },
  errorWrapper: {
    position: 'absolute',
    top: '8px',
    color: 'rgba(0, 0, 0, 0.54)',
    right: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    //background-color: rgba(167, 73, 73, 0.45);
    transform: `translateX(${50}%)`,
    //border-radius: 6px;
    //border: 2px solid #ad2b2b6b;
    transform: `translateX(${50}%)`
  },
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
    }
  },
  countdownText: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    padding: '10px',
    fontWeight: 600
  }
});


const getAssignmentProgress = (assignment) => {
  const { amount, placedBets } = assignment;
  const placedAmount = placedBets.reduce((agg, next) => agg += next.volume, 0);
  const progress = Math.round(placedAmount / amount * 100);

  return progress > 100 ? 100 : progress;
};

const isTimeOut = (ass) => {
  const endTicks = moment(ass.startDateTime).valueOf() + ass.timeSpan;
  const nowTicks = Date.now();
  return !!(nowTicks >= endTicks);
};

const BiddingCard = ({ assignment, withWarning, ...other }) => {
  const classes = useStyles();
  if (!assignment) {
    return <LoadingIndicator />;
  }


  const [state, setState] = useState({
    status: getAssignmentStatus(assignment),
    progress: getAssignmentProgress(assignment),
    timeout: isTimeOut(assignment)
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      status: getAssignmentStatus(assignment),
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
      return <span className={classes.countdownText}>Timeout!</span>;
    }
    // Render a countdown
    return <span className={classes.countdownText}>{hours * 3600 + minutes * 60 + seconds} s</span>;
  };

  return (
    <Card
      className={clsx(classes.biddingCard, state.status, state.timeout ? 'timeout' : null)}
      {...other}
    >
      <h4>{assignment.location}</h4>

      {withWarning ? (
        <div className={classes.errorWrapper}>
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
      <LinearProgressBar
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
