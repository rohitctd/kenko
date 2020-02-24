import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

// USER NAME AGE LOCATION
function* updateUserDetail(action) {
  try {
    const response = yield Api.updateUserDetail(action.userId, action.jsonObj);
    if (response && response.status) {
      yield put({type: constants.USER_DATA_UPDATED_SUCCESS, payload: true});
    } else {
      yield put({type: constants.USER_DATA_UPDATED_FAILURE});
    }
  } catch (error) {
    console.log(error);
    yield put({type: constants.USER_DATA_UPDATED_FAILURE});
  }
}

export function* updateUserData() {
  yield takeLatest(constants.UPDATING_USER_DATA, updateUserDetail);
}

export function* initializeReducerr() {
  yield put({type: constants.INITIALIZE_USER_NAME_AGE_LOCATION_REDUCERR});
}

export function* initializeReducer() {
  yield takeLatest(
    constants.INITIALIZE_USER_NAME_AGE_LOCATION_REDUCER,
    initializeReducerr
  );
}

// EDIT PROFILE SCREEN
export function* updatingUserProfile(action) {
  try {
    const response = yield Api.updateUserProfile(action.userID, action.jsonObj);
    if (response && response.status) {
      yield put({type: constants.UPDATING_USER_PROFILE_SUCCESS, payload: true});
    } else {
      yield put({
        type: constants.UPDATING_USER_PROFILE_FAILURE,
        payload: response.message,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({type: constants.UPDATING_USER_PROFILE_FAILURE, payload: error});
  }
}

export function* updateProfileData() {
  yield takeLatest(constants.UPDATING_USER_PROFILE, updatingUserProfile);
}

export function* initializeProfileReducerr() {
  yield put({type: constants.INITIALIZE_PROFILE_REDUCERR});
}

export function* initializeProfileReducer() {
  yield takeLatest(
    constants.INITIALIZE_PROFILE_REDUCER,
    initializeProfileReducerr
  );
}
