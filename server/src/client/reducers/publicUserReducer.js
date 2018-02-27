import { FETCH_PUBLIC_USER } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PUBLIC_USER:
      return action.payload;
    default:
      return state;
  }
};
