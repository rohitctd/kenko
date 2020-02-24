import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Colors, Dimens, isIphoneXorAbove, Fonts} from '../../../../utils/Theme';
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.rewardScreenBackground,
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
  item: {
    elevation: Dimens.two,
    width: '80%',
    height: '85%',
    borderRadius: Dimens.ten,
    backgroundColor: Colors.rewardScreenBackground,
  },
  imageContainer: {
    width: '90%',
    height: '100%',
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: Colors.black,
    borderRadius: Dimens.ten,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  mainHeadingContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderTopLeftRadius: Dimens.twenty,
    overflow: 'hidden',
    borderTopRightRadius: Dimens.twenty,
  },
  mainImageContainer: {
    height: Dimens.fourHundred,
    width: '100%',
  },
  redemptionStyle: {
    height: Dimens.threeHundred,
    width: '100%',
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    marginTop: -Dimens.twenty,
  },
  redemptionHeaderStyle: {
    fontSize: Dimens.eighteen,
    height: Dimens.sixty,
    paddingVertical: Dimens.fifteen,
    paddingHorizontal: Dimens.twenty,
    fontFamily: Fonts.SourceSansProBold,
    backgroundColor: Colors.white,
    color: Colors.headerTextStyle,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    overflow: 'hidden',
  },
  carouselStyle: {
    marginTop: Dimens.ten,
    marginBottom: Dimens.twenty,
  },
  detailContainer: {
    width: '100%',
    marginTop: -Dimens.twenty,
  },
  detailHeaderStyle: {
    paddingVertical: Dimens.fifteen,
    backgroundColor: Colors.rewardScreenBackground,
    paddingHorizontal: Dimens.twenty,
    fontFamily: Fonts.SourceSansProBold,
    color: Colors.white,
    height: Dimens.sixty,
    fontSize: Dimens.eighteen,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    overflow: 'hidden',
  },
  detailBackgroundColor: {
    backgroundColor: Colors.rewardScreenBackground,
  },
  detaiolStyling: {
    fontFamily: Fonts.SourceSansProRegular,
    color: Colors.white,
    fontSize: Dimens.sixteen,
    paddingVertical: Dimens.ten,
    paddingHorizontal: Dimens.twenty,
    backgroundColor: Colors.rewardScreenBackground,
  },
  benefitsHeaderStyling: {
    fontFamily: Fonts.SourceSansProBold,
    color: Colors.white,
    fontSize: Dimens.eighteen,
    paddingBottom: Dimens.ten,
    paddingHorizontal: Dimens.twenty,
  },
  benefitsDetailsStyling: {
    fontFamily: Fonts.SourceSansProRegular,
    color: Colors.white,
    fontSize: Dimens.sixteen,
    paddingHorizontal: Dimens.thirty,
    paddingBottom: Dimens.five,
  },
  terminationHeaderStyle: {
    fontFamily: Fonts.SourceSansProBold,
    color: Colors.white,
    fontSize: Dimens.eighteen,
    paddingVertical: Dimens.ten,
    paddingHorizontal: Dimens.twenty,
  },
  terminationDetailStyle: {
    fontFamily: Fonts.SourceSansProRegular,
    color: Colors.white,
    fontSize: Dimens.sixteen,
    paddingVertical: Dimens.ten,
    paddingHorizontal: Dimens.twenty,
  },
});
