import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { loadAssignmentsThunk } from 'api/thunks';
import { selectAssignment, deselectAssignment, removeAssignment } from 'actions';
import BiddingDashboard from './BiddingDashboard';
import { makeSelectSelectedAssignment, makeSelectAssignments, makeSelectCutters } from 'selectors/bidding';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    selectAssignment: selectAssignment,
    removeAssignment: removeAssignment,
    deselectAssignment: deselectAssignment,
    loadAssignments: loadAssignmentsThunk
}, dispatch)

const mapStateToProps = createStructuredSelector({
    assignments: makeSelectAssignments(),
    cutters: makeSelectCutters(),
    assignment: makeSelectSelectedAssignment()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BiddingDashboard);
export { mapDispatchToProps };
