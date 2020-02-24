import * as constants from '../../utils/Constants';

const initialState = {
  isSigningIn: false,
  loginSuccess: false,
  loginFailure: false,
  message: '',

  reIsSigningIn: false,
  reLoginSuccess: false,
  reLoginFailure: false,
  reMessage: '',
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SIGNING_IN:
      return {
        ...state,
        isSigningIn: true,
      };

    case constants.SIGN_IN_SUCCESS:
      return {
        ...state,
        isSigningIn: false,
        loginSuccess: true,
        loginFailure: false,
        message: action.payload,
      };

    case constants.SIGN_IN_FAILURE:
      return {
        ...state,
        isSigningIn: false,
        loginSuccess: false,
        loginFailure: true,
        message: action.payload,
      };

    case constants.RE_INITIALIZING_LOGIN_REDUCER:
      return {
        ...state,
        isSigningIn: false,
        loginSuccess: false,
        loginFailure: false,
        message: '',
      };

    case constants.RESEND_SIGNING_IN:
      return {
        ...state,
        reIsSigningIn: true,
      };

    case constants.RESEND_SIGN_IN_SUCCESS:
      return {
        ...state,
        reIsSigningIn: false,
        reLoginSuccess: true,
        reLoginFailure: false,
        reMessage: action.payload,
      };

    case constants.RESEND_SIGN_IN_FAILURE:
      return {
        ...state,
        reIsSigningIn: false,
        reLoginSuccess: false,
        reLoginFailure: true,
        reMessage: action.payload,
      };

    default:
      return state;
  }
}
