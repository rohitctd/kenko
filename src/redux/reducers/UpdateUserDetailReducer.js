import * as constants from '../../utils/Constants';

const initialState = {
  isFetching: false,
  userDetailUpdated: false,
  error: false,

  isUpdatingProfile: false,
  userProfileUpdated: false,
  userProfileError: false,
  message: '',
};

export default function getUserDetail(state = initialState, action) {
  switch (action.type) {
    case constants.UPDATING_USER_DATA:
      return {
        ...state,
        isFetching: true,
      };

    case constants.USER_DATA_UPDATED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userDetailUpdated: true,
        error: false,
      };

    case constants.USER_DATA_UPDATED_FAILURE:
      return {
        ...state,
        isFetching: false,
        userDetailUpdated: false,
        error: true,
      };

    case constants.INITIALIZE_USER_NAME_AGE_LOCATION_REDUCERR:
      return {
        ...state,
        isFetching: false,
        userDetailUpdated: false,
        error: false,
      };

    case constants.UPDATING_USER_PROFILE:
      return {
        ...state,
        isUpdatingProfile: true,
      };

    case constants.UPDATING_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isUpdatingProfile: false,
        userProfileUpdated: true,
        userProfileError: false,
        message: '',
      };

    case constants.UPDATING_USER_PROFILE_FAILURE:
      return {
        ...state,
        isUpdatingProfile: false,
        userProfileUpdated: false,
        userProfileError: true,
        message: action.payload,
      };

    case constants.INITIALIZE_PROFILE_REDUCER:
      return {
        ...state,
        isUpdatingProfile: false,
        userProfileUpdated: false,
        userProfileError: false,
        message: '',
      };

    default:
      return state;
  }
}
