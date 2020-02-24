import {StyleSheet, Platform} from 'react-native';
import {Dimens, Colors, isIphoneXorAbove, Fonts} from '../../utils/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: Dimens.thirty,
    backgroundColor: Colors.loginBackground,
  },
  textInput: {
    borderWidth: Dimens.one,
    borderColor: 'rgba(255, 255, 255, 0.33)',
    fontSize: Dimens.fourteen,
    color: Colors.loginTextColor,
    textAlign: 'center',
    fontSize: Dimens.twentyFive,
  },
  welcomeHeader: {
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.oneFifty
          : Dimens.eighty
        : Dimens.eighty,
    fontSize: Dimens.thirty,
    color: Colors.loginTextColor,
    textAlign: 'left',
    fontFamily: Fonts.SourceSansProBold,
  },
  textHeaderI: {
    color: Colors.loginTextColor,
    textAlign: 'left',
    marginTop: Dimens.fifteen,
    fontFamily: 'Source Sans Pro',
    fontSize: Dimens.sixteen,
    fontFamily: Fonts.SourceSansProRegular,
  },
  leftIcon: {
    position: 'absolute',
    paddingHorizontal: Dimens.twenty,
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.fifty
          : Dimens.thirtyFive
        : Dimens.twenty,
  },
  textResend: {
    textAlign: 'left',
    color: Colors.loginTextColor,
    fontSize: Dimens.sixteen,
    fontFamily: Fonts.SourceSansProBold,
  },
});
