import {all, fork} from 'redux-saga/effects';
import {getOTP, reSendingOTP, reIntializeLoginReducerr} from './LoginSaga';
import {authenticateUser, logoutFromApp, initializeAuth} from './UserAuthSaga';
import {getRewardList, getRewardCategory} from './RewardListSaga';
import {getRewardRedemptions} from './RewardRedemptionSaga';
import {dashboardDetail} from './DashboardSaga';
import {
  updateUserAddress,
  updateUserNotification,
  initializeAddressReducer,
} from './UpdateUserSettingSaga';
import {getActivity} from './ActivitiesSaga';
import {getUserOrders} from './OrdersSaga';
import {getUserDetail} from './GetUserDetail';
import {
  updateUserData,
  initializeReducer,
  updateProfileData,
} from './UpdateUserDetailSaga';
import {getMultipleQuestion} from './MultipleQuestionsSaga';
import {
  initializeEmailReducer,
  updateEmail,
  updateGender,
  initializeGenderReducer,
} from './EmailSaga';
import {
  getUserDataFromFirebase,
  initializeIntelligence,
} from './IntelligenceSaga';
import {
  saveAnswersToQuestionss,
  initializeSaveQuestions,
} from './SaveQuestionsSaga';
import {updateUserImage} from './UpdateUserImageSaga';
import {getAllCities} from './CitySaga';

export default function* root_saga() {
  yield all([
    fork(getOTP),
    fork(reIntializeLoginReducerr),
    fork(reSendingOTP),
    fork(updateUserData),
    fork(initializeAuth),
    fork(authenticateUser),
    fork(logoutFromApp),
    fork(getRewardCategory),
    fork(getRewardList),
    fork(getRewardRedemptions),
    fork(dashboardDetail),
    fork(updateUserAddress),
    fork(updateUserNotification),
    fork(getActivity),
    fork(getUserOrders),
    fork(getMultipleQuestion),
    fork(initializeReducer),
    fork(updateProfileData),
    fork(initializeAddressReducer),
    fork(getUserDetail),
    fork(updateEmail),
    fork(initializeEmailReducer),
    fork(updateGender),
    fork(initializeGenderReducer),
    fork(getUserDataFromFirebase),
    fork(saveAnswersToQuestionss),
    fork(initializeSaveQuestions),
    fork(updateUserImage),
    fork(initializeIntelligence),
    fork(getAllCities),
  ]);
}
