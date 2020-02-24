import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
  StatusBar,
  Linking,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {BoxShadow} from 'react-native-shadow';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
import RNSwipeVerify from 'react-native-swipe-verify';
import Toast, {DURATION} from 'react-native-easy-toast';
import moment from 'moment';

import {auth} from '../../../firebase/Firebase';

import styles from './styles';
import {Dimens, Colors, shadowOpt, Fonts} from '../../../utils/Theme';
import * as constants from '../../../utils/Constants';
import Loader from '../../../component/Loader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import deviceInfoModule from 'react-native-device-info';

const {width} = Dimensions.get('window');
let notificationselected = '';

const profileArr = [
  {
    id: 1,
    title: 'Recent Activity',
  },
  {
    id: 2,
    title: 'My Profile',
  },
  {
    id: 3,
    title: 'My Address',
  },
  {
    id: 4,
    title: 'Customer Support',
  },
  {
    id: 5,
    title: 'Settings',
  },
  {
    id: 6,
    title: 'Privacy Policy',
  },
  {
    id: 7,
    title: 'Sign Out',
  },
];

class ProfileScreen extends PureComponent {
  state = {
    internetConnected: false,
    recentActivity: true,
    profile: false,
    address: false,
    support: false,
    setting: false,
    privacy: false,
    appNotification: false,
    emailNotification: false,
    settingUpdation: false,
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

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.profileBackgroundColor);
      NetInfo.isConnected.fetch().done(isConnected => {
        if (!isConnected) {
          this.refs.toast.show('No internet connection', DURATION.LENGTH_SHORT);
          return;
        }
        this.setState({settingUpdation: false}, () =>
          this.props.getUserDetails(this.state.userDetail.id)
        );
      });
    });

    this.blurListener = this.props.navigation.addListener('didBlur', () => {
      if (this.refs.profileSwipeView) this.refs.profileSwipeView.reset();
      if (this.refs.addressSwipeView) this.refs.addressSwipeView.reset();
      if (this.refs.settingSwipeView) this.refs.settingSwipeView.reset();
    });

    AsyncStorage.getItem('LoginResponse')
      .then(value => {
        let valueOfResponse = JSON.parse(value);
        global.accessToken = valueOfResponse.token;
        this.setState({
          userDetail: valueOfResponse.data[0],
          appNotification: !(
            valueOfResponse.data[0].appNotificationStatus == null ||
            valueOfResponse.data[0].appNotificationStatus == undefined ||
            valueOfResponse.data[0].appNotificationStatus == ''
          ),
          emailNotification: !(
            valueOfResponse.data[0].emailNotificationStatus == null ||
            valueOfResponse.data[0].emailNotificationStatus == undefined ||
            valueOfResponse.data[0].emailNotificationStatus == ''
          ),
        });
      })
      .catch(e => console.log(e));
  }

  componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener.remove();
    }
    if (this.blurListener) {
      this.blurListener.remove();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {notificationUpdatingError} = nextProps.UpdateUserSettingReducer;
    const {userdata} = nextProps.UserDetailReducer;
    const {didLogout} = nextProps.AuthReducer;

    if (notificationUpdatingError) {
      return {
        appNotification:
          notificationselected == 'appNotification'
            ? !prevState.appNotification
            : prevState.appNotification,
        emailNotification:
          notificationselected == 'emailNotification'
            ? !prevState.emailNotification
            : prevState.emailNotification,
      };
    }

    if (userdata && !prevState.settingUpdation) {
      return {
        userDetail: userdata,
        appNotification: !(
          userdata.appNotificationStatus == null ||
          userdata.appNotificationStatus == undefined ||
          userdata.appNotificationStatus == ''
        ),
        emailNotification: !(
          userdata.emailNotificationStatus == null ||
          userdata.emailNotificationStatus == undefined ||
          userdata.emailNotificationStatus == ''
        ),
      };
    }

    if (didLogout) {
      auth.signOut();
      nextProps.navigation.navigate('AuthNavigator');
    }

    // if(){
    //   nextProps.getUserDetails(prevState.userDetail.id);
    // }

    return null;
  }

  renderViewAccordingToHeading = headingText => {
    return (
      <View style={styles.innerViewContainer}>
        <Text style={styles.headerTextStyle} children={headingText} />
      </View>
    );
  };

  // renderOrderView = () => {
  //   const {userOrders} = this.props.OrderReducer;

  //   return userOrders.data != null &&
  //     userOrders.data != undefined &&
  //     userOrders.data.length > 0 ? (
  //     <View style={styles.orderContainer}>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           paddingHorizontal: Dimens.ten,
  //         }}
  //       >
  //         <Text
  //           style={styles.orderNumberStyle}
  //           children={'Order Ref No ' + userOrders.data[0].kenkoOrderId}
  //         />
  //         <Text
  //           style={styles.orderNumberStyle}
  //           children={'04:45PM 22 Jan,2019'}
  //         />
  //       </View>
  //       <Text
  //         style={styles.redeemPointStyle}
  //         children={
  //           'Redeemed ' +
  //           userOrders.data[0].kenkoCredits +
  //           ' and paid ' +
  //           '\u20B9' +
  //           userOrders.data[0].txnAmt
  //         }
  //       />

  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'flex-start',
  //           alignItems: 'center',
  //           alignContent: 'center',
  //         }}
  //       >
  //         <FastImage
  //           style={{
  //             width: Dimens.fifty,
  //             height: Dimens.fifty,
  //             borderRadius: Dimens.twentyFive,
  //             //backgroundColor: "red",
  //             marginHorizontal: Dimens.five,
  //           }}
  //           source={require('../../../assets/profilePic.jpeg')}
  //           resizeMode={FastImage.resizeMode.contain}
  //         />
  //         <Text
  //           style={styles.planTextStyle}
  //           children={'1mg Diabetes Care Plan'}
  //         />
  //       </View>

  //       <TouchableOpacity
  //         style={styles.nextButtonContainer}
  //         onPress={() =>
  //           this.props.navigation.navigate('OrderListScreen', {
  //             recentActivity: userOrders.data,
  //           })
  //         }
  //         activeOpacity={0.5}
  //       >
  //         <Text style={styles.iconText} children={'View all'} />
  //         <Icon
  //           color={Colors.profileBackgroundColor}
  //           size={Dimens.twentyTwo}
  //           name={'arrowright'}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   ) : (
  //     <View style={[[styles.orderContainer, {height: Dimens.twoHundred}]]}>
  //       <Text
  //         style={{
  //           textAlign: 'center',
  //           fontSize: Dimens.twentyTwo,
  //           fontFamily: Fonts.SourceSansProSemibold,
  //           color: Colors.textHeadingColor,
  //           marginTop: Dimens.fifty,
  //         }}
  //         children={'No recentActivity yet!'}
  //       />
  //     </View>
  //   );
  // };

  renderRecentActivityView = data => {
    const {dashboardDetail} = this.props.DashboardReducer;
    let recentactivity = dashboardDetail.data[0].recentactivity;
    let value =
      recentactivity != '' &&
      recentactivity != null &&
      recentactivity != undefined
        ? recentactivity
        : '';

    let typeSign = '';
    let typeColor = '';
    if (value) {
      typeColor =
        value[0].actionType == 'Redeemed'
          ? '#F7B500'
          : value[0].actionType == 'earn'
          ? Colors.insureBackground
          : '#ed6132';
      typeSign = value[0].actionType == 'earn' ? '+' : '-';
    }

    return value ? (
      <View style={styles.itemContainer}>
        <View style={styles.recentItemStyle}>
          <View style={styles.recentLeftContainer}>
            <Text
              style={styles.dateRecentStyle}
              children={moment
                .unix(parseInt(value[0].date._seconds))
                .format('DD MMM, YYYY')}
            />
            <Text style={styles.titleStyle} children={value[0].title} />
            <Text
              style={styles.recentDetailStyle}
              children={value[0].description}
            />
          </View>

          <View style={[styles.recentRightContainer]}>
            <Text
              style={[styles.typeStyle, {backgroundColor: typeColor}]}
              children={this.Capitalize(value[0].actionType)}
            />

            <Text
              style={[styles.pointStyle]}
              children={typeSign + value[0].kenkoPoints + ' points'}
            />
            <Text
              style={styles.closingBalanceStyle}
              children={'Closing balance ' + value[0].closing_balance}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.nextButtonContainer}
          onPress={() =>
            this.props.navigation.navigate('ActivityScreen', {
              recentActivities: value,
            })
          }
          activeOpacity={0.5}
        >
          <Text style={styles.iconText} children={'View all'} />
          <Icon
            color={Colors.profileBackgroundColor}
            size={Dimens.twentyTwo}
            name={'arrowright'}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.itemContainer}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: Dimens.twentyTwo,
            fontFamily: Fonts.SourceSansProSemibold,
            color: Colors.textHeadingColor,
            marginTop: heightPercentageToDP(15),
          }}
          children={'No Recent Activity yet!'}
        />
      </View>
    );
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  renderPrivacyPolicy = () => {
    return (
      <View style={styles.itemContainer}>
        <Text
          style={styles.privacyPolicyTextStyle}
          numberOfLines={4}
          children={
            'This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.'
          }
        />
        <Text
          style={styles.privacyPolicyTextStyle}
          numberOfLines={3}
          children={
            'If you choose to use our Service, then you agree to the collection and use of information in relation to this policy.'
          }
        />
        <TouchableOpacity
          style={styles.nextButtonContainer}
          onPress={() => this.props.navigation.navigate('PrivacyPolicyScreen')}
          activeOpacity={0.5}
        >
          <Text style={styles.iconText} children={'Read more'} />
          <Icon
            color={Colors.profileBackgroundColor}
            size={Dimens.twentyTwo}
            name={'arrowright'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderAddressView = () => {
    const {userDetail} = this.state;
    return (
      <View style={styles.itemContainer}>
        {/* {userDetail.addressLine1 != null &&
          userDetail.addressLine1 != undefined &&
          userDetail.addressLine1 != '' &&
          (userDetail.addressLine2 != null &&
            userDetail.addressLine2 != undefined &&
            userDetail.addressLine2 != '') &&
          (userDetail.city != null &&
            userDetail.city != undefined &&
            userDetail.city != '') &&
          (userDetail.regionCode != null &&
            userDetail.regionCode != undefined &&
            userDetail.regionCode != '') &&
          (userDetail.state != null &&
            userDetail.state != undefined &&
            userDetail.state != '') && ( */}
        <View style={styles.addressContainer}>
          <Text
            style={styles.addressStyle}
            children={
              userDetail.company != null &&
              userDetail.company != undefined &&
              userDetail.company != ''
                ? userDetail.company
                : ''
            }
          />
          <Text
            style={styles.addressStyle}
            children={
              userDetail.addressLine1 != null &&
              userDetail.addressLine1 != undefined &&
              userDetail.addressLine1 != ''
                ? userDetail.addressLine1
                : ''
            }
          />
          <Text
            style={styles.addressStyle}
            children={
              userDetail.addressLine2 != null &&
              userDetail.addressLine2 != undefined &&
              userDetail.addressLine2 != ''
                ? userDetail.addressLine2
                : ''
            }
          />
          <Text
            style={styles.addressStyle}
            children={
              (userDetail.city != null &&
              userDetail.city != undefined &&
              userDetail.city != ''
                ? userDetail.city
                : '') +
              (userDetail.regionCode != null &&
              userDetail.regionCode != undefined &&
              userDetail.regionCode != ''
                ? ' - ' + userDetail.regionCode
                : '')
            }
          />
          <Text
            style={styles.addressStyle}
            children={
              userDetail.state != null &&
              userDetail.state != undefined &&
              userDetail.state != ''
                ? userDetail.state
                : ''
            }
          />
        </View>
        {/* )} */}

        <View
          style={{
            height: '30%',
            paddingTop: Dimens.twenty,
            paddingHorizontal: Dimens.five,
          }}
        >
          <RNSwipeVerify
            ref={'addressSwipeView'}
            borderRadius={Dimens.hundred}
            width={width - Dimens.hundred}
            style={{marginTop: Dimens.ten}}
            buttonSize={Dimens.fifty}
            borderColor="#fff"
            buttonColor={Colors.profileBackgroundColor}
            backgroundColor={Colors.profileSwipeButtonColor}
            okButton={{visible: true, duration: 500}}
            onVerified={() => {
              this.props.navigation.navigate('AddressScreen', {
                AddressDetail: userDetail,
              });
            }}
            icon={
              <Image
                source={require('../../../assets/swipebutton.png')}
                style={{width: 22, height: 22}}
              />
            }
          >
            <Text
              style={styles.swipeButtonStyle}
              children={'Edit your address'}
            />
          </RNSwipeVerify>
        </View>
      </View>
    );
  };

  renderUserProfileView = () => {
    const {userDetail} = this.state;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.profileLabelStyle} children={'Your Name'} />
        <Text
          style={styles.profileValueStyle}
          children={userDetail.fname + ' ' + userDetail.lname}
        />
        <Text style={styles.profileLabelStyle} children={'Your Email ID'} />
        <Text
          style={styles.profileValueStyle}
          children={
            userDetail.email != null &&
            userDetail.email != undefined &&
            userDetail.email != ''
              ? userDetail.email
              : '-'
          }
        />
        <Text style={styles.profileLabelStyle} children={'Your Mobile No'} />
        <Text
          style={styles.profileValueStyle}
          children={
            userDetail.mobileNumber != null &&
            userDetail.mobileNumber != undefined &&
            userDetail.mobileNumber != ''
              ? userDetail.mobileNumber
              : '-'
          }
        />

        <View
          style={{
            height: '30%',
            paddingTop: Dimens.twenty,
            paddingHorizontal: Dimens.five,
          }}
        >
          <RNSwipeVerify
            ref={'profileSwipeView'}
            borderRadius={Dimens.hundred}
            width={width - Dimens.hundred}
            style={{marginTop: Dimens.ten}}
            buttonSize={Dimens.fifty}
            borderColor="#fff"
            buttonColor={Colors.profileBackgroundColor}
            backgroundColor={Colors.profileSwipeButtonColor}
            okButton={{visible: true, duration: 500}}
            onVerified={() => {
              this.props.navigation.navigate('UserProfileScreen', {
                profileData: userDetail,
              });
            }}
            icon={
              <Image
                source={require('../../../assets/swipebutton.png')}
                style={{width: 22, height: 22}}
              />
            }
          >
            <Text
              style={styles.swipeButtonStyle}
              children={'Edit your profile'}
            />
          </RNSwipeVerify>
        </View>
      </View>
    );
  };

  renderSupportView = () => {
    return (
      <View style={styles.itemContainer}>
        <Text
          onPress={() =>
            Linking.openURL(
              'https://twitter.com/messages/compose?recipient_id=1216172296315949056'
            )
          }
          style={styles.customerSupportTextStyle}
          numberOfLines={1}
          children={'Contact Us'}
        />
        {/* <Text
          onPress={() => this.props.navigation.navigate('NeedHelpScreen')}
          style={styles.customerSupportTextStyle}
          numberOfLines={1}
          children={'Need Immediate Help?'}
        /> */}
        <Text
          onPress={() =>
            this.props.navigation.navigate('FrequentlyAskedQuesScreen')
          }
          style={styles.customerSupportTextStyle}
          numberOfLines={1}
          children={'Frequently Asked Questions'}
        />
      </View>
    );
  };

  renderSettingView = () => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.settingLabelContainer}>
          <Text
            style={styles.settingLabelStyle}
            children={'App Notifications'}
          />
          <Switch
            value={this.state.appNotification}
            style={styles.rightIconStyle}
            onValueChange={value => {
              NetInfo.isConnected.fetch().done(isConnected => {
                if (!isConnected) {
                  this.refs.toast.show(
                    'No internet connection',
                    DURATION.LENGTH_SHORT
                  );
                  return;
                }
                notificationselected = 'appNotification';
                this.setState(
                  {appNotification: value, settingUpdation: true},
                  () => {
                    this.props.updateUserNotification(
                      JSON.stringify({
                        app_notification: this.state.appNotification,
                        email_notification: this.state.emailNotification,
                        user_id: this.state.userDetail.id,
                      })
                    );
                  }
                );
              });
            }}
          />
        </View>

        <View style={styles.settingLabelContainer}>
          <Text
            style={styles.settingLabelStyle}
            children={'Email Notifications'}
          />
          <Switch
            style={styles.rightIconStyle}
            value={this.state.emailNotification}
            onValueChange={value => {
              NetInfo.isConnected.fetch().done(isConnected => {
                if (!isConnected) {
                  this.refs.toast.show(
                    'No internet connection!',
                    DURATION.LENGTH_SHORT
                  );
                  return;
                }

                notificationselected = 'emailNotification';
                this.setState(
                  {emailNotification: value, settingUpdation: true},
                  () => {
                    this.props.updateUserNotification(
                      JSON.stringify({
                        app_notification: this.state.appNotification,
                        email_notification: this.state.emailNotification,
                        user_id: this.state.userDetail.id,
                      })
                    );
                  }
                );
              });
            }}
          />
        </View>

        {/* <View style={styles.settingDivider} />

        <Text style={styles.passwordStyle} children={'Password'} />

        <View
          style={{
            marginTop: Dimens.ten,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: Dimens.ten,
          }}
        >
          <Text
            style={{
              fontSize: Dimens.eighteen,
              color: Colors.headingTextColor,
            }}
            children={'**********'}
          />
          <Text
            style={{
              fontSize: Dimens.fourteen,
              color: Colors.headingTextColor,
              fontFamily: Fonts.SourceSansProIt,
            }}
            children={'    Last Change password 30 days ago'}
          />
        </View>

        <View
          style={{
            paddingTop: Dimens.fifteen,
            paddingHorizontal: Dimens.five,
          }}
        >
          <RNSwipeVerify
            ref={'settingSwipeView'}
            borderRadius={Dimens.hundred}
            width={width - Dimens.hundred}
            style={{marginTop: Dimens.ten}}
            buttonSize={Dimens.fifty}
            borderColor="#fff"
            buttonColor={Colors.profileBackgroundColor}
            backgroundColor={Colors.profileSwipeButtonColor}
            okButton={{visible: true, duration: 500}}
            onVerified={() => {
              this.props.navigation.navigate('ChangePasswordScreen');
            }}
            icon={
              <Image
                source={require('../../../assets/swipebutton.png')}
                style={{width: 22, height: 22}}
              />
            }
          >
            <Text
              style={styles.swipeButtonStyle}
              children={'Change your password'}
            />
          </RNSwipeVerify>
        </View>
      */}
      </View>
    );
  };

  //To show on whole Screen
  renderProfileView = () => {
    const {
      recentActivity,
      profile,
      address,
      support,
      setting,
      privacy,
    } = this.state;
    return profileArr.map((item, index) => {
      return (
        <View style={styles.headingContainer} key={index}>
          {index !== 0 ? (
            <BoxShadow
              inset={true}
              side={'top'}
              setting={{
                width: parseInt(width),
                height: Dimens.seventy,
                color: '#000',
                border: Dimens.ten,
                radius: Dimens.twenty,
                opacity: 0.1,
                x: 0,
                y: -Dimens.five,
                style: {
                  marginVertical: Dimens.zero,
                  marginTop: -Dimens.ten,
                },
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.headerClickType(item.title);
                }}
                style={styles.headingContainer}
              >
                <Text style={styles.textStyle} children={item.title} />
              </TouchableOpacity>
            </BoxShadow>
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.headerClickType(item.title);
              }}
              style={styles.headingContainer}
            >
              <Text
                style={[styles.textStyle, {height: Dimens.fifty}]}
                children={item.title}
              />
            </TouchableOpacity>
          )}
          {item.title == 'Recent Activity' && recentActivity
            ? this.renderRecentActivityView()
            : null}
          {item.title == 'My Profile' && profile
            ? this.renderUserProfileView()
            : null}
          {item.title == 'My Address' && address
            ? this.renderAddressView()
            : null}
          {item.title == 'Customer Support' && support
            ? this.renderSupportView()
            : null}
          {item.title == 'Settings' && setting
            ? this.renderSettingView()
            : null}
          {item.title == 'Privacy Policy' && privacy
            ? this.renderPrivacyPolicy()
            : null}
          {item.title == 'Sign Out' ? this.renderSignOut() : null}
        </View>
      );
    });
  };

  renderSignOut = () => {
    return <View style={[styles.itemContainer, {height: Dimens.ten}]} />;
  };

  signOut = () => {
    AsyncStorage.clear();
    AsyncStorage.setItem('IsVideoPlayed', 'Yes');
    this.props.logoutFromApp();
  };

  headerClickType = type => {
    switch (type) {
      case 'Recent Activity':
        this.showSelectedView('recentActivity');
        break;

      case 'My Profile':
        this.showSelectedView('profile');
        break;

      case 'My Address':
        this.showSelectedView('address');
        break;

      case 'Customer Support':
        this.showSelectedView('support');
        break;

      case 'Settings':
        this.showSelectedView('setting');
        break;

      case 'Privacy Policy':
        this.showSelectedView('privacy');
        break;

      case 'Sign Out':
        this.signOut();
        break;

      default:
        this.showSelectedView('recentActivity');
        break;
    }
  };

  showSelectedView = viewName =>
    this.setState({
      recentActivity: false,
      profile: false,
      address: false,
      support: false,
      setting: false,
      privacy: false,
      [viewName]: true,
    });

  render() {
    const {updatingNotification} = this.props.UpdateUserSettingReducer;
    const {isFetching} = this.props.ActivitiesReducer;

    return (
      <View style={styles.container}>
        <Toast ref="toast" />

        <Text style={styles.headerTextStyle} children={'My Profile'} />
        <ScrollView style={styles.mainHeadingContainer}>
          {this.renderProfileView()}
        </ScrollView>

        {updatingNotification && <Loader />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    UpdateUserSettingReducer: state.UpdateUserSettingReducer,
    ActivitiesReducer: state.ActivitiesReducer,
    UserDetailReducer: state.UserDetailReducer,
    DashboardReducer: state.DashboardReducer,
    AuthReducer: state.AuthReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileData: jsonObj => {
      dispatch(getProfileData(jsonObj));
    },
    updateUserNotification: jsonObj => {
      dispatch(updateUserNotification(jsonObj));
    },
    getActivities: jsonObj => {
      dispatch(getActivities(jsonObj));
    },
    logoutFromApp: () => {
      dispatch(logoutFromApp());
    },
    getUserDetails: id => {
      dispatch(getUserDetails(id));
    },
  };
};

const getUserDetails = id => {
  return {
    type: constants.GETTING_USER_DETAIL,
    id,
  };
};

const logoutFromApp = () => {
  return {
    type: constants.INITIATE_LOGOUT,
  };
};

const getProfileData = jsonObj => {
  return {
    type: constants.FETCHING_USER_DETAIL,
    jsonObj,
  };
};

const updateUserNotification = jsonObj => {
  return {
    type: constants.UPDATING_USER_NOTIFICATION,
    jsonObj,
  };
};

const getActivities = jsonObj => {
  return {
    type: constants.FETCHING_ACTIVITIES,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
