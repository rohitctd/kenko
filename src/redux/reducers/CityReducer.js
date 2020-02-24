import * as constants from '../../utils/Constants';

const initialState = {
  fetchingCities: false,
  cities: [],
  error: false,
};

export default function getCities(state = initialState, action) {
  switch (action.type) {
    case constants.GETTING_CITIES:
      return {
        ...state,
        fetchingCities: true,
      };

    case constants.GOT_CITIES_SUCCESSFULLY:
      return {
        fetchingCities: false,
        cities: action.payload,
        error: false,
      };

    case constants.GOT_CITIES_FAILURE:
      return {
        ...state,
        fetchingCities: false,
        cities: [],
        error: true,
      };

    default:
      return state;
  }
}
