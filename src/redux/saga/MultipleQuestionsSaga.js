import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

export function* getMultipleQuestion() {
  yield takeLatest(constants.FETCHING_MULTIPLE_QUESTIONS, getMultipleQuestions);
}

function* getMultipleQuestions(action) {
  try {
    const response = yield Api.getMultipleQuestions(action.gender);
    if (response && response.status) {
      yield put({
        type: constants.FETCHING_MULTIPLE_QUESTIONS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({type: constants.FETCHING_MULTIPLE_QUESTIONS_FAILURE});
    }
  } catch (error) {
    console.log(error);
    yield put({type: constants.FETCHING_MULTIPLE_QUESTIONS_FAILURE});
  }
}
