import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import * as moment from 'moment';
import { Countdown } from 'react-countdown-now';
import { unregisterDecorator } from 'handlebars';

const BiddingCard = (props) => {
  const { assignment } = props;
  // let getStatus = (a) => {
  //   if (moment(a.startDateTime).diff(Date.now)) {

  //   }

  // };

  // const [state, setState] = useState({
  //   countdown: 123,
  //   status: "asdfsd"

  // });


  if (assignment == null || assignment == undefined || assignment.id < 0) {
    return "";
  }

  return (
    <div className="bidding-container">
      <pre>
        {JSON.stringify(assignment,null,1)}
      </pre>|
    </div>
  )
};

// BiddingCard.propTypes = {
//   item: PropTypes.any
// };

export default BiddingCard;
