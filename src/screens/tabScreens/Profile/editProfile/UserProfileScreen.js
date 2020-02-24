import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Picker from 'react-native-select-input-ios';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import * as constants from '../../../../utils/Constants';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import SelectInput from 'react-native-select-input-ios';
import Toast, {DURATION} from 'react-native-easy-toast';

import styles from './styles';
import {Dimens, Colors, shadowOpt, Fonts} from '../../../../utils/Theme';
import FastImage from 'react-native-fast-image';
import Loader from '../../../../component/Loader';
import AsyncStorage from '@react-native-community/async-storage';

const radioButtonArr = [
  {value: 0, label: 'Single'},
  {value: 1, label: 'Married'},
];

const genderArr = [
  {value: 0, label: 'Select Gender'},
  {value: 1, label: 'Male'},
  {value: 2, label: 'Female'},
  {value: 3, label: 'Others'},
];

class UserProfileScreen extends PureComponent {
  constructor(props) {
    super(props);

    let userDetail = props.navigation.getParam('profileData', '');
    let genderIndex = genderArr.findIndex(obj => {
      if (
        userDetail.gender != '' &&
        userDetail.gender != undefined &&
        userDetail.gender != null
      ) {
        return obj.label.toUpperCase() == userDetail.gender.toUpperCase();
      }
    });

    let martialStatusIndex = radioButtonArr.findIndex(obj => {
      if (
        userDetail.martialStatus != '' &&
        userDetail.martialStatus != undefined &&
        userDetail.martialStatus != null
      ) {
        return (
          obj.label.toUpperCase() == userDetail.martialStatus.toUpperCase()
        );
      }
    });

    this.state = {
      userDetail: props.navigation.getParam('profileData', ''),
      avatarSource: userDetail.profileImage,
      playerId: '',
      message: '',
      internetConnected: false,
      name: userDetail.fname,
      email: userDetail.email,
      phone: userDetail.mobileNumber.toString(),
      dob:
        userDetail.dob == null ||
        userDetail.dob == undefined ||
        userDetail.dob == ''
          ? ''
          : moment(userDetail.dob, 'MM/DD/YYYY').format('MM/DD/YYYY'),
      genderIndex:
        userDetail.gender == '' ||
        userDetail.gender == null ||
        userDetail.gender == undefined
          ? 0
          : genderIndex == -1
          ? 0
          : genderIndex,
      genderValue:
        userDetail.gender == '' ||
        userDetail.gender == null ||
        userDetail.gender == undefined
          ? 'Select Gender'
          : userDetail.gender,
      martialStatusIndex:
        userDetail.martialStatus == '' ||
        userDetail.martialStatus == null ||
        userDetail.martialStatus == undefined
          ? 0
          : martialStatusIndex == -1
          ? 0
          : martialStatusIndex,
      martialStatusValue:
        userDetail.martialStatus == '' ||
        userDetail.martialStatus == null ||
        userDetail.martialStatus == undefined
          ? 'Single'
          : userDetail.martialStatus,
      profession: userDetail.profession,
      company: userDetail.company,
      base64: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('PLAYER_ID')
      .then(value => {
        if (value) {
          this.setState({playerId: value});
        }
      })
      .catch(e => console.log(e));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {userProfileUpdated, message} = nextProps.UpdateUserDetailReducer;
    const {
      updateProfilePic,
      UpdatingFailure,
    } = nextProps.UpdateUserImageReducer;

    if (UpdatingFailure) {
      return {
        avatarSource: prevState.userDetail.profileImage,
      };
    }

    if (userProfileUpdated) {
      nextProps.initializeProfileReducer();
      nextProps.navigation.goBack();
    }
    if (message != '' && message != null && message != undefined)
      return {message: message};

    return null;
  }

  validateEmail = email => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) {
      this.refs.toast.show(
        'Please enter a valid email address',
        DURATION.LENGTH_SHORT
      );
      return false;
    }
    return true;
  };

  validate() {
    const {
      name,
      phone,
      dob,
      genderValue,
      email,
      profession,
      company,
      martialStatusValue,
    } = this.state;

    if (name == '' || name == null || name == undefined) {
      this.refs.toast.show('Please enter your name', DURATION.LENGTH_SHORT);
      return false;
    }
    if (email == '' || email == null || email == undefined) {
      this.refs.toast.show(
        'Please enter a valid email address',
        DURATION.LENGTH_SHORT
      );
      return false;
    }
    if (!this.validateEmail(email)) {
      return;
    }
    if (phone == '' || phone == null || phone == undefined) {
      this.refs.toast.show(
        'Please enter your mobile number',
        DURATION.LENGTH_SHORT
      );
      return false;
    }
    // if (dob == '' || dob == null || dob == undefined) {
    //   this.refs.toast.show('Please enter your dob!', DURATION.LENGTH_SHORT);
    //   return false;
    // }
    if (genderValue == 'Select Gender' || genderValue == '') {
      this.refs.toast.show('Please select your gender', DURATION.LENGTH_SHORT);
      return false;
    }

    if (martialStatusValue == '') {
      this.refs.toast.show(
        'Please select your martial status',
        DURATION.LENGTH_SHORT
      );
      return false;
    }

    // if (profession == '' || profession == null || profession == undefined) {
    //   this.refs.toast.show(
    //     'Please enter your profession !',
    //     DURATION.LENGTH_SHORT
    //   );
    //   return false;
    // }

    // if (company == '' || company == null || company == undefined) {
    //   this.refs.toast.show('Please enter your company!', DURATION.LENGTH_SHORT);
    //   return false;
    // }
    return true;
  }

  saveUserDetails = () => {
    const {
      name,
      phone,
      dob,
      genderValue,
      email,
      profession,
      company,
      martialStatusValue,
      playerId,
      userDetail,
    } = this.state;

    if (!this.validate()) {
      return;
    }
    NetInfo.isConnected.fetch().done(isConnected => {
      if (!isConnected) {
        this.refs.toast.show('No internet connection', DURATION.LENGTH_SHORT);
        return;
      }

      this.props.updateUserDetail(
        userDetail.id,
        JSON.stringify({
          company: company,
          dob: dob,
          email: email,
          fname: name,
          gender:
            genderValue.toLowerCase() == 'Select Gender'
              ? ''
              : genderValue.toLowerCase(),
          martialStatus: martialStatusValue.toLowerCase(),
          mobileNumber: phone,
          profession: profession,
          playerId: playerId,
        })
      );
    });
  };

  showImagePicker() {
    const options = {
      title: 'Please Select',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState(
          {
            avatarSource: response.uri,
            imageData: response,
          },
          () => {
            let formData = new FormData();
            formData.append('image', {
              uri: this.state.imageData.uri,
              type: this.state.imageData.type,
              name: this.state.imageData.fileName,
            });
            this.props.updateProfilePic(this.state.userDetail.id, formData);
          }
        );
      }
    });
  }

  renderProfilePic = () => {
    if (
      this.state.avatarSource != '' &&
      this.state.avatarSource != null &&
      this.state.avatarSource != undefined
    ) {
      return (
        <FastImage
          style={styles.imageStyle}
          source={{uri: this.state.avatarSource}}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
    } else {
      return (
        <FastImage
          style={styles.imageStyle}
          source={require('../../../../assets/profilePic.jpeg')}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
    }
  };

  renderDetailsView = () => {
    return (
      <View style={styles.orderContainer}>
        <TouchableOpacity
          onPress={() => {
            NetInfo.isConnected.fetch().done(isConnected => {
              if (!isConnected) {
                this.refs.toast.show(
                  'No internet connection',
                  DURATION.LENGTH_SHORT
                );
                return;
              }
              this.showImagePicker();
            });
          }}
        >
          {this.renderProfilePic()}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText} children={'Your Name'} />
          <TextInput
            style={styles.textInput}
            ref={'name'}
            onChangeText={val => this.setState({name: val})}
            onSubmitEditing={() => this.refs.email.focus()}
            defaultValue={this.state.name}
            keyboardType="email-address"
            returnKeyType="next"
            placeholder="Name"
            placeholderTextColor={Colors.placeHolderColor}
            selectionColor={Colors.notificationHeaderTextColor}
            maxLength={40}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText} children={'Your Email ID'} />
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <TextInput
              style={[
                styles.textInput,
                {flex: 1, borderBottomWidth: 0, color: Colors.placeHolderColor},
              ]}
              ref={'email'}
              onChangeText={val => this.setState({email: val})}
              onSubmitEditing={() => this.refs.phone.focus()}
              defaultValue={this.state.email}
              keyboardType="email-address"
              returnKeyType="next"
              placeholder="Email"
              editable={false}
              placeholderTextColor={Colors.placeHolderColor}
              selectionColor={Colors.notificationHeaderTextColor}
            />
            <EvilIcons
              color={Colors.dimTextColor}
              size={Dimens.thirtyFive}
              name={'lock'}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText} children={'Your Mobile No'} />
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <TextInput
              style={[
                styles.textInput,
                {flex: 1, borderBottomWidth: 0, color: Colors.placeHolderColor},
              ]}
              ref={'phone'}
              onChangeText={val => this.setState({phone: val})}
              defaultValue={this.state.phone}
              keyboardType="number-pad"
              returnKeyType="done"
              placeholder="Mobile Number"
              editable={false}
              placeholderTextColor={Colors.placeHolderColor}
              selectionColor={Colors.notificationHeaderTextColor}
              maxLength={15}
            />
            <EvilIcons
              color={Colors.dimTextColor}
              size={Dimens.thirtyFive}
              name={'lock'}
            />
          </View>
        </View>
      </View>
    );
  };

  showMessage = () => {
    const {message} = this.state;
    if (message == null || message == undefined || message == '') {
      return;
    }
    // this.refs.toast.show(message, DURATION.LENGTH_SHORT);
  };

  renderAdditionalInformation = () => {
    return (
      <View
        style={[
          styles.orderContainer,
          {paddingTop: Dimens.seven, paddingBottom: 0},
        ]}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.labelText} children={'Martial Status'} />
          <RadioForm
            style={{marginTop: Dimens.five}}
            radio_props={radioButtonArr}
            buttonColor={Colors.notificationHeaderTextColor}
            selectedButtonColor={Colors.profileBackgroundColor}
            buttonSize={Dimens.fifteen}
            labelStyle={{
              fontSize: Dimens.fourteen,
              marginRight: Dimens.fifteen,
              fontSize: Dimens.eighteen,
              color: Colors.headingTextColor,
              fontFamily: Fonts.SourceSansProSemibold,
            }}
            initial={this.state.martialStatusIndex}
            formHorizontal={true}
            onPress={value => {
              this.setState({
                martialStatusIndex: value,
                martialStatusValue: radioButtonArr[value].label,
              });
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText} children={'Gender'} />

          <SelectInput
            value={this.state.genderIndex}
            mode={'dropdown'}
            options={genderArr}
            onCancelEditing={() => console.log('onCancel')}
            onSubmitEditing={value => {
              this.setState({
                genderValue: genderArr[value].label,
                genderIndex: value,
              });
            }}
            style={styles.selectInputLarge}
            labelStyle={styles.selectInputInner}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              paddingBottom: Dimens.five,
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
          ]}
        >
          <Text style={styles.labelText} children={'Date of Birth'} />
          <DatePicker
            key={0}
            style={[
              {
                backgroundColor: 'white',
                flex: 1,
                paddingLeft: Dimens.five,
              },
            ]}
            date={this.state.dob != '' ? this.state.dob : ''}
            mode="date"
            placeholder="Select DOB"
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateIcon: {},
              dateInput: {
                borderWidth: 0,
                borderColor: 'transparent',
                alignItems: 'flex-start',
              },
              dateText: {
                alignItems: 'flex-start',
                fontSize: Dimens.seventeen,
                color: Colors.headingTextColor,
                fontFamily: Fonts.SourceSansProSemibold,
              },
            }}
            onDateChange={date => {
              this.setState({dob: date});
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText} children={'Profession'} />
          <TextInput
            style={styles.textInput}
            ref={'profession'}
            onChangeText={val => this.setState({profession: val})}
            onSubmitEditing={() => this.refs.company.focus()}
            defaultValue={this.state.profession}
            keyboardType="email-address"
            returnKeyType="done"
            placeholder="Profession"
            placeholderTextColor={Colors.placeHolderColor}
            selectionColor={Colors.notificationHeaderTextColor}
            maxLength={40}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText} children={'Company'} />
          <TextInput
            style={styles.textInput}
            ref={'company'}
            onChangeText={val => this.setState({company: val})}
            onSubmitEditing={() => this.saveUserDetails()}
            defaultValue={this.state.company}
            keyboardType="email-address"
            returnKeyType="done"
            placeholder="Company"
            placeholderTextColor={Colors.placeHolderColor}
            selectionColor={Colors.notificationHeaderTextColor}
            maxLength={40}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.saveUserDetails();
          }}
          activeOpacity={0.5}
        >
          <Text style={styles.saveButtonStyle} children={'SAVE DETAILS'} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {isUpdatingProfile} = this.props.UpdateUserDetailReducer;
    const {updatingProfilePic} = this.props.UpdateUserImageReducer;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Toast ref="toast" />

          <View style={styles.profileHeaderTextStyle}>
            <FeatherIcon
              style={styles.backIconStyle}
              onPress={() => this.props.navigation.goBack()}
              color={Colors.loginTextColor}
              size={Dimens.thirtyFive}
              name={'chevron-left'}
            />
          </View>
          <ScrollView style={{flex: 1}}>
            <View style={styles.mainHeadingContainer}>
              <BoxShadow inset={true} side={'top'} setting={shadowOpt}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.headingContainer]}
                >
                  <Text
                    style={styles.headerTextStyle}
                    children={'My Profile'}
                  />
                </TouchableOpacity>
              </BoxShadow>

              {this.renderDetailsView()}

              <BoxShadow inset={true} side={'top'} setting={shadowOpt}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.headingContainer]}
                >
                  <Text
                    style={styles.headerTextStyle}
                    children={'Additional Details'}
                  />
                </TouchableOpacity>
              </BoxShadow>

              {this.renderAdditionalInformation()}
            </View>
          </ScrollView>

          {(isUpdatingProfile || updatingProfilePic) && <Loader />}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    UpdateUserDetailReducer: state.UpdateUserDetailReducer,
    UpdateUserImageReducer: state.UpdateUserImageReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserDetail: (userID, jsonObj) => {
      dispatch(updateUserDetail(userID, jsonObj));
    },
    initializeProfileReducer: () => {
      dispatch(initializeProfileReducer());
    },
    updateProfilePic: (userID, formData) => {
      dispatch(updateProfilePic(userID, formData));
    },
  };
};

const initializeProfileReducer = () => {
  return {
    type: constants.INITIALIZE_PROFILE_REDUCER,
  };
};
const updateProfilePic = (userID, formData) => {
  return {
    type: constants.UPDATING_USER_IMAGE,
    userID,
    formData,
  };
};

const updateUserDetail = (userID, jsonObj) => {
  return {
    type: constants.UPDATING_USER_PROFILE,
    userID,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileScreen);
