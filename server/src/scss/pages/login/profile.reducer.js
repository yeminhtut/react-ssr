import { userConstants, profileConstants } from '../constants';

export function profile(state = {}, action) {
  switch (action.type) {
    case profileConstants.GETPROFILE_REQUEST:
      return {
        loading: true
      };
    case profileConstants.GETPROFILE_SUCCESS:
      return {
        profile: action.profile
      };
    case profileConstants.GETPROFILE_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GETBANKACCOUNT_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETBANKACCOUNT_SUCCESS:
      return {
        bankAccounts: action.bankAccounts
      };
    case userConstants.GETBANKACCOUNT_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GETPAYPALACCOUNT_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETPAYPALACCOUNT_SUCCESS:
      return {
        paypalAccounts: action.paypalAccounts
      };
    case userConstants.GETPAYPALACCOUNT_FAILURE:
      return {
        error: action.error
      };
    case userConstants.UPDATEUSERPROFILE_SUCCESS:
      return {
        profile: action.user
      };
    case userConstants.UPDATEUSERPROFILE_FAILURE:
      return {
        error: action.error
      };
    case userConstants.UPDATEUSEREXPERTISE_SUCCESS:
      return {
        profile: action.user
      };
    case userConstants.UPDATEUSEREXPERTISE_FAILURE:
      return {
        error: action.error
      };

    default:
      return state;
  }
}
