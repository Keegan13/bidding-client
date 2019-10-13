import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
    makeSelectLoading,
    makeSelectError
} from 'containers/App/selectors';
import { splitBidThunk, loadOrReloadAssignmentThunk } from './../../api/thunks';
import BiddingTable from './BiddingTable';
import { makeSelectSelectedAssignment } from 'selectors/bidding';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    splitBidAction: splitBidThunk,
    reloadAssignment: loadOrReloadAssignmentThunk
}, dispatch)



const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
    assignment: makeSelectSelectedAssignment()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BiddingTable);
export { mapDispatchToProps };
