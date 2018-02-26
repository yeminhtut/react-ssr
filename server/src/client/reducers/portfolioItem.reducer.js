import { ADDITEM } from '../actions';

export default function portfolioItem(state = {}, action) {
  switch (action.type) {
    case ADDITEM:
      return {
        addedItem: action.payload
      };
    default:
      return state;
  }
}
