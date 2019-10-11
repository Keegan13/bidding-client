import * as ApiTypes from './constants';
import * as BiddingTypes from 'actions/bidding.js';
import BiddingTable from '../components/BiddingTable/BiddingTable';

const initialState = {
    pending: false,
    error: null,
    selectedId: null
}

function assignmentReducer(state = initialState, action) {
    switch (action.type) {
        case BiddingTypes.SELECT_ASSIGNMENT:
            console.log(action.id);
            return {
                ...state,
                selectedId: action.id
            }

        case BiddingTable.DESELECT_ASSIGNMENT:
            return {
                ...state,
                selectedId: null
            }

        case ApiTypes.SPLIT_BID_PENDING:
            return {
                ...state,
                pending: true
            }
        case ApiTypes.SPLIT_BID_SUCCESS:
            let { assignments } = state;
            let index = assignments.findIndex(x => x.id == action.payload.assignmentId);

            if (index != -1) {
                let targetAssignment = assignments[index];
                let updated = Object.assign({}, targetAssignment, {
                    placedBets: [...targetAssignment.placedBets, action.payload]
                });
                let arr = [...assignments.slice(0, index > 0 ? index : 0), updated, ...assignments.slice(index + 1)];

                return {
                    ...state,
                    assignments: arr,
                    pending: false
                }
            }
            return state;
        case ApiTypes.SPLIT_BID_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case ApiTypes.ADD_COMMENT_PENDING:
            return {
                ...state,
                pending: true
            }

        case ApiTypes.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                pending: false,
                comment: action.payload
            }

        case ApiTypes.ADD_COMMENT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        case ApiTypes.LOAD_ASSIGNMENT_PENDING:
            return {
                ...state,
                pending: true
            }
        case ApiTypes.LOAD_ASSIGNMENT_SUCCESS:
            let newState = {
                ...state,
                pending: false,
                assignments: [...action.payload]
            };
            return newState;
        case ApiTypes.LOAD_ASSIGNMENT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default assignmentReducer;

// export const getProducts = state => state.products;
// export const getProductsPending = state => state.pending;
// export const getProductsError = state => state.error;
