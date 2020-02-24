import {StyleSheet, Platform} from 'react-native';
import {Dimens, isIphoneXorAbove, Colors, Fonts} from '../../../../utils/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.dashBoardBackground,
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
    paddingTop: Dimens.twentyFive,
    flex: 0.9,
  },
  headingContainer: {
    height: Dimens.sixty,
    backgroundColor: Colors.orderHeaderTextColor,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
  },
  headerTextStyle: {
    fontSize: Dimens.twenty,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: Dimens.twenty,
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Dimens.ten,
    color: Colors.titleTextColor,
    fontFamily: Fonts.SourceSansProBold,
  },
  iconText: {
    color: Colors.profileBackgroundColor,
    textAlign: 'center',
    marginTop: Dimens.one,
    marginRight: Dimens.ten,
    fontSize: Dimens.twenty,
  },
  flatlistContainer: {
    flex: 0.85,
    backgroundColor: '#f5f5f5',
  },
  divider: {width: '100%', height: Dimens.two},

  itemStyle: {
    flexDirection: 'row',
    marginTop: Dimens.five,
    paddingVertical: Dimens.ten,
    backgroundColor: Colors.white,
  },
  leftContainer: {
    flex: 1,
    padding: Dimens.twenty,
  },
  dateStyle: {
    fontFamily: Fonts.SourceSansProRegular,
    color: '#898989',
    fontSize: Dimens.eighteen,
  },
  signStyle: {
    fontFamily: Fonts.SourceSansProBold,
    color: Colors.titleTextColor,
    marginTop: Dimens.seven,
    fontSize: Dimens.twenty,
  },
  detailStyle: {
    fontFamily: Fonts.SourceSansProBold,
    color: Colors.titleTextColor,
    marginTop: Dimens.two,
    fontSize: Dimens.twenty,
  },
  iconStyle: {
    flex: 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: Dimens.fifteen,
  },
  swipeButtonStyle: {
    textAlign: 'center',
    fontSize: Dimens.sixteen,
    paddingVertical: Dimens.ten,
    paddingLeft: Dimens.fifteen,
    borderRadius: Dimens.twenty,
    marginHorizontal: Dimens.ten,
    color: Colors.dashBoardBackground,
    fontFamily: Fonts.SourceSansProBold,
  },
});
