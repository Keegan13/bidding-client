import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { placeBetThunk } from 'api/thunks';
import { makeSelectError as makeSelectForApiError, makeSelectSelectedAssignment, makeSelectBet } from 'selectors/bidding';

import { API_ACTION_TYPES } from 'api/constants';
import BetForm from './BetForm';


const mapDispatchToProps = (dispatch) => bindActionCreators({
  placeBet: placeBetThunk,
}, dispatch);


const mapStateToProps = createStructuredSelector({
  error: makeSelectForApiError(API_ACTION_TYPES.SPLIT_BID_ERROR),
  assignment: makeSelectSelectedAssignment(),
  bet: makeSelectBet()
});

export default compose(connect((mapStateToProps), mapDispatchToProps))(BetForm);
