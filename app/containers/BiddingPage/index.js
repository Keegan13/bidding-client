import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import BiddingPage from './BiddingPage';
import { createStructuredSelector } from 'reselect';
import { removeNotification } from './../../actions/bidding';
import { makeSelectAssignments, makeSelectSelectedAssignment, makeSelectNotifications } from 'selectors/bidding';
import { loadAssignmentsThunk } from 'api/thunks';
import { connectToHubThunk } from 'live/thunks';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadAssignments: loadAssignmentsThunk,
    connectToHub: connectToHubThunk,
    removeNotification: removeNotification
}, dispatch)

const mapStateToProps = createStructuredSelector({
    // loading: makeSelectLoading(),
    // error: makeSelectError(),
    assignments: makeSelectAssignments(),
    assignment: makeSelectSelectedAssignment(),
    notifications: makeSelectNotifications()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
//const withReducer = injectReducer({ key: 'bidding', reducer });

export default compose(withConnect)(BiddingPage);
export { mapDispatchToProps };
