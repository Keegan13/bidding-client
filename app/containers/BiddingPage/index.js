import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import BiddingPage from './BiddingPage';
import { createStructuredSelector } from 'reselect';
import {
    makeSelectLoading,
    makeSelectError
} from 'containers/App/selectors';
import { splitBidThunk } from 'api/thunks';
import { makeSelectAssignments, makeSelectSelectedAssignment } from 'selectors/bidding';
import { loadAssignmentsThunk } from 'api/thunks';
import { connectToHubThunk } from 'live/thunks';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    splitBidAction: splitBidThunk,
    loadAssignments: loadAssignmentsThunk,
    connectToHub: connectToHubThunk
}, dispatch)

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
    assignments: makeSelectAssignments(),
    assignment: makeSelectSelectedAssignment()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
//const withReducer = injectReducer({ key: 'bidding', reducer });

export default compose(withConnect)(BiddingPage);
export { mapDispatchToProps };
