import React from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import {Colors, Dimens, Fonts} from '../../utils/Theme';

export default class AppIntroScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _renderAppIntroView() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor={Colors.loginBackground}
          barStyle="light-content"
          translucent={false}
        />
        <Text style={styles.welcomeHeader} children={'Hey !'} />
        <Text style={styles.textHeaderI} children={'We would like to know'} />
        <Text style={styles.textHeaderSecond} children={'your name, age'} />
        <Text
          style={styles.textHeaderSecond}
          children={'& place of residence.'}
        />

        <View style={styles.iconContainer}>
          <View style={styles.buttonSignInContainer}>
            <View style={styles.silentOvalStyle}>
              <FastImage
                style={styles.iconStyle}
                source={require('../../assets/silent.png')}
              />
            </View>
            <Text style={styles.iconText} children={'Go to a silent place'} />
          </View>

          <View style={styles.buttonSignInContainer}>
            <View style={styles.selfieOvalStyle}>
              <FastImage
                style={styles.iconStyle}
                source={require('../../assets/selfi.png')}
              />
            </View>
            <Text style={styles.iconText} children={'Record a selfie video'} />
          </View>

          <View style={styles.buttonSignInContainer}>
            <View style={styles.detailsOvalStyle}>
              <FastImage
                style={styles.iconStyle}
                source={require('../../assets/share.png')}
              />
            </View>
            <Text style={styles.iconText} children={'Share your details'} />
          </View>

          <View
            // onPress={() => {}} //this.props.navigation.navigate('GiftUnlock')}
            style={styles.buttonSignInContainer}
          >
            <View style={styles.giftOvalStyle}>
              <FastImage
                style={styles.iconStyle}
                source={require('../../assets/gift.png')}
              />
            </View>
            <Text style={styles.iconText} children={'Unlock a gift'} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.nextButtonContainer}
          onPress={() => this.props.navigation.navigate('VideoRecordingScreen')}
          activeOpacity={0.5}
        >
          <Text style={styles.nextIconText} children={'Next'} />

          <Icon
            color={Colors.loginTextColor}
            size={Dimens.thirty}
            name={'chevron-right'}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return this._renderAppIntroView();
  }
}
