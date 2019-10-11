import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import './style.scss';
import moment from 'moment';
import Countdown from 'react-countdown-now';
import { unregisterDecorator } from 'handlebars';
import LinearProgress from '@material-ui/core/LinearProgress';

const getStatus = (assignment) => {
  switch (assignment.timeSpan % 3) {
    case 1: return 'placed';
    case 2: return 'pending';
    default: return 'timeout';
  };
};

const BiddingCard = (props) => {
  const { item } = props;
  if (item == null || item == undefined || item.id < 0) {
    return "";
  }
  const countDownRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Done!!!!!</span>;
    } else {
      // Render a countdown
      return <span>{hours * 3600 + minutes * 60 + seconds} s</span>;
    }
  };

  return (<Card className={`bidding-card ${getStatus(item)}`} {...props}>

    <p>{item.location}</p>
    <p></p>
    <Countdown date={Date.now() + item.timeSpan} renderer={countDownRenderer} />

    <p>{moment(item.startDateTime).format("YYYY")}</p>
    <p>{item.amount} $</p>
    <LinearProgress
      value={50}
    />

  </Card>)
};

// BiddingCard.propTypes = {
//   item: PropTypes.any
// };

export default BiddingCard;
