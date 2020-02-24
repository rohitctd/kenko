import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Toast, {DURATION} from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as constants from '../../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './EmailStyles';
import {Colors, isIphoneXorAbove, Dimens} from '../../utils/Theme';

import Loader from '../../component/Loader';

let enrolmentsText = 'Important communications will be sent to your Email ID';
class EmailAddress extends React.PureComponent {
  constructor(props) {
    super(props);
    StatusBar.setHidden(false);
  }

  state = {
    email: '',
    message: '',
    userDetail: '',
    width: 100,
  };

  updateSize = width => {
    this.setState({
      width,
    });
  };

  componentDidMount() {
    this.refs.phone.focus();

    AsyncStorage.getItem('LoginResponse')
      .then(response =>
        this.setState({
          userDetail: JSON.parse(response),
          email: JSON.parse(response).data[0].email,
        })
      )
      .catch(err => console.log(err));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {emailUpdationSuccess, errorMessage} = nextProps.EmailReducer;

    if (emailUpdationSuccess) {
      nextProps.initializeEmailReducer();
      AsyncStorage.setItem('EMAIL_SCREEN', 'Yes');

      nextProps.navigation.navigate('ChooseGender');
    }
    return {message: errorMessage};
  }

  saveEmail = async () => {
    try {
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
    const {email, userDetail} = this.state;
    global.accessToken = userDetail.token;

    NetInfo.isConnected.fetch().done(isConnected => {
      if (!isConnected) {
        this.refs.toast.show('No internet connection', DURATION.LENGTH_SHORT);
        return;
      }

      if (!this.validateEmail()) {
        return;
      }

      this.props.updateEmail(
        userDetail.data[0].id,
        JSON.stringify({email: email})
      );
    });
  };

  validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(this.state.email)) {
      this.refs.toast.show(
        'Please enter a valid email address',
        DURATION.LENGTH_SHORT
      );
      return false;
    }
    return true;
  };

  _renderLoginView() {
    const {isUpdating} = this.props.EmailReducer;
    const {newValue, width} = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Toast ref="toast" />

          <View
            style={{
              width: '10%',
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

          <StatusBar
            hidden={false}
            backgroundColor={Colors.loginBackground}
            barStyle="light-content"
            translucent={false}
          />
          <Text
            style={styles.welcomeHeader}
            children="Enter your Email Address"
          />
          <Text style={styles.textHeaderI} children={enrolmentsText} />
          <TextInput
            style={styles.textInput}
            ref={'phone'}
            multiline
            onChangeText={val => this.setState({email: val.replace(/\s/g, '')})}
            onSubmitEditing={() => this.saveEmail()}
            defaultValue={this.state.email}
            keyboardType="default"
            maxLength={30}
            numberOfLines={2}
            returnKeyType="done"
            underlineColorAndroid={'transparent'}
            placeholder="Email Address"
            placeholderTextColor="#A78AF8"
            selectionColor={'#A78AF8'}
          />

          <TouchableOpacity
            onPress={() => this.saveEmail()}
            style={styles.buttonSignInContainer}
            activeOpacity={0.5}
          >
            <Text style={styles.textSignIn} children={'Done'} />
          </TouchableOpacity>

          {isUpdating && <Loader />}
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
    this.refs.toast.show(message, DURATION.LENGTH_SHORT);
  };

  render() {
    return this._renderLoginView();
  }
}

const mapStateToProps = state => {
  return {
    EmailReducer: state.EmailReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEmail: (id, jsonObj) => {
      dispatch(updateEmail(id, jsonObj));
    },
    initializeEmailReducer: () => {
      dispatch(initializeEmailReducer());
    },
  };
};

const initializeEmailReducer = () => {
  return {
    type: constants.INITIALIZE_EMAIL_REDUCER,
  };
};

const updateEmail = (id, jsonObj) => {
  return {
    type: constants.UPDATING_EMAIL,
    id,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailAddress);
