import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import {Colors, Dimens} from '../utils/Theme';

import TabBar from './TabBar';

import KenkoVideo from '../screens/kenkoVideo/KenkoVideo';

import KenkoVideoSplash from '../screens/KenkoSplash/KenkoVideoSplash';
import Splash from '../screens/KenkoSplash/KenkoSplash';
import SignInScreen from '../screens/SignIn/SignInScreen';
import OtpScreen from '../screens/otp/OtpScreen';

import Permission from '../screens/question/Permission';
import TermsScreen from '../screens/question/TermsScreen';
import GiftUnlock from '../screens/question/GiftUnlock';
import ScoreFetched from '../screens/question/ScoreFetched';

import AppIntroScreen from '../screens/question/AppIntroScreen';
import AskQuestion from '../screens/question/AskQuestion';
import QuestionCarousel from '../screens/question/QuestionCarousel';
import Question2Screen from '../screens/question/Question2Screen';
import VideoRecordingScreen from '../screens/question/VideoRecordingScreen';

import DashBoardScreen from '../screens/tabScreens/Dashboards/DashBoardScreen';
import ComingSoon from '../screens/tabScreens/Dashboards/ComingSoon';
import HealthDetailScreen from '../screens/tabScreens/Dashboards/healthDetail/HealthDetailScreen';
import KenkoCreditScreen from '../screens/tabScreens/Dashboards/kenkoCredits/KenkoCreditScreen';
import KenkoScoreScreen from '../screens/tabScreens/Dashboards/kenkoScore/KenkoScoreScreen';

import OrderListScreen from '../screens/tabScreens/Orders/OrderListScreen';

import NotificationScreen from '../screens/tabScreens/Notifications/NotificationScreen';

import ProfileScreen from '../screens/tabScreens/Profile/ProfileScreen';
import AddressScreen from '../screens/tabScreens/Profile/address/AddressScreen';
import ChangePasswordScreen from '../screens/tabScreens/Profile/password/ChangePasswordScreen';
import PrivacyPolicyScreen from '../screens/tabScreens/Profile/privacypolicy/PrivacyPolicyScreen';
import UserProfileScreen from '../screens/tabScreens/Profile/editProfile/UserProfileScreen';
import ContactUsScreen from '../screens/tabScreens/Profile/contactUs/ContactUsScreen';
import FrequentlyAskedQuesScreen from '../screens/tabScreens/Profile/frequentlyAskedQues/FrequentlyAskedQuesScreen';
import NeedHelpScreen from '../screens/tabScreens/Profile/needHelp/NeedHelpScreen';
import ActivityScreen from '../screens/tabScreens/Profile/Activities/ActivityScreen';
import SelectLabsScreen from '../screens/tabScreens/Profile/Activities/selectLabs/SelectLabsScreen';
import ActivityDetailScreen from '../screens/tabScreens/Profile/Activities/activityDetail/ActivityDetailScreen';
import CalenderScreen from '../screens/tabScreens/Profile/Activities/CalenderScreen/CalenderScreen';
import SlotBookingScreen from '../screens/tabScreens/Profile/Activities/SlotBookingSuccess/SlotBookingScreen';

import RewardScreen from '../screens/tabScreens/Rewards/RewardScreen';
import RewardDetailScreen from '../screens/tabScreens/Rewards/rewardDetail/RewardDetailScreen';
import CheckoutScreen from '../screens/tabScreens/Rewards/checkout/CheckoutScreen';
import RewardRedeemedScreen from '../screens/tabScreens/Rewards/rewardRedeemed/RewardRedeemedScreen';

import FastImage from 'react-native-fast-image';
import ChooseGender from '../screens/question/ChooseGender';
import EnrollmentClose from '../screens/question/EnrollmentClose';
import EmailAddress from '../screens/question/EmailAddress';

