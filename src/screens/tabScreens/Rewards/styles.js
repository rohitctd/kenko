import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Colors, Dimens, isIphoneXorAbove, Fonts} from '../../../utils/Theme';
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.rewardScreenBackground,
    flexDirection: 'column',
  },
  headerContainer: {
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.eighty
          : Dimens.FourtyFive
        : Dimens.twentyFive,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextStyle: {
    fontSize: Dimens.twentyFour,
    color: Colors.profileHeadingTextColor,
    fontFamily: Fonts.SourceSansProSemibold,
  },
  mainHeadingContainer: {
    flex: 1,
    width: '100%',
    marginTop: Dimens.fifteen,
  },
  kenkoCreditsStyle: {
    backgroundColor: Colors.white,
    paddingHorizontal: Dimens.twentyFive,
    paddingVertical: Dimens.two,
    borderTopLeftRadius: Dimens.twentyFive,
    borderBottomLeftRadius: Dimens.twentyFive,
  },
  kenkoHeaderStyle: {
    fontSize: Dimens.fifteen,
    paddingTop: Dimens.two,
    color: Colors.rewardScreenBackground,
    fontFamily: Fonts.SourceSansProRegular,
  },
  kenkoPointStyle: {
    color: Colors.rewardScreenBackground,
    fontSize: Dimens.sixteen,
    fontFamily: Fonts.SourceSansProBold,
  },

  bottomContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  bottomTabBarContainer: {
    marginTop: Dimens.ten,
    marginBottom: Dimens.fifteen,
    height: Dimens.fourty,
    width: screenWidth,
    paddingLeft: Dimens.ten,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  bottomGridContainer: {
    width: screenWidth,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomGridItemContainer: {
    marginLeft: Dimens.five,
    marginRight: Dimens.ten,
    marginTop: Dimens.twenty,
    marginBottom: Dimens.twenty,
    width: (screenWidth * Dimens.threeHundred) / Dimens.threeSeventyFive,
    height: screenHeight / 1.7 - Dimens.seventy,
    backgroundColor: '#5677f1',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: Dimens.ten,
  },
  item: {
    width: screenWidth - Dimens.hundred,
    height: '85%',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: Dimens.eight,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    fontSize: Dimens.twenty,
    fontFamily: Fonts.SourceSansProSemibold,
    marginVertical: Dimens.twenty,
    color: Colors.white,
  },
  staticImage: {
    width: '70%',
    height: '83%',
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: Dimens.eight,
  },
});
