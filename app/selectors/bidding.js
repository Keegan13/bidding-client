import { createSelector } from 'reselect';
import { convertToErrorAction } from 'api/helpers';

const selectBidding = (state) => state.bidding;

const makeSelectAssignments = () => createSelector(
    selectBidding,
    (biddingSection) => biddingSection.assignments
);

const makeSelectBet = () => createSelector(selectBidding, (biddingSection) => biddingSection.bet);


const makeSelectAssignment = (id) => createSelector(
    selectBidding,
    (biddingSection) => {
        let assignments = biddingSection.assignments;
        if (!assignments || !assignments.length > 0 || !id) {
            return null;
        }

        let item = assignments.find(x => x.id == id);
        return item;
    }
);

const makeSelectSelectedAssignment = () => createSelector(
    selectBidding,
    (biddingSection) => {
        let assignments = biddingSection.assignments;
        const { selectedId } = biddingSection;

        if (!assignments || !assignments.length > 0 || !selectedId) {
            return null;
        }
        let item = assignments.find(x => x.id == selectedId);
        return item;
    }
);

const makeSelectError = (actionType) => createSelector(
    selectBidding,
    (biddingSection) => {
        let errorField = convertToErrorAction(actionType);
        return biddingSection[errorField];
    }
);


const makeSelectCutters = () => createSelector(
    selectBidding,
    (biddingSection) => {
        return biddingSection.cutters;
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
    makeSelectCutters,
    makeSelectNotifications
}
