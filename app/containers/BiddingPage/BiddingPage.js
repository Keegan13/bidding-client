/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import './style.scss';

export default class BiddingPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const {onCallMyAction} = this.props;
    debugger;
  }
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component

  render() {
    debugger;
    const { onCallMyAction, myValue } = this.props;
    return (
      <div className="bidding-page">
        <h2>{myValue}</h2>
        <button onClick={() => onCallMyAction()}></button>
      </div>
    );
  }
}


BiddingPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  myValue: PropTypes.string,
  on: PropTypes.func
};


