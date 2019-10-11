import * as ApiActions from './../api/actions';
import * as BiddingActions from './bidding';

const AllActions = {
    ...ApiActions,
    ...BiddingActions
}

export default AllActions;