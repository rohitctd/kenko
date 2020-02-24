import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

function* authenticateUserWithNumber(action) {
  try {
    const response = yield Api.authenticateUser(action.jsonObj);
    if (response && response.status) {
      yield put({type: constants.USER_AUTH_SUCCESS, payload: response});
    } else {
      yield put({type: constants.USER_AUTH_FAILURE, payload: response.message});
    }
  } catch (error) {
    yield put({type: constants.USER_AUTH_FAILURE, payload: error});
  }
}

export function* authenticateUser() {
  yield takeLatest(constants.LOADING_USER_AUTH, authenticateUserWithNumber);
}

export function* initiateLogout() {
  yield put({type: constants.LOG_OUT_FROM_APP});
}

export function* logoutFromApp() {
  yield takeLatest(constants.INITIATE_LOGOUT, initiateLogout);
}

export function* initializeAuthh() {
  yield put({type: constants.INITIALIZED_AUTH});
}

export function* initializeAuth() {
  yield takeLatest(constants.INITIALIZING_AUTH, initializeAuthh);
}
