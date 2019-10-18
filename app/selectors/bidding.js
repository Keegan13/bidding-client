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
  if (assignment.status) {
    return assignment.status;
  }

  if (!assignment.placedBet || assignment.placedBet.length === 0) {
    return ASSIGNMENT_STATUSES.TO_BE_PLACED;
  }

  if (assignment.placedBet.reduce((agg, next) => agg += next.volume, 0) >= assignment.amount) {
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

const makeSelectCutters = () => createSelector(
  selectBidding,
  (biddingSection) => biddingSection.cutters
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
  makeSelectCutters,
  makeSelectNotifications,
  getAssignmentStatus,
  makeSelectFailedActions
};
