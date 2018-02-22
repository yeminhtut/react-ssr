import { FETCH_PORTFOLIO_ITEMS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PORTFOLIO_ITEMS:
      return action.payload;
    default:
      return state;
  }
};
