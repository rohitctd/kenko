import * as constants from '../../utils/Constants';

const initialState = {
  isFetching: false,
  rewardList: [],
  rewardCategories: [],
  error: false,
};

export default function getRewardList(state = initialState, action) {
  switch (action.type) {
    case constants.FETCHING_REWARD_LIST:
      return {
        ...state,
        isFetching: true,
      };

    case constants.FETCHING_REWARD_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        rewardList: action.payload,
        error: false,
      };

    case constants.FETCHING_REWARD_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        rewardList: [],
        error: true,
      };

    case constants.FETCHING_REWARD_CATEGORIES:
      return {
        ...state,
        isFetching: true,
      };

    case constants.FETCHING_REWARD_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        rewardCategories: action.payload,
        error: false,
      };

    case constants.FETCHING_REWARD_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        rewardCategories: [],
        error: true,
      };

    default:
      return state;
  }
}
