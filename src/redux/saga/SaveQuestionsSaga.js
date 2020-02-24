import * as constants from '../../utils/Constants';
import {put, takeLatest, take, call} from 'redux-saga/effects';
import {Api} from '../../api/Apis';

export function* saveAnswersToQuestionss() {
  yield takeLatest(constants.SAVING_QUESTIONS, saveAnswersToQuestions);
}

function* saveAnswersToQuestions(action) {
  try {
    const response = yield Api.saveMultipleQuestions(action.jsonObj);
    if (response && response.status) {
      yield put({
        type: constants.SAVING_QUESTIONS_SUCCESS,
        payload: response,
      });
    } else {
      yield put({type: constants.SAVING_QUESTIONS_FAILURE});
    }
  } catch (error) {
    console.log(error);
    yield put({type: constants.SAVING_QUESTIONS_FAILURE});
  }
}

export function* initializeSaveQuestions() {
  yield takeLatest(constants.INITIALIZE_SAVE_QUESTIONS, initializeSavingg);
}

export function* initializeSavingg() {
  yield put({type: constants.INITIALIZED_SAVE_QUESTIONS});
}
