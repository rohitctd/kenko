import * as constants from "../../utils/Constants";
import { put, takeLatest, take, call } from "redux-saga/effects";
import { Api } from "../../api/Apis";

export function* getRewardCategory() {
  yield takeLatest(constants.FETCHING_REWARD_CATEGORIES, getRewardCategories);
}

function* getRewardCategories() {
  try {
    const response = yield Api.getRewardCategories();
    if (
      response &&
      response.hasOwnProperty("data") &&
      response.data.length != null &&
      response.data != null
    ) {
      yield put({
        type: constants.FETCHING_REWARD_CATEGORIES_SUCCESS,
        payload: response.data
      });
    } else {
      yield put({ type: constants.FETCHING_REWARD_CATEGORIES_FAILURE });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: constants.FETCHING_REWARD_CATEGORIES_FAILURE });
  }
}

export function* getRewardList() {
  yield takeLatest(constants.FETCHING_REWARD_LIST, getRewardListing);
}

function* getRewardListing(action) {
  try {
    const response = yield Api.getRewardListing(action.jsonObj);
    console.log(response);
    if (response && response.status) {
      yield put({
        type: constants.FETCHING_REWARD_LIST_SUCCESS,
        payload: response.data
      });
    } else {
      yield put({ type: constants.FETCHING_REWARD_LIST_FAILURE });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: constants.FETCHING_REWARD_LIST_FAILURE });
  }
}
