import * as constants from '../../utils/Constants';
import {Alert} from 'react-native';

const initialState = {
  updatingNotification: false,
  notificationUpdated: false,
  notificationUpdatingError: false,

  updatingAddress: false,
  addressUpdated: false,
  addressUpdatingError: false,
};

export default function updateUserSetting(state = initialState, action) {
  switch (action.type) {
    case constants.UPDATING_USER_ADDRESS:
      return {
        ...state,
        updatingAddress: true,
      };

    case constants.UPDATING_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        updatingAddress: false,
        addressUpdated: true,
        addressUpdatingError: false,
      };

    case constants.UPDATING_USER_ADDRESS_FAILURE:
      Alert.alert('Alert!', action.payload);
      return {
        ...state,
        updatingAddress: false,
        addressUpdated: false,
        addressUpdatingError: true,
      };

    case constants.INITIALIZED_ADDRESS_REDUCER:
      return {
        ...state,
        updatingAddress: false,
        addressUpdated: false,
        addressUpdatingError: false,
      };

    case constants.UPDATING_USER_NOTIFICATION:
      return {
        ...state,
        updatingNotification: true,
      };

    case constants.UPDATING_USER_NOTIFICATION_SUCCESS:
      return {
        ...state,
        updatingNotification: false,
        notificationUpdated: true,
        notificationUpdatingError: false,
      };

    case constants.UPDATING_USER_NOTIFICATION_FAILURE:
      Alert.alert('Alert!', action.payload);
      return {
        ...state,
        updatingNotification: false,
        notificationUpdate: false,
        notificationUpdatingError: true,
      };

    default:
      return state;
  }
}
