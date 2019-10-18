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
  setStatus: setAssignmentStatusThunk,
  addComment: addCommentThunk,
  retry: retryRequestThunk,
  removeRetry: removeFailedAction
}, dispatch);

const mapStateToProps = createStructuredSelector({
  assignment: makeSelectSelectedAssignment(),
  failed: makeSelectFailedActions()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BiddingTable);
export { mapDispatchToProps };
