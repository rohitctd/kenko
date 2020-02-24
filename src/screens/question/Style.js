import {StyleSheet, Platform} from 'react-native';
import {Colors, Dimens, isIphoneXorAbove, Fonts} from '../../utils/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.loginBackground,
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.fifty
          : Dimens.twenty
        : Dimens.Zero,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  profileHeaderTextStyle: {
    height: '11%',
    fontSize: Dimens.twenty,
    paddingTop: Dimens.tweleve,
    paddingLeft: Dimens.fifteen,
    marginTop: Dimens.ten,
    marginBottom: Dimens.seven,
    color: Colors.profileHeadingTextColor,
  },
  mainHeadingContainer: {
    flexDirection: 'column',
    // marginBottom: Dimens.fourty,
    backgroundColor: Colors.loginTextColor,
  },
  headingContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    marginTop: -Dimens.tweleve,
    overflow: 'hidden',
  },
  headerTextStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: Dimens.twenty,
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Platform.select({
      ios: Dimens.twenty,
      android: Dimens.ten,
    }),
    color: Colors.textHeadingColor,
  },
  innerViewContainer: {
    height: '40%',
    fontSize: Dimens.twenty,
    padding: Dimens.fifteen,
    marginTop: -Dimens.tweleve,
    backgroundColor: Colors.profileHeadingTextColor,
  },
  nextButtonContainer: {
    marginTop: Dimens.twentyFive,
    paddingHorizontal: Dimens.fifteen,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconText: {
    color: Colors.profileBackgroundColor,
    textAlign: 'center',
    marginTop: Dimens.one,
    marginRight: Dimens.ten,
    fontSize: Dimens.twenty,
  },
  orderNumberStyle: {
    fontSize: Dimens.fifteen,
    color: Colors.profileTextColor,
  },
  planTextStyle: {
    fontSize: Dimens.seventeen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingLeft: Dimens.fifteen,
    color: Colors.textHeadingColor,
  },
  // redeemPointStyle: {
  //   fontSize: Dimens.eighteen,
  //   alignSelf: "flex-start",
  //   textAlign: "left",
  //   paddingLeft: Dimens.ten,
  //   justifyContent: "center",
  //   marginVertical: Dimens.ten,
  //   paddingHorizontal: Dimens.ten,
  //   paddingVertical: Dimens.ten,
  //   color: Colors.textHeadingColor,
  // },
  myKenkoContainer: {
    height: '40%',
    fontSize: Dimens.twenty,
    padding: Dimens.ten,
    // marginTop: Dimens.fifteen,
    backgroundColor: Colors.MyKenkoBackgroundColor,
  },
  myKenkoheadingContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.MyKenkoBackgroundColor,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    marginTop: -Dimens.tweleve,
    overflow: 'hidden',
  },

  myKenkoHeaderTextStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: Dimens.twenty,
    justifyContent: 'center',
    marginVertical: Dimens.twenty,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Platform.select({
      ios: Dimens.twenty,
      android: Dimens.ten,
    }),
    color: Colors.textHeadingColor,
  },

  healthContainer: {
    height: '40%',
    fontSize: Dimens.twenty,
    padding: Dimens.ten,
    // marginTop: Dimens.fifteen,
    backgroundColor: Colors.HealthProfileBackgroundColor,
  },
  healthheadingContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.HealthProfileBackgroundColor,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    marginTop: -Dimens.tweleve,
    overflow: 'hidden',
  },

  healthHeaderTextStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: Dimens.twenty,
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Platform.select({
      ios: Dimens.twenty,
      android: Dimens.ten,
    }),
    color: Colors.textHeadingColor,
  },

  eligibilityContainer: {
    height: '40%',
    fontSize: Dimens.twenty,
    padding: Dimens.ten,
    // marginTop: Dimens.fifteen,
    backgroundColor: Colors.EligibilityeBackgroundColor,
  },
  eligibilityheadingContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.EligibilityeBackgroundColor,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    marginTop: -Dimens.tweleve,
    overflow: 'hidden',
  },

  eligibilityHeaderTextStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: Dimens.twenty,
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Platform.select({
      ios: Dimens.twenty,
      android: Dimens.ten,
    }),
    color: Colors.textHeadingColor,
  },

  recentActivityContainer: {
    height: '40%',
    fontSize: Dimens.twenty,
    padding: Dimens.ten,
    // marginTop: Dimens.fifteen,
    backgroundColor: Colors.RecentActivityBackgroundColor,
  },
  recentActivityheadingContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.RecentActivityBackgroundColor,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    marginTop: -Dimens.tweleve,
    overflow: 'hidden',
  },

  recentActivityHeaderTextStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: Dimens.twenty,
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Platform.select({
      ios: Dimens.twenty,
      android: Dimens.ten,
    }),
    color: Colors.textHeadingColor,
  },
  giftOvalStyle: {
    borderRadius: 30,
    backgroundColor: '#f7b500',
    width: Dimens.fifty,
    height: Dimens.fifty,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: Dimens.twentyFive,
    height: Dimens.twentyFive,
  },

  ProfilePic: {
    height: Dimens.seventy,
    width: Dimens.seventy,
    borderRadius: Dimens.thirtyFive,
  },
  headerContainerStyle: {
    marginVertical: Dimens.fifteen,
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.thirtyFive
          : Dimens.thirty
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
  nameStyle: {
    color: Colors.profileHeadingTextColor,
    fontSize: Dimens.twentySeven,
    fontFamily: Fonts.SourceSansProSemibold,
  },

  swipeButtonStyle: {
    textAlign: 'center',
    fontSize: Dimens.eighteen,
    padding: Dimens.ten,
    borderRadius: Dimens.twenty,
    marginHorizontal: Dimens.ten,
    color: '#8c52ff',
    fontFamily: Fonts.SourceSansProBold,
  },
});
