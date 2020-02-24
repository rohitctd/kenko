import React, {PureComponent} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNSwipeVerify from 'react-native-swipe-verify';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import * as constants from '../../utils/Constants';
import Loader from '../../component/Loader';
import NetInfo from '@react-native-community/netinfo';
import Toast, {DURATION} from 'react-native-easy-toast';

import styles from './Style';
import {Dimens, Colors, Fonts} from '../../utils/Theme';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

class Permission extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      avatarSource: '',
      userId: '',
      imageData: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      updateProfilePic,
      UpdatingFailure,
    } = nextProps.UpdateUserImageReducer;

    if (UpdatingFailure) {
      return {
        avatarSource: prevState.avatarSource,
      };
    }

    if (updateProfilePic && prevState.userDetail) {
      let user = prevState.userDetail;
      user.data[0].profileImage = prevState.avatarSource;
      AsyncStorage.setItem('LoginResponse', JSON.stringify(user));
    }
    return null;
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.refs.swipeView.reset();
    });

    AsyncStorage.getItem('LoginResponse')
      .then(value => {
        this.setState({
          userDetail: JSON.parse(value),
          fullName: JSON.parse(value).data[0].fname,
          avatarSource: JSON.parse(value).data[0].profileImage,
          userId: JSON.parse(value).data[0].id,
        });
      })
      .catch(e => console.log(e));
  }

  componentWillUnmount() {
    this.focusListener.remove();
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
            this.props.updateProfilePic(this.state.userId, formData);
          }
        );
      }
    });
  }

  loadProfilePic() {
    const {avatarSource} = this.state;
    if (
      avatarSource == '' ||
      avatarSource == null ||
      avatarSource == undefined
    ) {
      return (
        <FastImage
          style={styles.ProfilePic}
          source={require('../../assets/profilePic.jpeg')}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
    } else {
      return (
        <FastImage
          style={styles.ProfilePic}
          source={{uri: avatarSource}}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
    }
  }

  //To show on whole Screen
  renderProfileView() {
    const {fullName} = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainerStyle}>
          <TouchableOpacity
            onPress={() => {
              NetInfo.isConnected.fetch().done(isConnected => {
                if (!isConnected) {
                  this.refs.toast.show(
                    'No internet connection!',
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
            <Text style={styles.nameStyle} children={fullName} />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: '100%',
            marginTop: Dimens.thirty,
            paddingHorizontal: Dimens.twenty,
            backgroundColor: Colors.white,
            borderTopLeftRadius: Dimens.fifteen,
            borderTopRightRadius: Dimens.fifteen,
            overflow: 'hidden',
          }}
        >
          <ScrollView style={{flex: 1, paddingBottom: Dimens.hundred}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  marginTop: Dimens.fourty,
                  marginHorizontal: Dimens.fifteen,
                  color: '#6d7278',
                  fontSize: Dimens.twenty,
                  fontFamily: Fonts.SourceSansProRegular,
                  textAlign: 'justify',
                }}
                children={
                  '- I agree that the above-mentioned information is true and correct. I further provide consent and authorize Kenko Health Tech and/or any of its authorized representatives to seek medical information from any hospital/consultant/diagnostic centre that I have contacted or may contact or confer with in future concerning any disease or illness or injury.'
                }
              />
              <Text
                style={{
                  marginTop: Dimens.twenty,
                  marginHorizontal: Dimens.fifteen,
                  color: '#6d7278',
                  fontSize: Dimens.twenty,
                  fontFamily: Fonts.SourceSansProRegular,
                  textAlign: 'justify',
                }}
                children={
                  '- The information provided will be the basis of subscription of this hospital discount scheme. I have read & understood the full terms, conditions & benefits of this subscription scheme.'
                }
              />

              <View
                style={{
                  height: '10%',
                  width: '100%',
                  marginTop:
                    DeviceInfo.getDeviceType() === 'Tablet' || Platform.isPad
                      ? widthPercentageToDP(40)
                      : widthPercentageToDP(20),
                }}
              >
                <RNSwipeVerify
                  ref={'swipeView'}
                  borderRadius={Dimens.hundred}
                  width={width - Dimens.hundred}
                  style={{marginTop: Dimens.ten}}
                  buttonSize={Dimens.sixty}
                  borderColor="#fff"
                  buttonColor="#8c52ff"
                  backgroundColor="#ececec"
                  okButton={{visible: true, duration: 300}}
                  onVerified={() => {
                    AsyncStorage.setItem('PERMISSION', 'Yes');
                    this.props.navigation.navigate('ScoreFetched');
                  }}
                  icon={
                    <Image
                      source={require('../../assets/swipebutton.png')}
                      style={{
                        width: Dimens.twentyFive,
                        height: Dimens.twentyFive,
                      }}
                    />
                  }
                >
                  <Text style={styles.swipeButtonStyle} children={'Allow'} />
                </RNSwipeVerify>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  render() {
    const {updatingProfilePic} = this.props.UpdateUserImageReducer;

    return (
      <View style={styles.container}>
        <Toast ref="toast" />

        {this.renderProfileView()}
        {updatingProfilePic && <Loader />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    DashboardReducer: state.DashboardReducer,
    UserDetailReducer: state.UserDetailReducer,
    UpdateUserImageReducer: state.UpdateUserImageReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Permission);
