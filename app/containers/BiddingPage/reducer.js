import { MY_ACTION } from './constants';

const initialState = {
  myValue: 1
};

function BiddingReducer(state = initialState, action) {
  switch (action.type) {
    case MY_ACTION:
      // Delete prefixed '@' from the github username
      return { ...state, myValue: state.myValue + 1 };
    default:
      return state;
  }
}

export default BiddingReducer;
