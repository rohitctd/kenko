import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

export function* getUserOrders() {
  yield takeLatest(constants.FETCHING_ORDERS, getUserOrderss);
}

function* getUserOrderss(action) {
  try {
    const response = yield Api.getAllOrders(action.jsonObj);
    if (response && response.status) {
      yield put({
        type: constants.FETCHING_ORDERS_SUCCESS,
        payload: response,
      });
    } else {
      yield put({type: constants.FETCHING_ORDERS_FAILURE});
    }
  } catch (error) {
    console.log(error);
    yield put({type: constants.FETCHING_ORDERS_FAILURE});
  }
}
