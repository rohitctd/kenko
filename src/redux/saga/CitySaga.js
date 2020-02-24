import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

export function* getAllCities() {
  yield takeLatest(constants.GETTING_CITIES, getCities);
}

function* getCities() {
  try {
    const response = yield Api.getAllCities();
    if (response && response.status) {
      yield put({
        type: constants.GOT_CITIES_SUCCESSFULLY,
        payload: response.data,
      });
    } else {
      yield put({
        type: constants.GOT_CITIES_FAILURE,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: constants.GOT_CITIES_FAILURE,
    });
  }
}
