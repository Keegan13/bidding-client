import { createSelector } from 'reselect';

const selectBidding = (state) => state.bidding;

const makeSelectMyValue = () => createSelector(
  selectBidding,
  (state) => state.myValue
);


const getAmountLeft = (assignment) => {
  let placed = assignment.placedBets.reduce((agg, next) => agg += next.volume, 0);

  return assignment.amount - placed;
};

export {
  selectBidding,
  makeSelectMyValue,
};
