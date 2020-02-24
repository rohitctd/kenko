import * as constants from '../../utils/Constants';

const initialState = {
  saving: false,
  answeredSaved: false,
  error: false,
};

export default saveQuestions = (state = initialState, action) => {
  switch (action.type) {
    case constants.SAVING_QUESTIONS:
      return {
        ...state,
        saving: true,
      };

    case constants.SAVING_QUESTIONS_SUCCESS:
      return {
        saving: false,
        answeredSaved: true,
        error: false,
      };

    case constants.SAVING_QUESTIONS_FAILURE:
      return {
        saving: false,
        answeredSaved: false,
        error: true,
      };

    case constants.INITIALIZED_SAVE_QUESTIONS:
      return {
        saving: false,
        answeredSaved: false,
        error: false,
      };

    default:
      return state;
  }
};
