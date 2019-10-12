import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import './style.scss';
import moment from 'moment';
import Countdown from 'react-countdown-now';
import LinearProgress from '@material-ui/core/LinearProgress';
import LoadingIndicator from 'components/LoadingIndicator';

const STATUSES = {
  pending: "pending",
  placed: "placed",
  timeout: "timeout",
  toBePlaced: "to-be-placed"
};

const getStatusClass = (assignment) => {
  const isTimeOut = (ass) => {
    let endTicks = moment(ass.startDateTime).valueOf() + ass.timeSpan;
    let nowTicks = Date.now();

    return nowTicks >= endTicks ? true : false;
  };

  const isPlaced = (ass) => ass.placedBets.reduce((agg, next) => agg += next.volume, 0) >= ass.amount ? true : false;
  const isNew = (ass) => !ass.placedBets || ass.placedBets.length == 0 ? true : false;


  if (isTimeOut(assignment)) {
    return STATUSES.timeout;
  }

  if (isNew(assignment)) {
    return STATUSES.toBePlaced;
  }

  if (isPlaced(assignment)) {
    return STATUSES.placed;
  }

  return STATUSES.pending;
};

const BiddingCard = (props) => {
  const { item } = props;

  if (!item) {
    return <LoadingIndicator />;
  }

  const [status, setStatus] = useState(getStatusClass(item));

  useEffect(() => {
    setStatus(getStatusClass(item));
  }, [item]);

  const onCountdownCompleteHandler = (value) => {
    if (value.completed) {
      setStatus(STATUSES.timeout);
    }
  };

  const countDownRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>DONE</span>
      // switch (status) {
      //   case STATUSES.pending: return <span className={"bidding-status " + status}></span>
      //   case STATUSES.placed: return <span className={"bidding-status " + status}></span>
      //   case STATUSES.toBePlaced: return <span className={"bidding-status " + status}>Time </span>
      //   case STATUSES.timeout: return <span className={"bidding-status " + status}>Timeout</span>
      //   default: return "";
      // }
    } else {
      // Render a countdown
      return <span>{hours * 3600 + minutes * 60 + seconds} s</span>;
    }
  };

  return (<Card className={`bidding-card ${status}`} {...props}>
    <p>{item.location}</p>
    <p></p>
    <Countdown
      date={moment(item.startDateTime).valueOf() + item.timeSpan}
      renderer={countDownRenderer}
      // controlled={true}
      onComplete={onCountdownCompleteHandler}
    />
    <p>
      Init {moment(item.startDateTime).format("YYYY-MM-DD hh:mm:ss")}
      Deadline {moment(item.startDateTime).add(item.timeSpan, 'milliseconds').format("hh:mm:ss")}</p>
    <p>{item.amount} $</p>
    <LinearProgress
      value={50}
    />
  </Card>)
};

BiddingCard.propTypes = {
  item: PropTypes.object
};

export default BiddingCard;
