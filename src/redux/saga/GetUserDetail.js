import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

function* getUserDetails(action) {
  try {
    const response = yield Api.getUserDetails(action.id);
    if (response && response.status) {
      yield put({
        type: constants.GOT_USER_DETAIL_SUCCESSFULLY,
        payload: response.data,
      });
    } else {
      yield put({type: constants.GETTING_USER_DETAIL_FAILURE});
    }
  } catch (error) {
    console.log(error);
    yield put({type: constants.GETTING_USER_DETAIL_FAILURE});
  }
}

export function* getUserDetail() {
  yield takeLatest(constants.GETTING_USER_DETAIL, getUserDetails);
}
