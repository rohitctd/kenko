import {StyleSheet, Platform} from 'react-native';
import {Colors, Dimens, Fonts, isIphoneXorAbove} from '../../../../utils/Theme';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dashBoardBackground,
  },
  headerTextStyle: {
    marginVertical: Dimens.fifteen,
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.sixtyFive
          : Dimens.thirtyFive
        : Dimens.fifteen,
    paddingHorizontal: Dimens.fifteen,
    flexDirection: 'row',
  },
  ProfilePic: {
    height: Dimens.seventy,
    width: Dimens.seventy,
    borderRadius: Dimens.thirtyFive,
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
  nameStyle: {
    color: Colors.profileHeadingTextColor,
    fontSize: Dimens.twentyFive,
    fontFamily: Fonts.SourceSansProSemibold,
  },
  mainHeadingContainer: {
    paddingTop: Dimens.fifteen,
  },
  notificationDetailContainer: {
    flex: 1,
    backgroundColor: Colors.notificationHeaderBackground,
    borderTopLeftRadius: Dimens.twentyFive,
    borderTopRightRadius: Dimens.twentyFive,
    paddingTop: -Dimens.twenty,
  },
  notificationHeaderStyle: {
    height: Dimens.seventy,
    padding: Dimens.eighteen,
    color: Colors.notificationHeaderTextColor,
    fontSize: Dimens.eighteen,
    fontFamily: Fonts.SourceSansProBold,
    borderTopLeftRadius: Dimens.twentyFive,
    borderTopRightRadius: Dimens.twentyFive,
  },
  countStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: Dimens.twentyFour,
    paddingHorizontal: Dimens.fifteen,
    color: Colors.profileHeadingTextColor,
  },
  countTextStyle: {
    fontSize: Dimens.eighty,
    color: Colors.profileHeadingTextColor,
    fontFamily: Fonts.SourceSansProBold,
  },
  countDetailStyle: {
    fontSize: Dimens.twenty,
    color: Colors.profileHeadingTextColor,
    fontFamily: Fonts.SourceSansProSemibold,
  },
  kenkoContainer: {
    height: Dimens.twoThirtyFive,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: Dimens.fifty,
  },
  healthContainer: {
    flexDirection: 'column',
    height: Dimens.threeTwenty,
  },
  itemStyle: {
    height: Dimens.twoTwenty,
    flexDirection: 'row',
    marginHorizontal: Dimens.fifteen,
    marginBottom: Dimens.five,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    padding: Dimens.twenty,
  },
  dateStyle: {
    fontFamily: Fonts.SourceSansProRegular,
    color: Colors.white,
    fontSize: Dimens.eighteen,
  },
  signStyle: {
    fontFamily: Fonts.SourceSansProBold,
    color: Colors.white,
    fontSize: Dimens.twenty,
  },
  detailStyle: {
    fontFamily: Fonts.SourceSansProBold,
    color: Colors.white,
    fontSize: Dimens.twenty,
  },
  iconStyle: {
    flex: 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: Dimens.fifteen,
  },
  nextButtonContainer: {
    paddingTop: Dimens.fifteen,
    paddingBottom: Dimens.thirty,
    paddingHorizontal: Dimens.twenty,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: Dimens.one,
    marginRight: Dimens.ten,
    fontSize: Dimens.twenty,
    fontFamily: Fonts.SourceSansProRegular,
  },
  recentActivityFlatList: {
    height: heightPercentageToDP(100),
  },
  recentItemStyle: {
    flexDirection: 'row',
    marginBottom: Dimens.five,
    backgroundColor: Colors.white,
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

  recentLeftContainer: {
    flex: 0.6,
    padding: Dimens.twenty,
    alignItems: 'flex-start',
  },
  recentRightContainer: {
    flex: 0.4,
    padding: Dimens.twenty,
    alignItems: 'flex-end',
  },
  swipeButtonStyle: {
    textAlign: 'center',
    fontSize: Dimens.eighteen,
    paddingVertical: Dimens.ten,
    paddingLeft: Dimens.fifteen,
    borderRadius: Dimens.twenty,
    marginHorizontal: Dimens.ten,
    color: Colors.white,
    fontFamily: Fonts.SourceSansProBold,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },

  nohealthContainer: {
    height: Dimens.hundred,
    flexDirection: 'column',
    alignItems: 'center',
  },
  noHealthDataStyle: {
    marginTop: Dimens.ten,
    color: Colors.white,
    fontSize: Dimens.twentyTwo,
    fontFamily: Fonts.SourceSansProSemibold,
  },
});
