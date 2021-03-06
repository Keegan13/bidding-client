import { createSelector } from 'reselect';
import { convertToErrorAction } from 'api/helpers';
import { ASSIGNMENT_STATUSES } from 'models';

const selectBidding = (state) => state.bidding;

const makeSelectAssignments = () => createSelector(
  selectBidding,
  (biddingSection) => biddingSection.assignments
);

const makeSelectBet = () => createSelector(selectBidding, (biddingSection) => biddingSection.bet);


const makeSelectAssignment = (id) => createSelector(
  selectBidding,
  (biddingSection) => {
    const { assignments } = biddingSection;
    if (!assignments || !assignments.length > 0 || !id) {
      return null;
    }

    const item = assignments.find((x) => x.id === id);
    return item;
  }
);

const makeSelectSelectedAssignment = () => createSelector(
  selectBidding,
  (biddingSection) => {
    const { assignments } = biddingSection;
    const { selectedId } = biddingSection;

    if (!assignments || !assignments.length > 0 || !selectedId) {
      return null;
    }
    const item = assignments.find((x) => x.id === selectedId);
    return item;
  }
);

const getAssignmentStatus = (assignment) => {
  const isError = (ass) => (ass.status === ASSIGNMENT_STATUSES.ERROR);
  const isPlaced = (ass) => !!(ass.status === ASSIGNMENT_STATUSES.PLACED || ass.placedBets.reduce((agg, next) => agg += next.volume, 0) >= ass.amount);
  const isToBePlaced = (ass) => (!!(ass.status === ASSIGNMENT_STATUSES.TO_BE_PLACED || !ass.placedBets || ass.placedBets.length == 0));
  const isPending = (ass) => ass.status === ASSIGNMENT_STATUSES.PENDING;

  if (isError(assignment)) {
    return ASSIGNMENT_STATUSES.ERROR;
  }

  if (isPending(assignment)) {
    return ASSIGNMENT_STATUSES.PENDING;
  }
  if (isToBePlaced(assignment)) {
    return ASSIGNMENT_STATUSES.TO_BE_PLACED;
  }

  if (isPlaced(assignment)) {
    return ASSIGNMENT_STATUSES.PLACED;
  }

  return ASSIGNMENT_STATUSES.PENDING;
};


const makeSelectError = (actionType) => createSelector(
  selectBidding,
  (biddingSection) => {
    const errorField = convertToErrorAction(actionType);
    return biddingSection[errorField];
  }
);

const makeSelectFailedActions = () => createSelector(
  selectBidding,
  (biddingSection) => biddingSection.failedActions
);

const makeSelectBookmakers = () => createSelector(
  selectBidding,
  (biddingSection) => {
    
    return biddingSection.bookmakers;
  }
);

const makeSelectNotifications = () => createSelector(selectBidding,
  (biddingSection) => biddingSection.notifications);

export {
  selectBidding,
  makeSelectError,
  makeSelectAssignments,
  makeSelectBet,
  makeSelectSelectedAssignment,
  makeSelectAssignment,
  makeSelectNotifications,
  getAssignmentStatus,
  makeSelectFailedActions,
  makeSelectBookmakers
};
