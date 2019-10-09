import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectSaga } from 'redux-saga';
import injectReducer from 'utils/injectReducer';
import { makeSelectMyValue } from './selectors';
import reducer from './reducer';
import BiddingPage from './BiddingPage';
import { MY_ACTION } from './constants';
import { saga } from './saga';
import {callMyAction} from './action';

const mapDispatchToProps = (dispatch) => ({
    onCallMyAction:  () => dispatch(changeUsername())
});


const mapStateToProps = createStructuredSelector({
    myValue: makeSelectMyValue(),
    loading: makeSelectLoading(),
    error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'bidding', reducer });
const withSaga = injectSaga({ key: 'bidding', saga });

export default compose(withReducer,withSaga, withConnect)(BiddingPage);
export { mapDispatchToProps };
