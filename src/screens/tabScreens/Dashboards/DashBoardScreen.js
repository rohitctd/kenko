import React, {PureComponent} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import {BoxShadow} from 'react-native-shadow';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import RNSwipeVerify from 'react-native-swipe-verify';
import ImagePicker from 'react-native-image-picker';

import {Colors, Dimens, shadowOpt, Fonts} from '../../../utils/Theme';
import styles from './styles';
import * as constants from '../../../utils/Constants';
import Loader from '../../../component/Loader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
const {width} = Dimensions.get('window');

const dashBoardArr = [
  {
    id: 1,
    title: 'My Kenko',
  },
  {
    id: 2,
    title: 'Health Profile',
  },
  // {
  //   id: 3,
  //   title: 'Sum Insured Eligibility',
  // },
  {
    id: 4,
    title: 'Recent Activity',
  },
];

class DashBoardScreen extends PureComponent {
  constructor(props) {
    super(props);

    StatusBar.setHidden(false);
    this.state = {
      internetConnected: false,
      kenko: true,
      health: false,
      sum: false,
      avatarSource: '',
      userDetail: {
        id: '',
        addressLine1: '',
        addressLine2: '',
        age: '',
        city: '',
        company: '',
        kenkoCreditScore: '',
        dob: '',
        email: '',
        fname: '',
        gender: '',
        profileStatus: '',
        kenkoCredits: '',
        kenkoScore: '',
        lname: '',
        martialStatus: '',
        mobileNumber: '',
        profession: '',
        regionCode: '',
        appNotificationStatus: false,
        emailNotificationStatus: false,
        state: '',
        sumInsured: '',
        profileImage: '',
      },
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.dashBoardBackground);
    });

    AsyncStorage.getItem('LoginResponse')
      .then(value => {
        global.accessToken = JSON.parse(value).token;

        this.setState({userDetail: JSON.parse(value).data[0]}, () => {
          NetInfo.isConnected.fetch().done(isConnected => {
            if (!isConnected) {
              this.refs.toast.show(
                'No internet connection',
                DURATION.LENGTH_SHORT
              );
              return;
            }
            this.props.getUserDetails(this.state.userDetail.id);
            this.props.dashboardDetail(this.state.userDetail.id);
          });
        });
      })
      .catch(e => console.log(e));

    this.blurListener = this.props.navigation.addListener('didBlur', () => {
      if (this.refs.healthSwipe) this.refs.healthSwipe.reset();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
    if (this.blurListener) {
      this.blurListener.remove();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {userdata} = nextProps.UserDetailReducer;
    const {
      updateProfilePic,
      UpdatingFailure,
    } = nextProps.UpdateUserImageReducer;

    if (UpdatingFailure) {
      return {
        avatarSource: '',
      };
    }

    if (userdata) {
      return {userDetail: userdata};
    }
    return null;
  }

  showSelectedView = viewName =>
    this.setState({
      kenko: false,
      health: false,
      sum: false,
      [viewName]: true,
    });

  getBackgroundColor = id => {
    let color = '';
    let textColor = '';
    switch (id) {
      case 1:
        textColor = Colors.white;
        color = Colors.kenkoBackground;
        break;
      case 2:
        textColor = Colors.white;
        color = Colors.profileBackgroundColor;
        break;
      case 3:
        textColor = Colors.white;
        color = Colors.insureBackground;
        break;
      case 4:
      default:
        textColor = Colors.black;
        color = Colors.notificationHeaderBackground;
        break;
    }
    return {color: color, textColor: textColor};
  };

  headerClickType = type => {
    const {dashboardDetail} = this.props.DashboardReducer;

    switch (type) {
      case 'My Kenko':
        this.showSelectedView('kenko');
        break;

      case 'Health Profile':
        this.showSelectedView('health');
        break;

      case 'Sum Insured Eligibility':
        this.showSelectedView('sum');
        break;

      case 'Recent Activity':
        if (dashboardDetail.data[0].recentactivity.length > 0)
          this.showSelectedView('recent');
        break;

      default:
        this.showSelectedView('recent');
        break;
    }
  };

  renderKenko = dashboardDetail => {
    const {userDetail} = this.state;
    let recentactivity = dashboardDetail.data[0].recentactivity;

    return (
      <View style={styles.kenkoContainer}>
        <View style={styles.countStyle}>
          <Text
            onPress={() => {
              this.props.navigation.navigate('KenkoScoreScreen', {
                scoreValue:
                  userDetail.kenkoScore != null &&
                  userDetail.kenkoScore != undefined &&
                  userDetail.kenkoScore != ''
                    ? userDetail.kenkoScore
                    : 0,
                recentactivity: recentactivity,
              });
            }}
            style={styles.countTextStyle}
            children={
              userDetail.kenkoScore != null &&
              userDetail.kenkoScore != undefined &&
              userDetail.kenkoScore != ''
                ? userDetail.kenkoScore
                : 0
            }
          />
          <Text style={styles.countDetailStyle} children={'KENKO SCORE'} />
        </View>
        <View style={styles.countStyle}>
          <Text
            onPress={() => {
              this.props.navigation.navigate('KenkoCreditScreen', {
                creditValue:
                  userDetail.kenkoCredits != null &&
                  userDetail.kenkoCredits != undefined &&
                  userDetail.kenkoCredits != ''
                    ? userDetail.kenkoCredits
                    : 0,
                recentactivity: recentactivity,
              });
            }}
            style={styles.countTextStyle}
            children={
              userDetail.kenkoCredits != null &&
              userDetail.kenkoCredits != undefined &&
              userDetail.kenkoCredits != ''
                ? userDetail.kenkoCredits
                : 0
            }
          />
          <Text style={styles.countDetailStyle} children={'KENKO CREDITS'} />
        </View>
      </View>
    );
  };

  renderHealth = dashboardDetail => {
    let healthprofile = dashboardDetail.data[0].healthprofile;
    return healthprofile != '' &&
      healthprofile != null &&
      healthprofile != undefined ? (
      <View style={styles.healthContainer}>
        <View style={styles.itemStyle}>
          <View style={styles.leftContainer}>
            <Text
              style={styles.dateStyle}
              children={moment
                .unix(parseInt(healthprofile[0].date._seconds))
                .format('DD MMM, YYYY')}
            />
            <Text style={styles.signStyle} children={healthprofile[0].title} />
            <Text
              style={styles.detailStyle}
              children={healthprofile[0].description}
            />
          </View>

          <Icon
            onPress={() =>
              this.props.navigation.navigate('HealthDetailScreen', {
                healthDetailList: healthprofile,
              })
            }
            style={styles.iconStyle}
            name={'chevron-right'}
            color={Colors.white}
            size={Dimens.twentyFive}
          />
        </View>
        <View
          style={{
            paddingHorizontal: Dimens.fifteen,
            paddingVertical: Dimens.twentySeven,
          }}
        >
          <RNSwipeVerify
            ref={'healthSwipe'}
            borderRadius={Dimens.hundred}
            width={width - Dimens.hundred}
            style={{marginTop: Dimens.ten}}
            buttonSize={Dimens.fifty}
            borderColor={Colors.healthItemBackground}
            buttonColor={Colors.profileBackgroundColor}
            backgroundColor={Colors.healthItemBackground}
            okButton={{visible: true, duration: 500}}
            onVerified={() => {
              this.props.navigation.navigate('ComingSoon');
            }}
            icon={
              <Image
                source={require('../../../assets/swipebutton.png')}
                style={{
                  width: Dimens.twentyFive,
                  height: Dimens.twentyFive,
                }}
              />
            }
          >
            <Text
              style={styles.swipeButtonStyle}
              children={'Recommended Improvement plan'}
            />
          </RNSwipeVerify>
        </View>
      </View>
    ) : (
      <View style={styles.nohealthContainer}>
        <Text
          style={styles.noHealthDataStyle}
          children={'No Health Data yet!'}
        />
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id.toString();

  renderRecentActivity = dashboardDetail => {
    let recentactivity = dashboardDetail.data[0].recentactivity;
    return (
      <FlatList
        scrol
        style={{
          height:
            recentactivity.length <= 0
              ? heightPercentageToDP(50)
              : heightPercentageToDP(75),
        }}
        nestedScrollEnabled={true}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderRecentActivities}
        data={recentactivity}
        ListEmptyComponent={this._recentDataEmptyConatiner}
      />
    );
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

  _recentDataEmptyConatiner = () => {
    return (
      <View
        style={[styles.nohealthContainer, {height: heightPercentageToDP(45)}]}
      >
        <Text
          style={[
            styles.noHealthDataStyle,
            {marginTop: Dimens.oneFifty, color: Colors.green},
          ]}
          children={'No Recent Activity Data yet!'}
        />
      </View>
    );
  };

  _renderRecentActivities = data => {
    let item = data.item;

    let typeColor =
      item.actionType == 'Redeemed'
        ? '#F7B500'
        : item.actionType == 'earn'
        ? Colors.insureBackground
        : '#ed6132';
    let typeSign = item.actionType == 'earn' ? '+' : '-';

    return (
      <View style={styles.recentItemStyle}>
        <View style={styles.recentLeftContainer}>
          <Text
            style={styles.dateRecentStyle}
            children={moment
              .unix(parseInt(item.date._seconds))
              .format('DD MMM, YYYY')}
          />
          <Text style={styles.titleStyle} children={item.title} />
          <Text style={styles.recentDetailStyle} children={item.description} />
        </View>

        <View style={[styles.recentRightContainer]}>
          <Text
            style={[styles.typeStyle, {backgroundColor: typeColor}]}
            children={this.Capitalize(item.actionType)}
          />

          <Text
            style={[styles.pointStyle]}
            children={typeSign + item.kenkoPoints + ' points'}
          />
          <Text
            style={styles.closingBalanceStyle}
            children={'Closing balance ' + item.closing_balance}
          />
        </View>
      </View>
    );
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  //To show on whole Screen
  dashBoardView = () => {
    const {kenko, health, sum, recent} = this.state;
    const {dashboardDetail} = this.props.DashboardReducer;

    return dashBoardArr.map((item, index) => {
      let colors = this.getBackgroundColor(item.id).color;
      let textColor = this.getBackgroundColor(item.id).textColor;
      return (
        <View
          key={item.id.toString()}
          style={[
            styles.notificationDetailContainer,
            {
              backgroundColor: colors,
              marginTop: index == 0 ? 0 : -Dimens.fifteen,
            },
          ]}
        >
          {/* <BoxShadow inset={true} side={"top"} setting={shadowOpt}> */}
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => {
              this.headerClickType(item.title);
            }}
            style={{justifyContent: 'space-between', flexDirection: 'row'}}
          >
            <Text
              style={[styles.notificationHeaderStyle, {color: textColor}]}
              children={item.title}
            />
            {item.id == 3 && (
              <Text
                style={[styles.notificationHeaderStyle, {color: textColor}]}
                children={
                  '\u20B9 ' +
                  (dashboardDetail[0].globalSettings.length > 0
                    ? dashboardDetail[0].globalSettings[0].goalScore
                    : '0')
                }
              />
            )}
          </TouchableOpacity>
          {/* </BoxShadow> */}

          {item.id == 1 && kenko ? this.renderKenko(dashboardDetail) : null}
          {item.id == 2 && health ? this.renderHealth(dashboardDetail) : null}
          {item.id == 4 ? this.renderRecentActivity(dashboardDetail) : null}
        </View>
      );
    });
  };

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
          source={require('../../../assets/profilePic.jpeg')}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
    }
  }

  render() {
    const {userDetail} = this.state;
    const {isFetching} = this.props.DashboardReducer;
    const {updatingProfilePic} = this.props.UpdateUserImageReducer;

    return (
      <View style={styles.container}>
        <Toast ref="toast" />
        {(isFetching || updatingProfilePic) && <Loader />}
        <View style={styles.headerTextStyle}>
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
            <Text
              style={styles.nameStyle}
              children={
                (userDetail.fname != null &&
                userDetail.fname != undefined &&
                userDetail.fname != ''
                  ? userDetail.fname
                  : '') +
                ' ' +
                (userDetail.lname != null &&
                userDetail.lname != undefined &&
                userDetail.lname != ''
                  ? userDetail.lname
                  : '')
              }
            />
          </View>
        </View>
        <ScrollView
          nestedScrollEnabled={true}
          style={styles.mainHeadingContainer}
        >
          {this.dashBoardView()}
        </ScrollView>
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
    getUserDetails: id => {
      dispatch(getUserDetails(id));
    },
    dashboardDetail: jsonObj => {
      dispatch(dashboardDetail(jsonObj));
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

const dashboardDetail = jsonObj => {
  return {
    type: constants.FETCHING_DASHBOARD,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoardScreen);
