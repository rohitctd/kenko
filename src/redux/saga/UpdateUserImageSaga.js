import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

export function* updateUserImage() {
  yield takeLatest(constants.UPDATING_USER_IMAGE, updateUserImagee);
}
function* updateUserImagee(action) {
  try {
    const response = yield Api.updateUserImage(action.userID, action.formData);
    if (response && response.status) {
      yield put({
        type: constants.USER_IMAGE_UPDATED_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: constants.USER_IMAGE_UPDATED_FAILURE,
        payload: 'Error while updating setting',
      });
    }
  } catch (error) {
    yield put({
      type: constants.USER_IMAGE_UPDATED_FAILURE,
      payload: error,
    });
  }
}
