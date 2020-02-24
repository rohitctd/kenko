import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

export function* getUserDataFromFirebase() {
  yield takeLatest(
    constants.FETCHING_USER_DATA_FROM_FIREBASE,
    getDataFromFirebase
  );
}

function* getDataFromFirebase(action) {
  try {
    const response = yield Api.getDataFromIntelligenceAPI(action.jsonObj);
    if (response && response.status) {
      yield put({
        type: constants.FETCHING_SUCCESS_FROM_FIREBASE,
        payload: response,
      });
    } else {
      yield put({
        type: constants.FETCHING_FAILURE_FROM_FIREBASE,
        payload: response,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: constants.FETCHING_FAILURE_FROM_FIREBASE_IN_CATCH,
      payload: error,
    });
  }
}

export function* initializedIntelligence() {
  yield put({
    type: constants.INITIALIZED_INTELLIGENCE,
  });
}

export function* initializeIntelligence() {
  yield takeLatest(constants.INITIALIZE_INTELLIGENCE, initializedIntelligence);
}
