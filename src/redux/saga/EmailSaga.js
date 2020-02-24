import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';
// EMAIL SCREEN
export function* updatingEmail(action) {
  try {
    const response = yield Api.updateUserProfile(action.id, action.jsonObj);
    if (response && response.status) {
      yield put({type: constants.UPDATING_EMAIL_SUCCESS, payload: true});
    } else {
      yield put({
        type: constants.UPDATING_EMAIL_FAILURE,
        payload: response.message,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({type: constants.UPDATING_EMAIL_FAILURE, payload: error});
  }
}

export function* updateEmail() {
  yield takeLatest(constants.UPDATING_EMAIL, updatingEmail);
}

export function* initializeEmailReducerr() {
  yield put({type: constants.INITIALIZED_EMAIL_REDUCER});
}

export function* initializeEmailReducer() {
  yield takeLatest(constants.INITIALIZE_EMAIL_REDUCER, initializeEmailReducerr);
}

//Gender

export function* updatingGender(action) {
  try {
    const response = yield Api.updateUserProfile(action.id, action.jsonObj);
    if (response && response.status) {
      yield put({type: constants.UPDATING_GENDER_SUCCESS, payload: true});
    } else {
      yield put({
        type: constants.UPDATING_GENDER_FAILURE,
        payload: response.message,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({type: constants.UPDATING_GENDER_FAILURE, payload: error});
  }
}

export function* updateGender() {
  yield takeLatest(constants.UPDATING_GENDER, updatingGender);
}

export function* initializeGenderReducerr() {
  yield put({type: constants.INITIALIZED_GENDER_REDUCER});
}

export function* initializeGenderReducer() {
  yield takeLatest(
    constants.INITIALIZE_GENDER_REDUCER,
    initializeGenderReducerr
  );
}
