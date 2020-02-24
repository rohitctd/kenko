import * as React from 'react';
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');
import RNSwipeVerify from 'react-native-swipe-verify';
import {NavigationActions, StackActions} from 'react-navigation';

import {Colors, Dimens} from '../../../../../utils/Theme';
import styles from './styles';

export default class SlotBookingScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      shoot: false,
      showbackView: false,
    };
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.loginBackground);
    });
    setTimeout(() => {
      this.setState({shoot: true});
    }, 1000);
    setTimeout(() => {
      this.setState({showbackView: true});
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor={Colors.loginBackground}
          barStyle="light-content"
          translucent={false}
        />
        <View style={styles.thankYouContainer}>
          <View style={styles.thankIconStyle}>
            <FeatherIcon
              name={'check'}
              size={Dimens.fifty}
              color={Colors.white}
            />
          </View>

          <Text
            style={styles.thankTextContainer}
            children={'Booking Confirmed'}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={styles.textStyling}
            children={'We have booked your appointment'}
          />
          <Text style={styles.textStyling} children={'with 1mg Path Lab for'} />
          <Text
            style={styles.textStyling}
            children={'Wednesday, 3rd August 2019'}
          />
          <Text style={styles.textStyling} children={'between 12:00 - 13:00'} />
        </View>
        {this.state.showbackView ? (
          <View style={styles.hoverContainer}>
            <Text
              style={styles.redirectedTextStyle}
              children={'Redirecting to your 1mg account'}
            />

            <ActivityIndicator
              size={'large'}
              animating
              color={Colors.loginBackground}
            />

            <View style={styles.swipeButtonContainer}>
              <RNSwipeVerify
                borderRadius={Dimens.hundred}
                width={width - Dimens.hundred}
                style={{marginTop: Dimens.ten}}
                buttonSize={Dimens.sixty}
                borderColor="#fff"
                buttonColor={Colors.loginBackground}
                backgroundColor={'#e1d2ff'}
                okButton={{visible: true, duration: 200}}
                onVerified={() => {
                  const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({routeName: 'ActivityScreen'}),
                    ],
                  });

                  this.props.navigation.dispatch(resetAction);
                }}
                icon={
                  <Icon
                    name={'arrowright'}
                    size={Dimens.thirty}
                    color={Colors.white}
                  />
                }
              >
                <Text
                  style={styles.swipeButtonStyle}
                  children={'Continue'}
                />
              </RNSwipeVerify>
            </View>
          </View>
        ) : null}

        {this.state.shoot ? (
          <ConfettiCannon count={300} origin={{x: -10, y: 0}} />
        ) : null}
      </View>
    );
  }
}
