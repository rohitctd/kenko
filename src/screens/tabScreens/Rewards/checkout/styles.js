import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Colors, Dimens, isIphoneXorAbove, Fonts} from '../../../../utils/Theme';
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dashBoardBackground,
    flexDirection: 'column',
  },
  headerTextStyle: {
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.sixtyFive
          : Dimens.thirtyFive
        : Dimens.fifteen,
    paddingHorizontal: Dimens.fifteen,
    paddingBottom: Dimens.fifteen,
    flexDirection: 'row',
  },
  mainHeadingContainer: {
    backgroundColor: Colors.orderHeaderTextColor,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
  },
  headerStyle: {
    fontFamily: Fonts.SourceSansProSemibold,
    color: Colors.white,
    fontSize: Dimens.twentyFive,
    paddingHorizontal: Dimens.twentyFive,
  },
  creditStyling: {
    fontFamily: Fonts.SourceSansProRegular,
    color: Colors.white,
    fontSize: Dimens.twenty,
    paddingTop: Dimens.five,
    paddingHorizontal: Dimens.twentyFive,
  },
  headingContainerStyling: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: Dimens.twenty,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    overflow: 'hidden',
  },
  firstHeaderContainerStyling: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: Dimens.twentyFive,
    paddingVertical: Dimens.twentyFive,
  },
  firstHeaderStyling: {
    fontFamily: Fonts.SourceSansProBold,
    color: Colors.black,
    fontSize: Dimens.twentyTwo,
  },
  secondHeaderStyling: {
    fontFamily: Fonts.SourceSansProRegular,
    color: Colors.dimTextColor,
    fontSize: Dimens.sixteen,
  },
  chooseToPay: {
    fontFamily: Fonts.SourceSansProBold,
    color: Colors.black,
    fontSize: Dimens.eighteen,
    paddingBottom: Dimens.twentyFive,
    paddingHorizontal: Dimens.twentyFive,
  },
  flatListDivider: {
    backgroundColor: Colors.orderHeaderTextColor,
    height: Dimens.five,
    width: '100%',
  },
  itemIndexContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Dimens.fifteen,
    paddingHorizontal: Dimens.twenty,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyling: {
    height: Dimens.seventy,
    width: Dimens.seventy,
    borderRadius: Dimens.thirtyFive,
    borderWidth: Dimens.one,
    borderColor: Colors.dimTextColor,
  },
  textStyling: {
    fontFamily: Fonts.SourceSansProSemibold,
    color: Colors.black,
    fontSize: Dimens.seventeen,
    marginLeft: Dimens.twenty,
  },
  payNowStyling: {
    fontFamily: Fonts.SourceSansProSemibold,
    color: Colors.dashBoardBackground,
    fontSize: Dimens.seventeen,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  divider: {height: Dimens.five, width: '100%'},
  swipeButtonStyle: {
    textAlign: 'center',
    fontSize: Dimens.eighteen,
    paddingVertical: Dimens.ten,
    paddingLeft: Dimens.fifteen,
    borderRadius: Dimens.twenty,
    marginHorizontal: Dimens.ten,
    color: Colors.dashBoardBackground,
    fontFamily: Fonts.SourceSansProBold,
  },
});
