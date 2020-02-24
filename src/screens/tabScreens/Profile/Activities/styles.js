import {StyleSheet, Platform} from 'react-native';
import {Colors, Dimens, isIphoneXorAbove, Fonts} from '../../../../utils/Theme';

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
  mainHeadingContainer: {
    flex: 1,
    width: '100%',
    marginTop: Dimens.fifteen,
  },
  activityStatsStyle: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    fontSize: Dimens.twentyFour,
    paddingTop: Dimens.twentyFive,
    color: Colors.profileHeadingTextColor,
  },
  countStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: Colors.profileHeadingTextColor,
    marginLeft: -Dimens.fifteen,
  },
  countTextStyle: {
    fontSize: Dimens.fourtyFive,
    color: Colors.profileHeadingTextColor,
    fontFamily: Fonts.SourceSansProBold,
  },
  countDetailStyle: {
    fontSize: Dimens.fifteen,
    color: Colors.profileHeadingTextColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: Colors.orderHeaderTextColor,
  },
  mainItemContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: Dimens.five,
  },
  itemContainer: {
    flex: 1,
    paddingHorizontal: Dimens.eighteen,
    paddingVertical: Dimens.twenty,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  imageStyle: {
    width: Dimens.fifty,
    height: Dimens.fifty,
    borderRadius: Dimens.twentyFive,
  },
  detailStyle: {
    textAlign: 'left',
    fontSize: Dimens.eighteen,
    marginLeft: Dimens.tweleve,
    color: Colors.dimTextColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
  titleStyle: {
    textAlign: 'left',
    fontSize: Dimens.eighteen,
    marginLeft: Dimens.tweleve,
    color: Colors.black,
    fontFamily: Fonts.SourceSansProBold,
  },
  actionTypeStyle: {
    marginLeft: Dimens.ten,
    textAlign: 'center',
    fontSize: Dimens.fifteen,
    paddingHorizontal: Dimens.ten,
    color: Colors.white,
    fontFamily: Fonts.SourceSansProSemibold,
    borderRadius: Dimens.ten,
    overflow: 'hidden',
  },
  dateStyle: {
    textAlign: 'right',
    fontSize: Dimens.fifteen,
    color: Colors.dimTextColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
  featureStyle: {
    paddingVertical: Dimens.ten,
    textAlign: 'left',
    fontSize: Dimens.eighteen,
    marginLeft: Dimens.tweleve,
    color: Colors.black,
    fontFamily: Fonts.SourceSansProBold,
  },
  activityHeader: {
    marginTop: Dimens.ten,
    height: Dimens.sixty,
    justifyContent: 'space-around',
    flexDirection: 'column',
    fontSize: Dimens.twentyFour,
    color: Colors.profileHeadingTextColor,
    borderTopLeftRadius: Dimens.twentyFive,
    borderTopRightRadius: Dimens.twentyFive,
    backgroundColor: Colors.orderHeaderTextColor,
  },
  activityTextStyle: {
    fontSize: Dimens.twenty,
    color: Colors.profileHeadingTextColor,
    paddingHorizontal: Dimens.thirty,
    color: Colors.titleTextColor,
    fontFamily: Fonts.SourceSansProBold,
  },

  swipeButtonStyle: {
    textAlign: 'center',
    fontSize: Dimens.sixteen,
    padding: Dimens.ten,
    borderRadius: Dimens.twenty,
    marginLeft: Dimens.twenty,
    color: Colors.activityBackgroundColor,
    fontFamily: Fonts.SourceSansProBold,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Dimens.ten,
  },

  nextButtonContainer: {
    marginTop: Dimens.five,
    paddingHorizontal: Dimens.eighty,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconText: {
    color: Colors.activityBackgroundColor,
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: Dimens.one,
    marginRight: Dimens.ten,
    fontSize: Dimens.eighteen,
    fontFamily: Fonts.SourceSansProRegular,
  },
  emptyContainer: {
    flex: 1,
    marginTop: Dimens.oneFifty,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextStyle: {
    alignItems: 'center',
    textAlign: 'center',
    color: 'black',
    fontFamily: Fonts.SourceSansProSemibold,
    fontSize: Dimens.twentyFive,
  },

  recentItemStyle: {
    flexDirection: 'row',
    marginBottom: Dimens.five,
    backgroundColor: Colors.white,
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

  profileHeaderTextStyle: {flex: 0.1},
  backIconStyle: {
    position: 'absolute',
    paddingTop: Dimens.fifteen,
    paddingBottom: Dimens.thirty,
    paddingHorizontal: Dimens.fifteen,
  },
});
