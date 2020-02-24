import * as constants from '../../utils/Constants';
import {Alert} from 'react-native';

const initialState = {
  isFetching: false,
  loginDetail: '',
  didLogout: false,
  error: false,
  errorMessage: '',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOG_OUT_FROM_APP:
      return {
        isFetching: false,
        loginDetail: '',
        error: false,
        didLogout: true,
        errorMessage: '',
      };

    case constants.LOADING_USER_AUTH:
      return {
        ...state,
        isFetching: true,
        didLogout: false,
        errorMessage: '',
      };

    case constants.USER_AUTH_SUCCESS:
      return {
        isFetching: false,
        loginDetail: action.payload,
        error: false,
        didLogout: false,
        errorMessage: '',
      };

    case constants.USER_AUTH_FAILURE:
      return {
        isFetching: false,
        loginDetail: '',
        error: true,
        didLogout: false,
        errorMessage: action.payload,
      };

    case constants.INITIALIZED_AUTH:
      return {
        isFetching: false,
        loginDetail: '',
        didLogout: false,
        error: false,
        errorMessage: '',
      };

    default:
      return state;
  }
}
