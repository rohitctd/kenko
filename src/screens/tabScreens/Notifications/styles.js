import {StyleSheet, Platform} from 'react-native';
import {Colors, Dimens, isIphoneXorAbove, Fonts} from '../../../utils/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.notificationBackgroundColor,
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
    position: 'absolute',
    marginTop: Dimens.twentyFive,
    width: '100%',
    bottom: Dimens.zero,
    borderTopLeftRadius: Dimens.twentyFive,
    borderTopRightRadius: Dimens.twentyFive,
    backgroundColor:'white',
    top:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.hundred
          : Dimens.seventy
        : Dimens.fifty,
  },
  notificationDetailContainer: {
    flex: 1,
    backgroundColor: Colors.notificationHeaderBackground,
    borderTopLeftRadius: Dimens.twentyFive,
    borderTopRightRadius: Dimens.twentyFive,
  },
  notificationHeaderStyle: {
    height: Dimens.sixty,
    padding: Dimens.eighteen,
    color: Colors.notificationHeaderTextColor,
    fontSize: Dimens.eighteen,
    fontFamily: Fonts.SourceSansProBold,
    backgroundColor: Colors.notificationHeaderBackground,
    overflow: 'hidden',
    borderTopLeftRadius: Dimens.twentyFive,
    borderTopRightRadius: Dimens.twentyFive,
  },
  itemContainer: {
    flex: 1,
    paddingHorizontal: Dimens.fifteen,
    paddingVertical: Dimens.twentyFive,
    marginBottom: Dimens.five,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  imageStyle: {
    width: Dimens.fifty,
    height: Dimens.fifty,
    borderRadius: Dimens.twentyFive,
  },
  dateStyle: {
    flex: 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Dimens.fifteen,
    color: Colors.blackAplha,
    fontFamily: Fonts.SourceSansProRegular,
  },
  detailStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: Dimens.eighteen,
    marginLeft: Dimens.tweleve,
    color: Colors.titleTextColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
});
