import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  loadOrReloadAssignmentThunk, setAssignmentStatusThunk, addCommentThunk, retryRequestThunk
} from 'api/thunks';
import { makeSelectSelectedAssignment, makeSelectFailedActions } from 'selectors/bidding';
import { removeFailedAction } from 'actions';
import BiddingTable from './BiddingTable';


const mapDispatchToProps = (dispatch) => bindActionCreators({
  reloadAssignment: loadOrReloadAssignmentThunk,
  setAssignmentStatus: setAssignmentStatusThunk,
  addComment: addCommentThunk,
  retryFailedAction: retryRequestThunk,
  removeFailedAction: removeFailedAction
}, dispatch);

const mapStateToProps = createStructuredSelector({
  assignment: makeSelectSelectedAssignment(),
  failedActions: makeSelectFailedActions()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BiddingTable);
export { mapDispatchToProps };