const ProfileStack = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
      },
    },
    PrivacyPolicyScreen: {
      screen: PrivacyPolicyScreen,
      navigationOptions: {
        header: null,
      },
    },
    AddressScreen: {
      screen: AddressScreen,
      navigationOptions: {
        header: null,
      },
    },
    ChangePasswordScreen: {
      screen: ChangePasswordScreen,
      navigationOptions: {
        header: null,
      },
    },
    UserProfileScreen: {
      screen: UserProfileScreen,
      navigationOptions: {
        header: null,
      },
    },
    ContactUsScreen: {
      screen: ContactUsScreen,
      navigationOptions: {
        header: null,
      },
    },
    FrequentlyAskedQuesScreen: {
      screen: FrequentlyAskedQuesScreen,
      navigationOptions: {
        header: null,
      },
    },
    NeedHelpScreen: {
      screen: NeedHelpScreen,
      navigationOptions: {
        header: null,
      },
    },
    ActivityScreen: {
      screen: ActivityScreen,
      navigationOptions: {
        header: null,
      },
    },
    ActivityScreen: {
      screen: ActivityScreen,
      navigationOptions: {
        header: null,
      },
    },
    SelectLabsScreen: {
      screen: SelectLabsScreen,
      navigationOptions: {
        header: null,
      },
    },
    ActivityDetailScreen: {
      screen: ActivityDetailScreen,
      navigationOptions: {
        header: null,
      },
    },
    CalenderScreen: {
      screen: CalenderScreen,
      navigationOptions: {
        header: null,
      },
    },
    SlotBookingScreen: {
      screen: SlotBookingScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteKey: 'ProfileScreen',
    mode: 'modal',
  }
);

