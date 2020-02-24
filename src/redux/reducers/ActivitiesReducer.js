import * as constants from '../../utils/Constants';

const initialState = {
  isFetching: false,
  activities: [],
  error: false,
};

export default getActivities = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCHING_ACTIVITIES:
      return {
        ...state,
        isFetching: true,
      };

    case constants.FETCHING_ACTIVITIES_SUCCESS:
      return {
        isFetching: false,
        activities: action.payload,
        error: false,
      };

    case constants.FETCHING_ACTIVITIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};
