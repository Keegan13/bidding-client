import * as ApiTypes from './constants';

export function splitBidPending() {
    return {
        type: ApiTypes.SPLIT_BID_PENDING
    }
}

export function splitBidSuccess(response) {
    return {
        type: ApiTypes.SPLIT_BID_SUCCESS,
        payload: response
    }
}

export function splitBidError(error) {
    return {
        type: ApiTypes.SPLIT_BID_ERROR,
        error: error
    }
}

export function addCommentPending() {
    return {
        type: ApiTypes.ADD_COMMENT_PENDING
    }
}

export function addCommentSuccess(response) {
    return {
        type: ApiTypes.ADD_COMMENT_SUCCESS,
        payload: response
    }
}

export function addCommentError(error) {
    return {
        type: ApiTypes.ADD_COMMENT_ERROR,
        error: error
    }
}

export function loadAssignmentsPending() {
    return {
        type: ApiTypes.LOAD_ASSIGNMENT_PENDING
    }
}

export function loadAssignmentsSuccess(response) {
    return {
        type: ApiTypes.LOAD_ASSIGNMENT_SUCCESS,
        payload: response
    }
}

export function loadAssignmentsError(error) {
    return {
        type: ApiTypes.LOAD_ASSIGNMENT_ERROR,
        error: error
    }
}




