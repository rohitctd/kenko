import * as constants from '../../utils/Constants';

const initialState = {
  isFetching: false,
  multipleQuestions: [],
  error: false,
};

export default function getUserDetail(state = initialState, action) {
  switch (action.type) {
    case constants.FETCHING_MULTIPLE_QUESTIONS:
      return {
        ...state,
        isFetching: true,
      };

    case constants.FETCHING_MULTIPLE_QUESTIONS_SUCCESS:
      return {
        isFetching: false,
        multipleQuestions: action.payload,
        error: false,
      };

    case constants.FETCHING_MULTIPLE_QUESTIONS_FAILURE:
      return {
        isFetching: false,
        multipleQuestions: [],
        error: true,
      };

    default:
      return state;
  }
}