const DashBoardStack = createStackNavigator(
  {
    DashBoardScreen: {
      screen: DashBoardScreen,
      navigationOptions: {
        header: null,
      },
    },
    ComingSoon: {
      screen: ComingSoon,
      navigationOptions: {
        header: null,
      },
    },
    HealthDetailScreen: {
      screen: HealthDetailScreen,
      navigationOptions: {
        header: null,
      },
    },
    KenkoCreditScreen: {
      screen: KenkoCreditScreen,
      navigationOptions: {
        header: null,
      },
    },
    KenkoScoreScreen: {
      screen: KenkoScoreScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteKey: 'DashBoardScreen',
    mode: 'modal',
  }
);

const ActivityStack = createStackNavigator(
  {
    ActivityScreen: {
      screen: ActivityScreen,
      navigationOptions: {
        header: null,
      },
    },
    SelectLabsScreen: {
      screen: SelectLabsScreen,
      navigationOptions: {
        header: null,
      },
    },
    ActivityDetailScreen: {
      screen: ActivityDetailScreen,
      navigationOptions: {
        header: null,
      },
    },
    CalenderScreen: {
      screen: CalenderScreen,
      navigationOptions: {
        header: null,
      },
    },
    SlotBookingScreen: {
      screen: SlotBookingScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteKey: 'ActivityScreen',
    mode: 'modal',
  }
);

const RewardStack = createStackNavigator(
  {
    RewardScreen: {
      screen: RewardScreen,
      navigationOptions: {
        header: null,
      },
    },
    RewardDetailScreen: {
      screen: RewardDetailScreen,
      navigationOptions: {
        header: null,
      },
    },
    CheckoutScreen: {
      screen: CheckoutScreen,
      navigationOptions: {
        header: null,
      },
    },
    RewardRedeemedScreen: {
      screen: RewardRedeemedScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteKey: 'RewardDetailScreen',
    mode: 'modal',
  }
);

const TabNavigation = createBottomTabNavigator(
  {
    Rewards: {
      screen: RewardStack,
      navigationOptions: {
        header: null,
      },
    },
    Notifications: {
      screen: NotificationScreen,
      navigationOptions: {
        header: null,
      },
    },
    Dashboard: {
      screen: DashBoardStack,
      navigationOptions: {
        header: null,
      },
    },
    Orders: {
      screen: OrderListScreen,
      navigationOptions: {
        header: null,
      },
    },
    'My Profile': {
      screen: ProfileStack,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarOnPress: ({scene, jumpToIndex}) => {
        const {route, focused, index} = scene;
        if (focused) {
          if (route.index > 0) {
            const {routeName, key} = route.routes[1];
            navigation.dispatch(NavigationActions.back({key}));
          }
        } else {
          jumpToIndex(index);
        }
      },
    }),
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        let nametext;
        let iconColor = '';

        if (routeName === 'Orders') {
          iconName = focused
            ? require('../assets/TabBar/orderTabIcon.png')
            : require('../assets/TabBar/orderTabIcon.png');
          nametext = 'Activities';
          iconColor = Colors.activityBackgroundColor;
        } else if (routeName === 'Rewards') {
          iconName = focused
            ? require('../assets/TabBar/gift-3.png')
            : require('../assets/TabBar/gift-3.png');
          nametext = 'Rewards';
          iconColor = Colors.rewardScreenBackground;
        } else if (routeName === 'Dashboard') {
          iconName = focused
            ? require('../assets/TabBar/k.png')
            : require('../assets/TabBar/k.png');
          nametext = 'Dashboard';
          iconColor = Colors.dashBoardBackground;
        } else if (routeName === 'Notifications') {
          iconName = focused
            ? require('../assets/TabBar/Activity.png')
            : require('../assets/TabBar/Activity.png');
          nametext = 'Notifications';
          iconColor = Colors.notificationBackgroundColor;
        } else if (routeName === 'My Profile') {
          iconName = focused
            ? require('../assets/TabBar/profile-icon.png')
            : require('../assets/TabBar/profile-icon.png');
          iconColor = Colors.profileBackgroundColor;
          nametext = 'My Profile';
        }

        return (
          <FastImage
            source={iconName}
            style={{height: Dimens.twenty, width: Dimens.twenty}}
            resizeMode={FastImage.resizeMode.contain}
          />
        );
      },
    }),
    tabBarComponent: props => <TabBar {...props} />,
    initialRouteName: 'Dashboard',
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    order: ['Rewards', 'Notifications', 'Dashboard', 'Orders', 'My Profile'],
    tabBarOptions: {
      scrollEnabled: true,
      showLabel: false,
      showIcon: true,
      allowFontScaling: true,
      safeAreaInset: {left: 'always'},
      adaptive: true,
      keyboardHidesTabBar: true,
      style: {
        backgroundColor: Colors.white,
        elevation: Dimens.five,
        width: '100%',
        padding: 0,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        shadowOffset: {
          height: -7,
          width: 0,
        },
      },
      indicatorStyle: {
        height: 0,
      },
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    SignInScreen: {
      screen: SignInScreen,
      navigationOptions: {
        header: null,
      },
    },
    OtpScreen: {
      screen: OtpScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'SignInScreen',
    mode: 'modal',
  }
);

const AppIntro = createStackNavigator(
  {
    AppIntroScreen: {
      screen: AppIntroScreen,
      navigationOptions: {
        header: null,
      },
    },
    AskQuestion: {
      screen: AskQuestion,
      navigationOptions: {
        header: null,
      },
    },
    QuestionCarousel: {
      screen: QuestionCarousel,
      navigationOptions: {
        header: null,
      },
    },
    Question2Screen: {
      screen: Question2Screen,
      navigationOptions: {
        header: null,
      },
    },
    TermsScreen: {
      screen: TermsScreen,
      navigationOptions: {
        header: null,
      },
    },
    Permission: {
      screen: Permission,
      navigationOptions: {
        header: null,
      },
    },
    VideoRecordingScreen: {
      screen: VideoRecordingScreen,
      navigationOptions: {
        header: null,
      },
    },
    GiftUnlock: {
      screen: GiftUnlock,
      navigationOptions: {
        header: null,
      },
    },
    ScoreFetched: {
      screen: ScoreFetched,
      navigationOptions: {
        header: null,
      },
    },
    ChooseGender: {
      screen: ChooseGender,
      navigationOptions: {
        header: null,
      },
    },
    EnrollmentClose: {
      screen: EnrollmentClose,
      navigationOptions: {
        header: null,
      },
    },
    EmailAddress: {
      screen: EmailAddress,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'AppIntroScreen',
    mode: 'modal',
  }
);

export default AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Splash: {
        screen: Splash,
        navigationOptions: {
          header: null,
        },
      },
      KenkoVideoSplash: {
        screen: KenkoVideoSplash,
        navigationOptions: {
          header: null,
        },
      },
      KenkoVideo: {
        screen: KenkoVideo,
        navigationOptions: {
          header: null,
        },
      },
      AuthNavigator: {
        screen: AuthNavigator,
        navigationOptions: {
          header: null,
        },
      },
      AppIntro: {
        screen: AppIntro,
        navigationOptions: {
          header: null,
        },
      },
      TabNavigation: {
        screen: TabNavigation,
        navigationOptions: {
          header: null,
        },
      },
    },
    {
      initialRouteName: 'Splash',
    }
  )
);
