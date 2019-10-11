import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
    makeSelectLoading,
    makeSelectError
} from 'containers/App/selectors';
import { splitBidThunk, loadAssignmentsThunk } from 'api/thunks';
import { selectAssignment, deselectAssignment } from 'actions/bidding';
import BiddignDashboard from './BiddingDashboard';
import { makeSelectSelectedAssignment,makeSelectAssignments } from 'selectors/bidding';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    splitBidAction: splitBidThunk,
    selectAssignment: selectAssignment,
    deselectAssignment: deselectAssignment,
    loadAssignments: loadAssignmentsThunk
}, dispatch)



const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
    assignments: makeSelectAssignments(),
    assignment: makeSelectSelectedAssignment()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BiddignDashboard);
export { mapDispatchToProps };
