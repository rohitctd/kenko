import * as constants from '../../utils/Constants';
import {Alert} from 'react-native';

const initialState = {
  updatingProfilePic: false,
  updateProfilePic: false,
  UpdatingFailure: false,
};

export default function updateUserImage(state = initialState, action) {
  switch (action.type) {
    case constants.UPDATING_USER_IMAGE:
      return {
        ...state,
        updatingProfilePic: true,
      };

    case constants.USER_IMAGE_UPDATED_SUCCESS:
      return {
        updatingProfilePic: false,
        updateProfilePic: true,
        UpdatingFailure: false,
      };

    case constants.USER_IMAGE_UPDATED_FAILURE:
      Alert.alert('Error', 'Error while updating image');
      return {
        updatingProfilePic: false,
        updateProfilePic: false,
        UpdatingFailure: true,
      };

    default:
      return state;
  }
}
