import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

function* updateUserAddresss(action) {
  try {
    const response = yield Api.updateUserSetting(action.jsonObj);
    if (response && response.status) {
      yield put({
        type: constants.UPDATING_USER_ADDRESS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: constants.UPDATING_USER_ADDRESS_FAILURE,
        payload: 'Error while updating setting',
      });
    }
  } catch (error) {
    yield put({
      type: constants.UPDATING_USER_ADDRESS_FAILURE,
      payload: error,
    });
  }
}

export function* updateUserAddress() {
  yield takeLatest(constants.UPDATING_USER_ADDRESS, updateUserAddresss);
}

export function* initializedAddressReducer() {
  yield put({type: constants.INITIALIZED_ADDRESS_REDUCER});
}

export function* initializeAddressReducer() {
  yield takeLatest(
    constants.INITIALIZE_ADDRESS_REDUCER,
    initializedAddressReducer
  );
}

function* updateUserNotifications(action) {
  try {
    const response = yield Api.updateUserSetting(action.jsonObj);
    if (response && response.status) {
      yield put({
        type: constants.UPDATING_USER_NOTIFICATION_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: constants.UPDATING_USER_NOTIFICATION_FAILURE,
        payload: 'Error while updating setting',
      });
    }
  } catch (error) {
    yield put({
      type: constants.UPDATING_USER_NOTIFICATION_FAILURE,
      payload: error,
    });
  }
}

export function* updateUserNotification() {
  yield takeLatest(
    constants.UPDATING_USER_NOTIFICATION,
    updateUserNotifications
  );
}
