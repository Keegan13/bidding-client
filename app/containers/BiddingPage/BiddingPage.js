/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import './style.scss';
import { PropTypes } from 'prop-types';
import BiddingCard from '../../components/BiddingCard';

export default class BiddingPage extends React.Component {
  constructor(props) {
    super(props);

    this.callThunk=()=>{
      const { splitBidAction } = this.props;

      splitBidAction({
        id: 12,
        amount: 10000,
        race: "fasdfsadf"
      });
    }
  }
  componentDidMount() {
   
  }
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component

  render() {
    const { onCallMyAction, myValue } = this.props;
    const item = {
      id: 12,
      stake: 10000,
      name: "Mumbai Race"
    };
    return (
      <div className="bidding-page">
        <BiddingCard item={{ item: item }} ></BiddingCard>
        <h2>{myValue}</h2>
        <button onClick={() => onCallMyAction()}></button>
        <button onClick={this.callThunk}>Call thunk</button>
      </div>
    );
  }
}


BiddingPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  myValue: PropTypes.number,
  on: PropTypes.func
};


