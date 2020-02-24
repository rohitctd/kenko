import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Toast, {DURATION} from 'react-native-easy-toast';
import {connect} from 'react-redux';
import * as constants from '../../utils/Constants';

import styles from './styles';
import {Colors} from '../../utils/Theme';
import {messaging} from '../../firebase/Firebase';

import {firebaseListeners} from '../../firebase/firebaseNotification';
import Loader from '../../component/Loader';

let verificationText =
  'A 4-digit verification code will be sent to verify your mobile number';

class SignInScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    StatusBar.setHidden(false);
  }

  state = {
    mobileNumber: '',
    isLoading: false,
    deviceToken: {},
    message: '',
  };

  getDeviceToken = async () => {
    messaging
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log('deviceToken', fcmToken);
          this.setState({deviceToken: fcmToken || {}});
        } else {
          console.log("Token can't be fetched !");
        }
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  componentDidMount() {
    this.refs.phone.focus();
    firebaseListeners();

    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected) {
        this.getDeviceToken();
      }
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loginSuccess, message} = nextProps.LoginReducer;

    if (loginSuccess) {
      nextProps.initializeLoginReducer();
      nextProps.navigation.navigate('OtpScreen', {
        UserNumber: prevState.mobileNumber,
        DeviceToken: prevState.deviceToken,
      });
    }

    return {message: message};
  }

  attemptSignInn = async () => {
    try {
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }

    NetInfo.isConnected.fetch().done(isConnected => {
      if (!isConnected) {
        this.refs.toast.show('No internet connection', DURATION.LENGTH_SHORT);
        return;
      }

      if (!this.isFormValid()) {
        return;
      }

      this.props.signIn(
        JSON.stringify({mobileNumber: this.state.mobileNumber})
      );
    });
  };

  isFormValid() {
    const {mobileNumber} = this.state;

    if (isNaN(mobileNumber)) {
      this.refs.toast.show(
        'Please enter a valid mobile number',
        DURATION.LENGTH_SHORT
      );
      return false;
    }

    if (mobileNumber == 0) {
      this.refs.toast.show(
        'Please enter a valid mobile number',
        DURATION.LENGTH_SHORT
      );
      return false;
    }

    if (mobileNumber.length < 10 || mobileNumber.length > 13) {
      this.refs.toast.show(
        'Please enter a valid mobile number',
        DURATION.LENGTH_SHORT
      );
      return false;
    }

    return true;
  }

  showMessage = () => {
    const {message} = this.state;
    if (message == null || message == undefined || message == '') {
      return;
    }
    this.refs.toast.show(message, DURATION.LENGTH_SHORT);
  };

  _renderLoginView() {
    const {isSigningIn} = this.props.LoginReducer;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Toast ref="toast" />
          <StatusBar
            hidden={false}
            backgroundColor={Colors.loginBackground}
            barStyle="light-content"
            translucent={false}
          />

          <Text
            style={styles.welcomeHeader}
            children="Enter your Mobile number"
          />

          <Text style={styles.textHeaderI} children={verificationText} />
          <TextInput
            style={styles.textInput}
            ref={'phone'}
            onChangeText={val => this.setState({mobileNumber: val})}
            onSubmitEditing={() => this.attemptSignInn()}
            defaultValue={this.state.mobileNumber}
            keyboardType="number-pad"
            returnKeyType="done"
            placeholder="989129XXXX"
            placeholderTextColor="#A78AF8"
            selectionColor={'#A78AF8'}
            maxLength={10}
          />

          {this.state.mobileNumber.length == 10 && (
            <TouchableOpacity
              onPress={() => this.attemptSignInn()}
              style={styles.buttonSignInContainer}
              activeOpacity={0.5}
            >
              <Text style={styles.textSignIn} children={'Login'} />
            </TouchableOpacity>
          )}

          {isSigningIn && <Loader />}

          {this.showMessage()}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return this._renderLoginView();
  }
}

const mapStateToProps = state => {
  return {
    LoginReducer: state.LoginReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: jsonObj => {
      dispatch(signIn(jsonObj));
    },
    initializeLoginReducer: () => {
      dispatch(initializeLoginReducer());
    },
  };
};

const initializeLoginReducer = () => {
  return {
    type: constants.RE_INITIALIZE_LOGIN_REDUCER,
  };
};

const signIn = jsonObj => {
  return {
    type: constants.SIGNING_IN,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
