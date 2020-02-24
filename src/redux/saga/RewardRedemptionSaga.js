import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

export function* getRewardRedemptions() {
  yield takeLatest(constants.GETTING_REWARD_REDEMPTIONS, getRewardRedemption);
}

function* getRewardRedemption(action) {
  try {
    const response = yield Api.getRewardRedemption(action.jsonObj);
    if (
      response &&
      response.hasOwnProperty('data') &&
      response.data.length != null &&
      response.data != null
    ) {
      yield put({
        type: constants.GOT_REDEMPTION_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({type: constants.GOT_REDEMPTION_FAILURE});
    }
  } catch (error) {
    console.log(error);
    yield put({type: constants.GOT_REDEMPTION_FAILURE});
  }
}
