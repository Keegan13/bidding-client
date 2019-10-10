import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
    makeSelectLoading,
    makeSelectError,
    makeSelectAssignments
} from './../../containers/App/selectors';
import { splitBidThunk, loadAssignmentsThunk } from './../../api/thunks';
import BiddingTable from './BiddingTable';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    splitBidAction: splitBidThunk,
    loadAssignments: loadAssignmentsThunk
}, dispatch)



const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
    assignments: makeSelectAssignments()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BiddingTable);
export { mapDispatchToProps };
