import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
    makeSelectLoading,
    makeSelectError
} from 'containers/App/selectors';
import { loadOrReloadAssignmentThunk, setAssignmentStatusThunk } from 'api/thunks';
import BiddingTable from './BiddingTable';
import { makeSelectSelectedAssignment } from 'selectors/bidding';
import { addCommentThunk } from 'api/thunks';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    reloadAssignment: loadOrReloadAssignmentThunk,
    setStatus: setAssignmentStatusThunk,
    addComment: addCommentThunk
}, dispatch)

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
    assignment: makeSelectSelectedAssignment()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BiddingTable);
export { mapDispatchToProps };
