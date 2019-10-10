import * as ApiTypes from './actions';
import api from '.';

export function splitBidThunk({ id, amount, race }) {
    return (dispatch) => {
        dispatch(ApiTypes.splitBidPending());
        api.addBid(id, amount, race)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(ApiTypes.splitBidSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(ApiTypes.splitBidError(error));
            })
    };
}

export function loadAssignmentsThunk() {
    return (dispatch) => {
        dispatch(ApiTypes.loadAssignmentsPending());
        api.loadAssignments()
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(ApiTypes.loadAssignmentsSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(ApiTypes.loadAssignmentsError(error));
            })
    };
}





