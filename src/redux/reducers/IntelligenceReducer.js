import * as constants from '../../utils/Constants';

const initialState = {
  isFetchingUserDetail: false,
  status: false,
  name: '',
  location: '',
  age: '',
  message: '',
};

export default function fetchDataFromFirebase(state = initialState, action) {
  switch (action.type) {
    case constants.FETCHING_USER_DATA_FROM_FIREBASE:
      return {
        ...state,
        isFetchingUserDetail: true,
      };

    case constants.INITIALIZED_INTELLIGENCE:
      return {
        isFetchingUserDetail: false,
        status: false,
        name: '',
        location: '',
        age: '',
        message: '',
      };

    case constants.FETCHING_SUCCESS_FROM_FIREBASE:
      return {
        isFetchingUserDetail: false,
        status: action.payload.status,
        name: action.payload.name,
        location: action.payload.location,
        age: action.payload.age,
        message: '',
      };

    case constants.FETCHING_FAILURE_FROM_FIREBASE:
      return {
        isFetchingUserDetail: false,
        status: action.payload.status,
        name: '',
        location: '',
        age: '',
        message: action.payload.message,
      };

    case constants.FETCHING_FAILURE_FROM_FIREBASE_IN_CATCH:
      return {
        isFetchingUserDetail: false,
        status: false,
        name: '',
        location: '',
        age: '',
        message: action.payload,
      };
    default:
      return state;
  }
}
