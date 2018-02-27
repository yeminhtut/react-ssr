import { FETCH_CURRENT_USER } from '../actions';

export default function authentication(state = {}, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return {
        user: action.payload.data || false
      };
    default:
      return state;
  }
}
