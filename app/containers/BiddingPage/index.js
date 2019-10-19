import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectAssignments,
  makeSelectSelectedAssignment,
  makeSelectNotifications,
  makeSelectFailedActions
} from 'selectors/bidding';
import { loadAssignmentsThunk } from 'api/thunks';
import { connectToHubThunk } from 'live/thunks';
import { removeNotification, selectAssignment, deselectAssignment, removeAssignment } from 'actions/bidding';
import BiddingPage from './BiddingPage';
import { makeSelectCutters } from '../../selectors/bidding';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadAssignments: loadAssignmentsThunk,
  connectToHub: connectToHubThunk,
  removeNotification,
  removeAssignment,
  selectAssignment,
  deselectAssignment
}, dispatch);

const mapStateToProps = createStructuredSelector({
  assignments: makeSelectAssignments(),
  assignment: makeSelectSelectedAssignment(),
  notifications: makeSelectNotifications(),
  selected: makeSelectSelectedAssignment(),
  failed: makeSelectFailedActions(),
  cutters: makeSelectCutters()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withReducer = injectReducer({ key: 'bidding', reducer });

export default compose(withConnect)(BiddingPage);
export { mapDispatchToProps };
