import * as constants from '../../utils/Constants';

const initialState = {
  isFetching: false,
  userdata: '',
  error: false,
};

export default function dashBoardDetail(state = initialState, action) {
  switch (action.type) {
    case constants.GETTING_USER_DETAIL:
      return {
        ...state,
        isFetching: true,
      };

    case constants.GOT_USER_DETAIL_SUCCESSFULLY:
      return {
        ...state,
        isFetching: false,
        userdata: action.payload[0],
        error: false,
      };

    case constants.GETTING_USER_DETAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
}
