import { createSelector } from 'reselect';

const selectBidding = (state) => state.bidding;

const makeSelectMyValue = () => createSelector(
    selectBidding,
  (state) => state.myValue
);

export {
  selectBidding,
  makeSelectMyValue,
};
