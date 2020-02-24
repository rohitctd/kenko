import * as constants from '../../utils/Constants';

const initialState = {
  isUpdating: false,
  emailUpdationSuccess: false,
  error: false,
  errorMessage: '',

  isUpdatingGender: false,
  genderUpdationSuccess: false,
  error: false,
  errorMessageGender: '',
};

export default updateEmail = (state = initialState, action) => {
  switch (action.type) {
    case constants.UPDATING_EMAIL:
      return {
        ...state,
        isUpdating: true,
      };

    case constants.UPDATING_EMAIL_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        emailUpdationSuccess: true,
        error: false,
        errorMessage: '',
      };

    case constants.UPDATING_EMAIL_FAILURE:
      return {
        ...state,
        isUpdating: false,
        emailUpdationSuccess: false,
        error: true,
        errorMessage: action.payload,
      };

    case constants.INITIALIZE_EMAIL_REDUCER:
      return {
        ...state,
        isUpdating: false,
        emailUpdationSuccess: false,
        error: false,
        errorMessage: '',
      };

    case constants.UPDATING_GENDER:
      return {
        ...state,
        isUpdatingGender: true,
      };

    case constants.UPDATING_GENDER_SUCCESS:
      return {
        ...state,
        isUpdatingGender: false,
        genderUpdationSuccess: true,
        error: false,
        errorMessageGender: '',
      };

    case constants.UPDATING_GENDER_FAILURE:
      return {
        ...state,
        isUpdatingGender: false,
        genderUpdationSuccess: false,
        error: true,
        errorMessageGender: action.payload,
      };

    case constants.INITIALIZE_GENDER_REDUCER:
      return {
        ...state,
        isUpdatingGender: false,
        genderUpdationSuccess: false,
        error: false,
        errorMessageGender: '',
      };
    default:
      return state;
  }
};
