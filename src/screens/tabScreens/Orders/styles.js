import {StyleSheet, Platform} from 'react-native';
import {Dimens, isIphoneXorAbove, Colors, Fonts} from '../../../utils/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.activityBackgroundColor,
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.fifty
          : Dimens.twenty
        : Dimens.Zero,
  },
  backIconStyle: {
    position: 'absolute',
    paddingTop: Dimens.fifteen,
    paddingBottom: Dimens.thirty,
    paddingHorizontal: Dimens.fifteen,
  },
  profileHeaderTextStyle: {flex: 0.1},

  mainHeadingContainer: {
    paddingTop: Dimens.fourty,
    flex: 1,
  },
  headingContainer: {
    height: Dimens.sixty,
    backgroundColor: Colors.orderHeaderTextColor,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
  },
  headerTextStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: Dimens.twenty,
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Dimens.ten,
    color: Colors.textHeadingColor,
    fontFamily: Fonts.SourceSansProBold,
  },
  mainHeaderTextStyle: {
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
    fontWeight: 'normal',
    marginTop: Dimens.one,
    marginRight: Dimens.ten,
    fontSize: Dimens.twenty,
  },
  orderNumberStyle: {
    fontSize: Dimens.fifteen,
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
  orderContainer: {
    fontSize: Dimens.twenty,
    paddingVertical: Dimens.thirty,
    paddingHorizontal: Dimens.fifteen,
    height: Dimens.threeFifty,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchContainer: {
    backgroundColor: Colors.loginTextColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {paddingLeft: Dimens.fifteen, paddingRight: Dimens.ten},
  searchTextInput: {
    flex: 1,
    fontSize: Dimens.sixteen,
    paddingTop: Dimens.ten,
    paddingRight: Dimens.ten,
    paddingBottom: Dimens.ten,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: Colors.activityBackgroundColor,
    fontFamily: Fonts.SourceSansProSemibold,
  },
  flatlistContainer: {
    flex: 0.9,
    backgroundColor: Colors.orderHeaderTextColor,
  },
  divider: {width: '100%', height: Dimens.two},
  orderAndDateStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Dimens.ten,
  },
  PlanContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  planImageConatiner: {
    width: Dimens.fifty,
    height: Dimens.fifty,
    borderRadius: Dimens.twentyFive,
    marginHorizontal: Dimens.five,
  },
});
