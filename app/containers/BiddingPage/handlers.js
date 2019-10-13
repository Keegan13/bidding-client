import { SELECT_ASSIGNMENT } from './constants';

const  biddingPageHandlers = {
  [SELECT_ASSIGNMENT]: (state, action) => {
    return {
      ...state,
      selectedId: action.id
    }
  }
}

export default biddingPageHandlers;