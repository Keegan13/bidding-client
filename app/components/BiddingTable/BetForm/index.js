import BetForm from './BetForm';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { placeBetThunk } from 'api/thunks';
import { makeSelectError as makeSelectForApiError } from 'selectors/bidding';
import { makeSelectLoading } from 'containers/App/selectors';
import { makeSelectSelectedAssignment } from 'selectors/bidding';
import { API_ACTION_TYPES } from 'api/constants';
import './styles.scss';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    placeBet: placeBetThunk,
}, dispatch)


const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectForApiError(API_ACTION_TYPES.SPLIT_BID_ERROR),
    assignment: makeSelectSelectedAssignment()
});

export default compose(connect((mapStateToProps), mapDispatchToProps))(BetForm);
