import { createSelector } from 'reselect';
import { convertToErrorAction } from 'api/helpers';

const selectBidding = (state) => state.bidding;

const makeSelectAssignments = () => createSelector(
    selectBidding,
    (biddingSection) => biddingSection.assignments
);

const makeSelectBet = () => createSelector(selectBidding, (biddingSection) => biddingSection.bet);


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



export {
    selectBidding,
    makeSelectError,
    makeSelectAssignments,
    makeSelectBet,
    makeSelectSelectedAssignment
};
