import * as constants from '../../utils/Constants';
import {put, takeLatest} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

function* getdashboardDetail(action) {
  try {
    const response = yield Api.dashBoardDetails(action.jsonObj);
    if (response) {
      yield put({
        type: constants.FETCHING_DASHBOARD_SUCCESS,
        payload: response,
      });
    } else {
      yield put({type: constants.FETCHING_DASHBOARD_FAILURE});
    }
  } catch (error) {
    console.log(error);
    yield put({type: constants.FETCHING_DASHBOARD_FAILURE});
  }
}

export function* dashboardDetail() {
  yield takeLatest(constants.FETCHING_DASHBOARD, getdashboardDetail);
}
