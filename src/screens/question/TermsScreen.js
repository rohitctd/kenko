import React, {PureComponent} from 'react';
import {View, Linking, TouchableOpacity, Dimensions, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNSwipeVerify from 'react-native-swipe-verify';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import * as constants from '../../utils/Constants';
import NetInfo from '@react-native-community/netinfo';
import styles from './Style';
import {Dimens, Colors, Fonts} from '../../utils/Theme';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Loader from '../../component/Loader';
import Toast, {DURATION} from 'react-native-easy-toast';

const {width, height} = Dimensions.get('window');

class TermsScreen extends PureComponent {
  static navigationOptions = {
    header: null,
  };

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
        global.accessToken = JSON.parse(value).token;
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
            <Text style={styles.nameStyle} children={fullName} />
          </View>
        </View>

        <View
          style={{
            height: '100%',
            marginTop: Dimens.thirty,
            paddingHorizontal: Dimens.twenty,
            backgroundColor: Colors.white,
            borderTopLeftRadius: Dimens.fifteen,
            borderTopRightRadius: Dimens.fifteen,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Text
            style={{
              marginHorizontal: Dimens.twentyFive,
              marginTop: Dimens.seventy,
              color: '#6d7278',
              fontSize: Dimens.twentyTwo,
              fontFamily: Fonts.SourceSansProRegular,
              textAlign: 'justify',
            }}
          >
            • I agree to allow "Kenko" to collect and use my health and other
            data as outlined in the
            <Text
              onPress={() =>
                Linking.openURL(
                  'https://www.web.kenko-health.in/privacy-policy'
                )
              }
              style={{color: '#8bb7d8', fontFamily: Fonts.SourceSansProRegular}}
              children={' Privacy Policy.'}
            />
          </Text>

          <View
            style={{
              height: '10%',
              width: '100%',
              marginTop: widthPercentageToDP(75),
            }}
          >
            <RNSwipeVerify
              ref={'swipeView'}
              borderRadius={Dimens.hundred}
              width={width - Dimens.hundred}
              style={{marginTop: Dimens.sixteen}}
              buttonSize={Dimens.sixty}
              buttonColor="#733FDC"
              backgroundColor="#e0d3fc"
              okButton={{visible: true, duration: 300}}
              onVerified={() => {
                AsyncStorage.setItem('TERMS_SCREEN', 'Yes');
                this.props.navigation.navigate('AskQuestion', {
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
                  color={'#fff'}
                />
              }
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: Dimens.eighteen,
                  padding: Dimens.ten,
                  borderRadius: Dimens.twenty,
                  marginHorizontal: Dimens.ten,
                  color: '#733FDC',
                  fontFamily: Fonts.SourceSansProBold,
                }}
                children={'Start'}
              />
            </RNSwipeVerify>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {updatingProfilePic} = this.props.UpdateUserImageReducer;

    return (
      <View style={styles.container}>
        {this.renderProfileView()}
        <Toast ref="toast" />

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
)(TermsScreen);
