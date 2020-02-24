import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

export function* getOTP() {
  yield takeLatest(constants.SIGNING_IN, generateOTP);
}

function* generateOTP(action) {
  try {
    const response = yield Api.generateOTP(action.jsonObj);
    if (response && response.status) {
      yield put({
        type: constants.SIGN_IN_SUCCESS,
        payload: response.message,
      });
    } else {
      yield put({type: constants.SIGN_IN_FAILURE, payload: response.message});
    }
  } catch (error) {
    yield put({type: constants.SIGN_IN_FAILURE, payload: error});
  }
}

export function* reIntializeLoginReducer() {
  yield put({type: constants.RE_INITIALIZING_LOGIN_REDUCER});
}

export function* reIntializeLoginReducerr() {
  yield takeLatest(
    constants.RE_INITIALIZE_LOGIN_REDUCER,
    reIntializeLoginReducer
  );
}

export function* reSendingOTP() {
  yield takeLatest(constants.RESEND_SIGNING_IN, reSendingGenerateOTP);
}

function* reSendingGenerateOTP(action) {
  try {
    const response = yield Api.generateOTP(action.jsonObj);
    if (response && response.status) {
      yield put({
        type: constants.RESEND_SIGN_IN_SUCCESS,
        payload: response.message,
      });
    } else {
      yield put({
        type: constants.RESEND_SIGN_IN_FAILURE,
        payload: response.message,
      });
    }
  } catch (error) {
    yield put({type: constants.RESEND_SIGN_IN_FAILURE, payload: error});
  }
}
