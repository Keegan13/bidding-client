import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAssignments, makeSelectSelectedAssignment, makeSelectNotifications } from 'selectors/bidding';
import { loadAssignmentsThunk } from 'api/thunks';
import { connectToHubThunk } from 'live/thunks';
import { removeNotification } from '../../actions/bidding';
import BiddingPage from './BiddingPage';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadAssignments: loadAssignmentsThunk,
  connectToHub: connectToHubThunk,
  removeNotification
}, dispatch);

const mapStateToProps = createStructuredSelector({
  assignments: makeSelectAssignments(),
  assignment: makeSelectSelectedAssignment(),
  notifications: makeSelectNotifications()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withReducer = injectReducer({ key: 'bidding', reducer });

export default compose(withConnect)(BiddingPage);
export { mapDispatchToProps };
