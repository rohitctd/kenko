import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

export function* getActivity() {
  yield takeLatest(constants.FETCHING_ACTIVITIES, getAllActivities);
}

function* getAllActivities(action) {
  try {
    const response = yield Api.getActivities(action.jsonObj);
    if (response && response.status) {
      yield put({
        type: constants.FETCHING_ACTIVITIES_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({type: constants.FETCHING_ACTIVITIES_FAILURE});
    }
  } catch (error) {
    console.log(error);
    yield put({type: constants.FETCHING_ACTIVITIES_FAILURE});
  }
}
