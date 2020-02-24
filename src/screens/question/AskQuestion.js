import * as React from 'react';
import {Text, View, Dimensions, StyleSheet, Platform} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast, {DURATION} from 'react-native-easy-toast';
import {Dimens, Colors, Fonts} from '../../utils/Theme';
import RNSwipeVerify from 'react-native-swipe-verify';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');

export default class AskQuestion extends React.Component {
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.refs.swipeView.reset();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={styles.videoScreenContainer}>
        <Toast ref="toast" />
        <View
          style={{
            paddingTop:
              Platform.OS == 'ios'
                ? isIphoneXorAbove()
                  ? Dimens.thirtyFive
                  : Dimens.twenty
                : Dimens.Zero,
          }}
        >
          <Icon
            name={'ios-arrow-back'}
            color="white"
            size={Dimens.twenty}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <Text
          style={{
            marginTop: Dimens.eighty,
            color: Colors.white,
            fontSize: Dimens.thirtyTwo,
            fontFamily: Fonts.SourceSansProBold,
            textAlign: 'justify',
          }}
          children={
            'We will now ask you ' +
            (this.props.navigation.getParam('selectedGender', 'male') == 'male'
              ? '11'
              : '12') +
            ' questions.'
          }
        />

        <Text
          style={{
            marginTop: Dimens.fifty,
            color: Colors.white,
            fontSize: Dimens.twentyThree,
            fontFamily: Fonts.SourceSansProRegular,
            textAlign: 'justify',
          }}
          children={
            'This will take about 3 mins. Almost all questions are of the type - Yes / No'
          }
        />

        <View
          style={{
            height: '10%',
            width: '100%',
            marginTop: widthPercentageToDP(70),
          }}
        >
          <RNSwipeVerify
            ref={'swipeView'}
            borderRadius={Dimens.hundred}
            width={width - Dimens.hundred}
            style={{marginTop: Dimens.hundred}}
            buttonSize={Dimens.sixty}
            borderColor="#8c52ff"
            buttonColor="#fff"
            backgroundColor="#733FDC"
            okButton={{visible: true, duration: 300}}
            onVerified={() => {
              AsyncStorage.setItem('ASK_QUESTION', 'Yes');
              this.props.navigation.navigate('QuestionCarousel', {
                selectedGender: this.props.navigation.getParam(
                  'selectedGender',
                  ''
                ),
              });
            }}
            icon={
              <AntDesign
                name={'arrowright'}
                size={Dimens.thirty}
                color={'#733FDC'}
              />
            }
          >
            <Text style={styles.swipeButtonStyle} children={'Start'} />
          </RNSwipeVerify>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  videoScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: Dimens.twentyFive,
    paddingHorizontal: Dimens.thirty,
    backgroundColor: Colors.loginBackground,
  },
  swipeButtonStyle: {
    textAlign: 'center',
    fontSize: Dimens.eighteen,
    padding: Dimens.ten,
    borderRadius: Dimens.twenty,
    marginHorizontal: Dimens.ten,
    color: '#fff',
    fontFamily: Fonts.SourceSansProBold,
  },
});
