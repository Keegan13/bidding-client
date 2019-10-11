import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { injectSaga } from 'redux-saga';
import injectReducer from 'utils/injectReducer';
import { makeSelectMyValue } from './selectors';
import reducer from './reducer';
import BiddingPage from './BiddingPage';
import { MY_ACTION } from './constants';
import { saga } from './saga';
import { createStructuredSelector } from 'reselect';
import { callMyAction } from './action';
import {
    makeSelectLoading,
    makeSelectError
} from 'containers/App/selectors';
import { splitBidThunk } from './../../api/thunks';
import { makeSelectAssignments, makeSelectSelectedAssignment } from 'selectors/bidding';
import { loadAssignmentsThunk } from 'api/thunks';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    splitBidAction: splitBidThunk,
    loadAssignments: loadAssignmentsThunk
}, dispatch)


const mapStateToProps = createStructuredSelector({
    myValue: makeSelectMyValue(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    assignments: makeSelectAssignments(),
    assignment: makeSelectSelectedAssignment()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'bidding', reducer });

export default compose(withReducer, withConnect)(BiddingPage);
export { mapDispatchToProps };
