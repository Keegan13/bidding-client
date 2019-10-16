import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
    makeSelectLoading,
    makeSelectError
} from 'containers/App/selectors';
import { splitBidThunk, loadAssignmentsThunk } from 'api/thunks';
import { selectAssignment, deselectAssignment, removeAssignment } from 'actions';
import BiddingDashboard from './BiddingDashboard';
import { makeSelectSelectedAssignment, makeSelectAssignments, makeSelectCutters } from 'selectors/bidding';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    splitBidAction: splitBidThunk,
    selectAssignment: selectAssignment,
    removeAssignment: removeAssignment,
    deselectAssignment: deselectAssignment,
    loadAssignments: loadAssignmentsThunk
}, dispatch)



const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
    assignments: makeSelectAssignments(),
    cutters: makeSelectCutters(),
    assignment: makeSelectSelectedAssignment()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BiddingDashboard);
export { mapDispatchToProps };
