import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Toast, {DURATION} from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/Feather';
import CodeInput from 'react-native-confirmation-code-input';
import CountDown from 'react-native-countdown-component';

import {messaging} from '../../firebase/Firebase';
import styles from './styles';
import * as constants from '../../utils/Constants';
import {Colors, Dimens, Fonts} from '../../utils/Theme';
import Loader from '../../component/Loader';

let otpText = 'Please wait while we verify your mobile number';

class OtpScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      totalDuration: 0,
      message: '',
      userNumber: this.props.navigation.getParam('UserNumber', ''),
      deviceToken: this.props.navigation.getParam('DeviceToken', ''),
    };

    if (this.props.navigation.getParam('DeviceToken', '') == '') {
      this.getDeviceToken();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loginDetail, errorMessage} = nextProps.AuthReducer;
    const {message} = nextProps.LoginReducer;

    if (loginDetail) {
      global.accessToken = loginDetail.token;

      AsyncStorage.setItem('LoginResponse', JSON.stringify(loginDetail))
        .then(() => {
          nextProps.navigation.navigate(
            loginDetail.data[0].registered ? 'TabNavigation' : 'AppIntro'
          );
        })
        .catch(err => console.log(err));
    }
    if (errorMessage != '' && errorMessage != null && errorMessage != undefined)
      return {message: errorMessage};

    return null;
  }

  getDeviceToken = async () => {
    messaging
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          this.setState({deviceToken: fcmToken || {}});
        } else {
          console.log("Token can't be fetched !");
        }
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  verifyOtp = otp => {
    try {
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }

    NetInfo.isConnected.fetch().done(isConnected => {
      if (!isConnected) {
        this.refs.toast.show('No internet connection', DURATION.LENGTH_SHOR);
        return;
      }

      if (otp.length < 4 || otp == undefined || otp == null) {
        this.refs.toast.show('Entered OTP is incorrect', DURATION.LENGTH_SHORT);
        return;
      }

      this.props.otpVerification(
        JSON.stringify({
          mobileNumber: this.state.userNumber,
          devicePushId: this.state.deviceToken,
          otp: otp.toString(),
          // deviceId: 'device_id',
          // deviceName: 'device_name',
          // operatingSystem: 'os',
          // modelNumber: 'device_model',
          // osVersion: 'os_version',
        })
      );
    });
  };

  componentDidMount() {
    this.setState({totalDuration: 30, isLoading: true});
  }

  _onFinish = () => {
    this.setState({isLoading: false});
  };

  _resendOtp = () => {
    this.refs.otpRef.clear();
    this.props.initializeAuth();

    try {
      Keyboard.dismiss();
    } catch (e) {
      console.log(e);
    }

    this.setState({totalDuration: 30, isLoading: true, message: ''}, () => {
      this.props.signIn(JSON.stringify({mobileNumber: this.state.userNumber}));
    });
  };

  _renderOtpView() {
    const {isFetching} = this.props.AuthReducer;
    const {reIsSigningIn} = this.props.LoginReducer;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Toast ref="toast" />

          <Icon
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={styles.leftIcon}
            color={Colors.loginTextColor}
            size={Dimens.twentyFive}
            name={'chevron-left'}
          />

          <Text style={styles.welcomeHeader} children="One Time Password" />

          <Text style={styles.textHeaderI} children={otpText} />

          <CodeInput
            ref="otpRef"
            codeLength={4}
            activeColor="rgba(255, 255, 255, 0.33)"
            inactiveColor="rgba(255, 255, 255, 0.33)"
            autoFocus={true}
            ignoreCase={false}
            inputPosition="left"
            size={Dimens.fourtyFive}
            onFulfill={otp => this.verifyOtp(otp)}
            containerStyle={{marginTop: Dimens.fifty}}
            codeInputStyle={styles.textInput}
            keyboardType="number-pad"
            returnKeyType="done"
            placeholder="X"
            placeholderTextColor="#A78AF8"
            selectionColor={'#A78AF8'}
            space={Dimens.fifty}
          />

          <View style={{marginTop: '70%', justifyContent: 'flex-start'}}>
            {this.state.isLoading ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: -Dimens.fifty,
                  alignItems: 'center',
                }}
              >
                <ActivityIndicator size="small" color="#ffffff" />

                <CountDown
                  timeToShow={['S']}
                  timeLabels={false}
                  size={10}
                  digitTxtStyle={{color: Colors.white}}
                  digitStyle={{backgroundColor: Colors.loginBackground}}
                  until={this.state.totalDuration}
                  timetoShow={'S'}
                  onFinish={() => this._onFinish()}
                  onPress={() => {}}
                  size={Dimens.twentyFive}
                />

                <Text
                  style={{
                    color: '#ffffff',
                    fontFamily: Fonts.SourceSansProSemibold,
                    fontSize: Dimens.fifteen,
                    fontWeight: '600',
                  }}
                  children={'Second Remaining'}
                />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: -Dimens.fifty,
                  alignItems: 'center',
                }}
              />
            )}
          </View>

          <View>
            <Text
              style={[
                styles.textResend,
                {fontFamily: Fonts.SourceSansProRegular},
              ]}
              children={'Didn’t receive the OTP'}
            />
            <TouchableOpacity onPress={() => this._resendOtp()}>
              <Text
                style={[styles.textResend, {marginTop: Dimens.ten}]}
                children={'Resend'}
              />
            </TouchableOpacity>
          </View>

          {(isFetching || reIsSigningIn) && <Loader />}
          {this.showMessage()}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  showMessage = () => {
    const {message} = this.state;
    if (message == null || message == undefined || message == '') {
      return;
    }
    if (this.refs.toast) this.refs.toast.show(message, DURATION.LENGTH_SHORT);
  };

  render() {
    return this._renderOtpView();
  }
}

const mapStateToProps = state => {
  return {
    AuthReducer: state.AuthReducer,
    LoginReducer: state.LoginReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    otpVerification: jsonObj => {
      dispatch(attemptOtpVerification(jsonObj));
    },
    signIn: jsonObj => {
      dispatch(signIn(jsonObj));
    },
    initializeAuth: () => {
      dispatch(initializeAuth());
    },
    initializeLoginReducer: () => {
      dispatch(initializeLoginReducer());
    },
  };
};

const initializeAuth = () => {
  return {
    type: constants.INITIALIZING_AUTH,
  };
};

const initializeLoginReducer = () => {
  return {
    type: constants.RE_INITIALIZE_LOGIN_REDUCER,
  };
};

const attemptOtpVerification = jsonObj => {
  return {
    type: constants.LOADING_USER_AUTH,
    jsonObj,
  };
};

const signIn = jsonObj => {
  return {
    type: constants.RESEND_SIGNING_IN,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtpScreen);
