import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { loadAssignmentsThunk } from 'api/thunks';
import { selectAssignment, deselectAssignment, removeAssignment } from 'actions';
import {
  makeSelectAssignments,
  makeSelectFailedActions,
  makeSelectBookmakers
} from 'selectors/bidding';
import BiddingDashboard from './BiddingDashboard';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectAssignment,
  removeAssignment,
  deselectAssignment,
  loadAssignments: loadAssignmentsThunk
}, dispatch);

const mapStateToProps = createStructuredSelector({
  assignments: makeSelectAssignments(),
  bookmakers: makeSelectBookmakers(),
  failed: makeSelectFailedActions()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BiddingDashboard);
export { mapDispatchToProps };
