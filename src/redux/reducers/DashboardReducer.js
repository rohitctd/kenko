import * as constants from '../../utils/Constants';

const initialState = {
  isFetching: false,
  dashboardDetail: {
    data: [
      {
        globalSettings: [],
        healthprofile: [],
        recentactivity: [],
        userdata: [],
      },
    ],
  },
  error: false,
};

export default function dashBoardDetail(state = initialState, action) {
  switch (action.type) {
    case constants.FETCHING_DASHBOARD:
      return {
        ...state,
        isFetching: true,
      };

    case constants.FETCHING_DASHBOARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dashboardDetail: action.payload,
        error: false,
      };

    case constants.FETCHING_DASHBOARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
}
