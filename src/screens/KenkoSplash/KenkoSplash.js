import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import {StatusBar} from 'react-native';
import OneSignal from 'react-native-onesignal';
import * as constants from '../../utils/Constants';

export default class KenkoSplash extends React.PureComponent {
  constructor(props) {
    super(props);
    StatusBar.setHidden(true);
    OneSignal.init(constants.ONE_SIGNAL_ID);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onIds(device) {
    console.log('Device info: ', device);
    AsyncStorage.setItem('PLAYER_ID', device.userId.toString());
  }

  setNavigation = async () => {
    try {
      let triggerNavigationValue = 'KenkoVideo';

      let IS_VIDEO_PLAYED = await AsyncStorage.getItem('IsVideoPlayed');
      let LOGIN_RESPONSE = await AsyncStorage.getItem('LoginResponse');
      let IS_VIDEO_UPLOADED = await AsyncStorage.getItem('IsVideoUploaded');
      let NAME_SCREEN = await AsyncStorage.getItem('NAME_SCREEN');
      let EMAIL_SCREEN = await AsyncStorage.getItem('EMAIL_SCREEN');
      let GENDER_SCREEN = await AsyncStorage.getItem('GENDER_SCREEN');
      let TERMS_SCREEN = await AsyncStorage.getItem('TERMS_SCREEN');
      let ASK_QUESTION = await AsyncStorage.getItem('ASK_QUESTION');
      let QUESTION_CAROUSEL = await AsyncStorage.getItem('QUESTION_CAROUSEL');
      let PERMISSION = await AsyncStorage.getItem('PERMISSION');
      let SCORE_FETCHED = await AsyncStorage.getItem('SCORE_FETCHED');

      if (
        IS_VIDEO_PLAYED == undefined ||
        IS_VIDEO_PLAYED == null ||
        IS_VIDEO_PLAYED == ''
      ) {
        triggerNavigationValue = 'KenkoVideo';
      } else if (
        LOGIN_RESPONSE == undefined ||
        LOGIN_RESPONSE == null ||
        LOGIN_RESPONSE == ''
      ) {
        triggerNavigationValue = 'AuthNavigator';
      }
      else if (
        LOGIN_RESPONSE != undefined &&
        LOGIN_RESPONSE != null &&
        LOGIN_RESPONSE != '' &&
        JSON.parse(LOGIN_RESPONSE).data[0].registered
      ) {
        triggerNavigationValue = 'TabNavigation';
      }
      else if (
        IS_VIDEO_UPLOADED == undefined ||
        IS_VIDEO_UPLOADED == null ||
        IS_VIDEO_UPLOADED == ''
      ) {
        triggerNavigationValue = 'AppIntro';
      } else if (
        NAME_SCREEN == undefined ||
        NAME_SCREEN == null ||
        NAME_SCREEN == ''
      ) {
        triggerNavigationValue = 'Question2Screen';
      } else if (
        EMAIL_SCREEN == undefined ||
        EMAIL_SCREEN == null ||
        EMAIL_SCREEN == ''
      ) {
        triggerNavigationValue = 'EmailAddress';
      } else if (
        GENDER_SCREEN == undefined ||
        GENDER_SCREEN == null ||
        GENDER_SCREEN == ''
      ) {
        triggerNavigationValue = 'ChooseGender';
      } else if (
        TERMS_SCREEN == undefined ||
        TERMS_SCREEN == null ||
        TERMS_SCREEN == ''
      ) {
        triggerNavigationValue = 'ChooseGender';
      } else if (
        ASK_QUESTION == undefined ||
        ASK_QUESTION == null ||
        ASK_QUESTION == ''
      ) {
        triggerNavigationValue = 'ChooseGender';
      } else if (
        QUESTION_CAROUSEL == undefined ||
        QUESTION_CAROUSEL == null ||
        QUESTION_CAROUSEL == ''
      ) {
        triggerNavigationValue = 'QuestionCarousel';
      } else if (
        PERMISSION == undefined ||
        PERMISSION == null ||
        PERMISSION == ''
      ) {
        triggerNavigationValue = 'Permission';
      } else if (
        SCORE_FETCHED == undefined ||
        SCORE_FETCHED == null ||
        SCORE_FETCHED == ''
      ) {
        triggerNavigationValue = 'ScoreFetched';
      } else {
        triggerNavigationValue = 'TabNavigation';
      }

      this.props.navigation.navigate(triggerNavigationValue);
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    return (
      <FastImage
        style={{height: '100%', width: '100%', flex: 1}}
        source={require('../../assets/new/Splash.gif')}
        resizeMode={FastImage.resizeMode.cover}
        onLoadStart={() => {
          setTimeout(() => {
            this.setNavigation();
          }, 3000);
        }}
      />
    );
  }
}
