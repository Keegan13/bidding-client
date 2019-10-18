import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { loadOrReloadAssignmentThunk, setAssignmentStatusThunk, addCommentThunk } from 'api/thunks';
import { makeSelectSelectedAssignment } from 'selectors/bidding';
import BiddingTable from './BiddingTable';


const mapDispatchToProps = (dispatch) => bindActionCreators({
  reloadAssignment: loadOrReloadAssignmentThunk,
  setStatus: setAssignmentStatusThunk,
  addComment: addCommentThunk
}, dispatch);

const mapStateToProps = createStructuredSelector({
  assignment: makeSelectSelectedAssignment()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BiddingTable);
export { mapDispatchToProps };
