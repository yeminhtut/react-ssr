import { FETCH_CURRENT_USER } from '../actions';

export default function authentication(state = {}, action) {
  // console.log('here', action);
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return {
        user: action.payload.data || false
      };
    default:
      return state;
  }
}

// export default function authentication(state = {}, action) {
//   console.log(action.type);
//   switch (action.type) {
//     case userConstants.LOGIN_REQUEST:
//       return {
//         loading: true,
//         user: action.user,
//       };
//     //case FETCH_CURRENT_USER:
//
//     case userConstants.LOGIN_SUCCESS:
//       return {
//         user: action.user,
//       };
//     case userConstants.GETAUTHENTICATEDUSER_SUCCESS:
//       return {
//         user: action.user,
//       };
//     case userConstants.UPDATEUSER_SUCCESS:
//       return {
//         user: action.user,
//       };
//     case userConstants.LOGOUT:
//       return {};
//     case userConstants.UPDATEPROFILEIMAGE_REQUEST:
//       return {
//         loading: true,
//         user: action.user,
//       };
//     case userConstants.UPDATEPROFILEIMAGE_SUCCESS:
//       return {
//         loggedIn: true,
//         user: action.updatedUser,
//       };
//     case userConstants.UPDATEPROFILEIMAGE_FAILURE:
//       return {
//         error: action.error,
//       };
//     default:
//       return state;
//   }
// }
