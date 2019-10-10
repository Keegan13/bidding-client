import * as ApiTypes from './constants';

const initialState = {
    pending: false,
    bidData: null,
    error: null
}

function assignmentReducer(state = initialState, action) {
    switch (action.type) {
        case ApiTypes.SPLIT_BID_PENDING:
            return {
                ...state,
                pending: true
            }
        case ApiTypes.SPLIT_BID_SUCCESS:
            return {
                ...state,
                pending: false,
                bidData: action.payload
            }
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
            let newState={
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
