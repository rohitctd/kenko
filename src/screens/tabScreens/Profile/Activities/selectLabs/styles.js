import {StyleSheet, Platform} from 'react-native';
import {
  Dimens,
  isIphoneXorAbove,
  Colors,
  Fonts,
} from '../../../../../utils/Theme';

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
    paddingTop: Dimens.twentyFive,
    flex: 0.9,
  },
  headingContainer: {
    height: Dimens.sixtyFive,
    backgroundColor: Colors.orderHeaderTextColor,
    borderTopLeftRadius: Dimens.twentyFive,
    borderTopRightRadius: Dimens.twentyFive,
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
  nameStyle: {
    fontSize: Dimens.twenty,
    alignSelf: 'flex-start',
    textAlign: 'left',
    justifyContent: 'center',
    paddingLeft: Dimens.fifteen,
    color: Colors.black,
    fontFamily: Fonts.SourceSansProBold,
  },
  addressStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingRight: Dimens.ten,
    paddingLeft: Dimens.fifteen,
    color: '#5a6571',
    fontFamily: Fonts.SourceSansProRegular,
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: Dimens.two,
    fontSize: Dimens.twenty,
    paddingVertical: Dimens.thirty,
    paddingHorizontal: Dimens.fifteen,
    backgroundColor: Colors.loginTextColor,
  },
  searchContainer: {
    backgroundColor: Colors.loginTextColor,
    marginTop: Dimens.five,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Dimens.ten,
  },
  iconStyle: {
    paddingLeft: Dimens.fifteen,
    paddingRight: Dimens.ten,
  },
  flatlistContainer: {
    flex: 0.9,
    backgroundColor: Colors.orderHeaderTextColor,
  },
  divider: {
    width: '100%',
    height: Dimens.two,
  },
  PlanContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  planImageConatiner: {
    flex: 0.2,
    width: Dimens.fifty,
    height: Dimens.fifty,
    borderRadius: Dimens.twentyFive,
    marginHorizontal: Dimens.five,
  },
  distanceStyle: {
    fontSize: Dimens.eighteen,
    textAlign: 'left',
    fontFamily: Fonts.SourceSansProBold,
  },
  locationLabelStyle: {
    fontSize: Dimens.eighteen,
    textAlign: 'left',
    color: '#6e6e6e',
    fontFamily: Fonts.SourceSansProSemibold,
  },
  directionLabelStyle: {
    fontSize: Dimens.twenty,
    textAlign: 'left',
    color: Colors.activityBackgroundColor,
    paddingLeft: Dimens.ten,
    fontFamily: Fonts.SourceSansProRegular,
  },
});
