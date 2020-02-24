import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');

const Fonts = {
  SourceSansProBlack: 'SourceSansPro-Black',
  SourceSansProBlackIt: 'SourceSansPro-BlackIt',
  SourceSansProBold: 'SourceSansPro-Bold',
  SourceSansProBoldIt: 'SourceSansPro-BoldIt',
  SourceSansProExtraLight: 'SourceSansPro-ExtraLight',
  SourceSansProExtraLightIt: 'SourceSansPro-ExtraLightIt',
  SourceSansProIt: 'SourceSansPro-It',
  SourceSansProLight: 'SourceSansPro-Light',
  SourceSansProLightIt: 'SourceSansPro-LightIt',
  SourceSansProRegular: 'SourceSansPro-Regular',
  SourceSansProSemibold: 'SourceSansPro-Semibold',
  SourceSansProSemiboldIt: 'SourceSansPro-SemiboldIt',
};

const sizeWithRespectToScreen = size => {
  return (
    (parseInt(size) * width) /
    (DeviceInfo.getDeviceType() === 'Tablet' || Platform.isPad ? 750 : 470)
  );
};

const Dimens = {
  //dimens
  zero: sizeWithRespectToScreen(0),
  pointOne: sizeWithRespectToScreen(0.1),
  one: sizeWithRespectToScreen(1),
  oneAndHalf: sizeWithRespectToScreen(1.5),
  two: sizeWithRespectToScreen(2),
  three: sizeWithRespectToScreen(3),
  four: sizeWithRespectToScreen(4),
  five: sizeWithRespectToScreen(5),
  seven: sizeWithRespectToScreen(7),
  eight: sizeWithRespectToScreen(8),
  ten: sizeWithRespectToScreen(10),
  eleven: sizeWithRespectToScreen(11),
  tweleve: sizeWithRespectToScreen(12),
  fourteen: sizeWithRespectToScreen(14),
  fifteen: sizeWithRespectToScreen(15),
  sixteen: sizeWithRespectToScreen(16),
  seventeen: sizeWithRespectToScreen(17),
  eighteen: sizeWithRespectToScreen(18),
  twenty: sizeWithRespectToScreen(20),
  twentyTwo: sizeWithRespectToScreen(22),
  twentyThree: sizeWithRespectToScreen(23),
  twentyFour: sizeWithRespectToScreen(24),
  twentyFive: sizeWithRespectToScreen(25),
  twentySeven: sizeWithRespectToScreen(27),
  thirty: sizeWithRespectToScreen(30),
  thirtyTwo: sizeWithRespectToScreen(32),
  thirtyFive: sizeWithRespectToScreen(35),
  fourty: sizeWithRespectToScreen(40),
  fourtyFive: sizeWithRespectToScreen(45),
  fifty: sizeWithRespectToScreen(50),
  sixty: sizeWithRespectToScreen(60),
  sixtyFive: sizeWithRespectToScreen(65),
  seventy: sizeWithRespectToScreen(70),
  seventyFive: sizeWithRespectToScreen(75),
  eighty: sizeWithRespectToScreen(80),
  eightyFive: sizeWithRespectToScreen(85),
  ninty: sizeWithRespectToScreen(90),
  hundred: sizeWithRespectToScreen(100),
  oneTwenty: sizeWithRespectToScreen(120),
  oneFourtyThree: sizeWithRespectToScreen(143),
  oneFifty: sizeWithRespectToScreen(150),
  oneSeventyFive: sizeWithRespectToScreen(175),
  oneEighty: sizeWithRespectToScreen(180),
  twoHundred: sizeWithRespectToScreen(200),
  twoTwenty: sizeWithRespectToScreen(220),
  twoTwentyFive: sizeWithRespectToScreen(225),
  twoThirtyFive: sizeWithRespectToScreen(235),
  twoFifty: sizeWithRespectToScreen(250),
  twoSixty: sizeWithRespectToScreen(260),
  twoSixtyFive: sizeWithRespectToScreen(265),
  twoSeventy: sizeWithRespectToScreen(270),
  threeHundred: sizeWithRespectToScreen(300),
  threeTwenty: sizeWithRespectToScreen(320),
  threeFifty: sizeWithRespectToScreen(350),
  threeSeventyFive: sizeWithRespectToScreen(375),
  fourHundred: sizeWithRespectToScreen(400),
  thousand: sizeWithRespectToScreen(1000),
};

const Colors = {
  appOrange: '#f7b500',
  black: 'black',
  blackAplha: 'rgba(0, 0, 0, 0.5)',
  whiteAplha: 'rgba(255, 255, 255, 0.8)',
  semiblack: '#222222',
  white: '#fff',
  silver: '#cccccc',

  //Login
  loginBackground: '#825AF6',
  loginTextColor: '#FDFDFF',
  //Otp
  resendTextColor: '#535353',

  // Profile Screen
  profileBackgroundColor: '#80dde4',
  profileHeadingTextColor: '#FDFDFF',
  profileTextColor: '#ccc',
  headingTextColor: '#535353',
  profileSwipeButtonColor: '#d5f3f4',

  //OrderScreen
  orderHeaderTextColor: '#f5f5f5',

  mainBackgroundColor: '#0E0E14',
  mainTextColor: '#DACA97',

  //NOtification Screen
  notificationBackgroundColor: '#4e9bd2',
  notificationHeaderTextColor: '#595959',
  notificationTextColor: '#acacac',
  notificationDateColor: '#cccccc',
  notificationHeaderBackground: '#f5f5f5',

  //Activities Screen
  activityBackgroundColor: '#7266a6',

  //Reward Screen
  rewardScreenBackground: '#eeb73f',

  //Dashboard Screen
  dashBoardBackground: '#f52ec0',
  insureBackground: '#7fd958',
  kenkoBackground: '#8d54ff',
  healthItemBackground: '#58d8dc',
  titleTextColor: '#242424',
  kenkoScore: '#2d9cd7',
  scoreColor: '#cbe600',

  //FlatListItemBackgroundColor
  backgroundItemColor: '#0E0E14',
  textHeadingColor: '#546270',
  textEarnedColor: '#877E63',
  textTokenColor: '#A1A1A1',

  dimTextColor: '#9c9c9c',
  placeHolderColor: '#939393',
};

function isIphoneXorAbove() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      (dimen.height === 896 || dimen.width === 896))
  );
}

const userStatusBarPadding =
  Platform.OS == 'ios'
    ? isIphoneXorAbove()
      ? Dimens.fourtyFive
      : Dimens.twenty
    : Dimens.zero;

const menuTopPaddingValue =
  Platform.OS == 'ios'
    ? isIphoneXorAbove()
      ? Dimens.eighty
      : Dimens.sixty
    : Dimens.fourty;

const shadowOpt = {
  width: parseInt(width),
  height: Dimens.seventy,
  color: '#000',
  border: Dimens.ten,
  radius: Dimens.twenty,
  opacity: 0.1,
  x: 0,
  y: -Dimens.three,
  style: {
    marginVertical: -10,
  },
};

export {
  Colors,
  Fonts,
  Dimens,
  userStatusBarPadding,
  menuTopPaddingValue,
  isIphoneXorAbove,
  shadowOpt,
};
