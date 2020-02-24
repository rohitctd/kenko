import React from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import * as constants from '../../utils/Constants';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-picker';
import Toast, {DURATION} from 'react-native-easy-toast';

import {Dimens, isIphoneXorAbove, Colors, Fonts} from '../../utils/Theme';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../component/Loader';
const {height} = Dimensions.get('window');

class ScoreFetched extends React.PureComponent {
  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      kenkoPoints: 0,
      fullName: '',
      userDetail: {
        id: '',
        addressLine1: '',
        addressLine2: '',
        age: '',
        city: '',
        company: '',
        kenkoCreditScore: 0,
        dob: '',
        email: '',
        fname: '',
        gender: '',
        profileStatus: '',
        kenkoCredits: 0,
        kenkoScore: 0,
        lname: '',
        martialStatus: '',
        mobileNumber: '',
        profession: '',
        regionCode: '',
        appNotificationStatus: false,
        emailNotificationStatus: false,
        state: '',
        sumInsured: '',
      },
      avatarSource: '',
    };
  }

  componentDidMount() {
    this.StartImageRotateFunction();
    let reference = this;
    AsyncStorage.getItem('LoginResponse')
      .then(value => {
        let response = JSON.parse(value);
        global.accessToken = response.token;

        reference.setState(
          {
            userDetail: response.data[0],
            kenkoPoints:
              response.data[0].kenkoScore != ''
                ? parseInt(response.data[0].kenkoScore)
                : 0,
            fullName: response.data[0].fname,
          },
          () => {
            NetInfo.isConnected.fetch().done(isConnected => {
              if (!isConnected) {
                this.refs.toast.show(
                  'No internet connection',
                  DURATION.LENGTH_SHORT
                );
                return;
              }
              this.props.getUserDetails(reference.state.userDetail.id);
            });
          }
        );
      })
      .catch(e => console.log(e));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {userdata} = nextProps.UserDetailReducer;

    const {UpdatingFailure} = nextProps.UpdateUserImageReducer;

    if (UpdatingFailure) {
      return {
        avatarSource: '',
      };
    }

    if (userdata.kenkoScore != '' && userdata.kenkoScore > 0) {
      setTimeout(() => {
        AsyncStorage.setItem('SCORE_FETCHED', 'Yes');
        nextProps.navigation.navigate('TabNavigation');
      }, 100);
      return null;
    }

    if (userdata) {
      return {userDetail: userdata};
    }

    return null;
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(() => this.StartImageRotateFunction());
  }

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

  loadProfilePic() {
    const {avatarSource, userDetail} = this.state;
    if (
      avatarSource != '' &&
      avatarSource != null &&
      avatarSource != undefined
    ) {
      return (
        <FastImage
          style={styles.ProfilePic}
          source={{uri: avatarSource}}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
    } else if (
      userDetail.profileImage != '' &&
      userDetail.profileImage != null &&
      userDetail.profileImage != undefined
    ) {
      return (
        <FastImage
          style={styles.ProfilePic}
          source={{uri: userDetail.profileImage}}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
    } else {
      return (
        <FastImage
          style={styles.ProfilePic}
          source={require('../../assets/profilePic.jpeg')}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
    }
  }

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const RotateInnerData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '0deg'],
    });
    const {isFetching} = this.props.UserDetailReducer;
    const {updatingProfilePic} = this.props.UpdateUserImageReducer;

    return (
      <View style={styles.MainContainer}>
        {(isFetching || updatingProfilePic) && (
          <Loader loaderStyle={{elevation: Dimens.eleven}} />
        )}
        <Toast ref="toast" />

        <View style={styles.headerContainerStyle}>
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
            {this.loadProfilePic()}
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.goodMrngStyle} children={'Hello'} />
            <Text style={styles.nameStyle} children={this.state.fullName} />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: height,
            marginTop: Dimens.thirty,
            paddingHorizontal: Dimens.twenty,
            backgroundColor: Colors.white,
            borderTopLeftRadius: Dimens.fifteen,
            borderTopRightRadius: Dimens.fifteen,
            overflow: 'hidden',
          }}
        >
          <Text
            style={{
              marginHorizontal: Dimens.fifteen,
              marginTop: wp(20),
              color: '#2e2e2e',
              fontSize: Dimens.twenty,
              fontFamily: Fonts.SourceSansProBold,
              textAlign: 'center',
            }}
            children={
              'We will be back with your score soon.' + '\n' + 'Stay Healthy!'
            }
          />

          <Animated.Image
            style={{
              marginLeft: wp('6.66%'),
              marginRight: wp('6.66%'),
              alignSelf: 'center',
              width: Dimens.twoFifty,
              marginTop: Dimens.fifty,
              height: Dimens.twoFifty,
              transform: [{rotate: RotateData}],
            }}
            source={require('../../assets/Oval.png')}
          ></Animated.Image>

          <Animated.Image
            style={{
              marginTop: -Dimens.twoTwentyFive,
              alignSelf: 'center',
              width: Dimens.twoHundred,
              height: Dimens.twoHundred,
              transform: [{rotate: RotateInnerData}],
            }}
            source={require('../../assets/Oval2.png')}
          ></Animated.Image>

          <Animated.Image
            style={{
              marginTop: -Dimens.oneSeventyFive,
              alignSelf: 'center',
              width: Dimens.oneFifty,
              height: Dimens.oneFifty,
              transform: [{rotate: RotateData}],
            }}
            source={require('../../assets/Oval3.png')}
          ></Animated.Image>

          <Text
            style={{
              marginTop: Dimens.hundred,
              width: '90%',
              alignSelf: 'center',
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.5)',
              fontFamily: Fonts.SourceSansProSemibold,
              fontSize: Dimens.eighteen,
            }}
            children={'Approximately 36 hours left'}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    UserDetailReducer: state.UserDetailReducer,
    UpdateUserImageReducer: state.UpdateUserImageReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: id => {
      dispatch(getUserDetails(id));
    },
    updateProfilePic: (userID, formData) => {
      dispatch(updateProfilePic(userID, formData));
    },
  };
};

const updateProfilePic = (userID, formData) => {
  return {
    type: constants.UPDATING_USER_IMAGE,
    userID,
    formData,
  };
};

const getUserDetails = id => {
  return {
    type: constants.GETTING_USER_DETAIL,
    id,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreFetched);

const styles = StyleSheet.create({
  MainContainer: {flex: 1, backgroundColor: '#8c52ffff'},
  headerContainerStyle: {
    marginVertical: Dimens.fifteen,
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.sixtyFive
          : Dimens.thirtyFive
        : Dimens.thirty,
    paddingHorizontal: Dimens.twenty,
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: Dimens.fifteen,
  },
  goodMrngStyle: {
    color: Colors.profileHeadingTextColor,
    fontSize: Dimens.twenty,
    fontFamily: Fonts.SourceSansProRegular,
  },
  ProfilePic: {
    height: Dimens.seventy,
    width: Dimens.seventy,
    borderRadius: Dimens.thirtyFive,
  },

  nameStyle: {
    color: Colors.profileHeadingTextColor,
    fontSize: Dimens.twentySeven,
    fontFamily: Fonts.SourceSansProSemibold,
  },
});
