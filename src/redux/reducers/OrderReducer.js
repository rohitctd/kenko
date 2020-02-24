import * as constants from '../../utils/Constants';

const initialState = {
  isFetching: false,
  userOrders: [{data: []}],
  error: false,
};

export default getAllOrders = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCHING_ORDERS:
      return {
        ...state,
        isFetching: true,
      };

    case constants.FETCHING_ORDERS_SUCCESS:
      return {
        isFetching: false,
        userOrders: action.payload,
        error: false,
      };

    case constants.FETCHING_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};
