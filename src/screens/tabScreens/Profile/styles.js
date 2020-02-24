import {StyleSheet, Platform} from 'react-native';
import {Colors, Dimens, isIphoneXorAbove, Fonts} from '../../../utils/Theme';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import deviceInfoModule from 'react-native-device-info';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.profileBackgroundColor,
    flexDirection: 'column',
  },
  headerTextStyle: {
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.sixtyFive
          : Dimens.thirtyFive
        : Dimens.fifteen,
    fontSize: Dimens.twentyFour,
    paddingHorizontal: Dimens.fifteen,
    color: Colors.profileHeadingTextColor,
    fontFamily: Fonts.SourceSansProSemibold,
  },
  textStyle: {
    height: Dimens.sixty,
    fontSize: Dimens.eighteen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: Dimens.twenty,
    justifyContent: 'center',
    marginVertical: Dimens.five,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Platform.select({
      ios: Dimens.twenty,
      android: Dimens.ten,
    }),
    color: Colors.textHeadingColor,
    fontFamily: Fonts.SourceSansProBold,
  },
  mainHeadingContainer: {
    paddingTop: Dimens.twentyFive,
    position: 'absolute',
    bottom: Dimens.pointOne,
    width: '100%',
    alignContent: 'flex-end',
    height: '90%',
  },

  headingContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    paddingBottom: Dimens.five,
  },

  innerViewContainer: {
    height: '40%',
    fontSize: Dimens.twenty,
    padding: Dimens.fifteen,
    marginTop: -Dimens.tweleve,
    backgroundColor: Colors.profileHeadingTextColor,
  },
  nextButtonContainer: {
    marginTop: Dimens.ten,
    marginBottom: Dimens.seven,
    paddingHorizontal: Dimens.fifteen,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconText: {
    color: Colors.profileBackgroundColor,
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: Dimens.one,
    marginRight: Dimens.ten,
    fontSize: Dimens.eighteen,
    fontFamily: Fonts.SourceSansProRegular,
  },
  orderNumberStyle: {
    fontSize: Dimens.sixteen,
    color: Colors.profileTextColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
  planTextStyle: {
    fontSize: Dimens.seventeen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingLeft: Dimens.fifteen,
    color: Colors.textHeadingColor,
    fontFamily: Fonts.SourceSansProBold,
  },
  redeemPointStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: Dimens.ten,
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Dimens.ten,
    color: Colors.textHeadingColor,
    fontFamily: Fonts.SourceSansProBold,
  },

  privacyPolicyTextStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: 'flex-start',
    textAlign: 'justify',
    paddingLeft: Dimens.ten,
    justifyContent: 'center',
    marginVertical: Dimens.five,
    paddingRight: Dimens.fifteen,
    color: Colors.textHeadingColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
  customerSupportTextStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: 'flex-start',
    textAlign: 'justify',
    paddingHorizontal: Dimens.ten,
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    color: Colors.textHeadingColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
  orderContainer: {
    height: Dimens.twoTwenty,
    fontSize: Dimens.twenty,
    paddingHorizontal: Dimens.ten,
    paddingTop: Dimens.ten,
    paddingBottom: Dimens.twenty,
    backgroundColor: Colors.loginTextColor,
  },
  itemContainer: {
    height: heightPercentageToDP(35),
    fontSize: Dimens.seventeen,
    paddingHorizontal: Dimens.ten,
    marginBottom: Dimens.twentyFive,
  },
  profileLabelStyle: {
    fontSize: Dimens.seventeen,
    marginRight: Dimens.twenty,
    padding: Dimens.ten,
    textAlign: 'justify',
    color: Colors.headingTextColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
  profileValueStyle: {
    color: Colors.headingTextColor,
    fontSize: Dimens.seventeen,
    paddingLeft: Dimens.ten,
    fontFamily: Fonts.SourceSansProSemibold,
  },
  swipeButtonStyle: {
    textAlign: 'center',
    fontSize: Dimens.eighteen,
    padding: Dimens.ten,
    borderRadius: Dimens.twenty,
    marginHorizontal: Dimens.ten,
    color: Colors.profileBackgroundColor,
    fontFamily: Fonts.SourceSansProBold,
  },
  addressStyle: {
    paddingHorizontal: Dimens.ten,
    fontSize: Dimens.eighteen,
    color: Colors.headingTextColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
  addressContainer: {
    paddingTop: Dimens.five,
  },
  rightIconStyle: {
    marginRight: Dimens.ten,
  },
  settingLabelStyle: {
    fontSize: Dimens.eighteen,
    color: Colors.headingTextColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
  settingLabelContainer: {
    marginTop: Dimens.seven,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Dimens.ten,
  },
  passwordStyle: {
    marginTop: Dimens.five,
    padding: Dimens.ten,
    fontSize: Dimens.eighteen,
    color: Colors.headingTextColor,
    fontFamily: Fonts.SourceSansProSemibold,
  },
  settingDivider: {
    width: '100%',
    marginTop: Dimens.twenty,
    height: Dimens.two,
    backgroundColor: Colors.profileTextColor,
  },

  ///

  recentItemStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  recentLeftContainer: {
    flex: 0.6,
    padding: Dimens.fifteen,
    alignItems: 'flex-start',
  },
  dateRecentStyle: {
    fontFamily: Fonts.SourceSansProRegular,
    color: Colors.blackAplha,
    fontSize: Dimens.fourteen,
  },
  titleStyle: {
    fontFamily: Fonts.SourceSansProBold,
    color: Colors.black,
    fontSize: Dimens.eighteen,
  },
  recentDetailStyle: {
    fontFamily: Fonts.SourceSansProRegular,
    color: Colors.blackAplha,
    fontSize: Dimens.fourteen,
  },
  typeStyle: {
    borderRadius: Dimens.twenty,
    backgroundColor: Colors.insureBackground,
    fontFamily: Fonts.SourceSansProSemibold,
    color: Colors.white,
    paddingVertical: Dimens.five,
    fontSize: Dimens.fourteen,
    paddingHorizontal: Dimens.fifteen,
  },
  pointStyle: {
    color: Colors.black,
    fontFamily: Fonts.SourceSansProBold,
    fontSize: Dimens.eighteen,
    paddingVertical: Dimens.five,
    paddingRight: Dimens.five,
  },
  closingBalanceStyle: {
    color: Colors.blackAplha,
    fontFamily: Fonts.SourceSansProRegular,
    fontSize: Dimens.fourteen,
  },
  recentRightContainer: {
    flex: 0.4,
    padding: Dimens.fifteen,
    alignItems: 'flex-end',
  },
});
