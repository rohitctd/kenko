import {combineReducers} from 'redux';
import * as constants from '../../utils/Constants';
import LoginReducer from './LoginReducer';
import AuthReducer from './AuthReducer';
import RewardListReducer from './RewardListReducers';
import RewardRedemptionReducer from './RewardRedemptionReducer';
import UserDetailReducer from './UserDetailReducer';
import DashboardReducer from './DashboardReducer';
import UpdateUserSettingReducer from './UpdateUserSettingReducer';
import ActivitiesReducer from './ActivitiesReducer';
import OrderReducer from './OrderReducer';
import UpdateUserDetailReducer from './UpdateUserDetailReducer';
import MultipleQuestionsReducer from './MultipleQuestionsReducer';
import EmailReducer from './EmailReducer';
import IntelligenceReducer from './IntelligenceReducer';
import SavingQuestionReducer from './SavingQuestionReducer';
import UpdateUserImageReducer from './UpdateUserImageReducer';
import CityReducer from './CityReducer';

const appReducer = combineReducers({
  LoginReducer,
  AuthReducer,
  RewardListReducer,
  RewardRedemptionReducer,
  UserDetailReducer,
  DashboardReducer,
  UpdateUserSettingReducer,
  ActivitiesReducer,
  OrderReducer,
  UpdateUserDetailReducer,
  MultipleQuestionsReducer,
  EmailReducer,
  IntelligenceReducer,
  SavingQuestionReducer,
  UpdateUserImageReducer,
  CityReducer,
});

export default RootReducer = (state, action) => {
  if (action.type == constants.LOG_OUT_FROM_APP) {
    state = undefined;
  }

  return appReducer(state, action);
};
