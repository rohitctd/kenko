import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

import {Dimens, Colors, isIphoneXorAbove, Fonts} from '../../utils/Theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    height: height,
    flexDirection: 'column',
    padding: Dimens.thirty,
    backgroundColor: Colors.loginBackground,
  },
  textOr: {
    color: Colors.loginTextColor,
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: Dimens.ten,
  },
  buttonSignInContainer: {
    marginTop: '3%',
    width: '40%',
    borderRadius: Dimens.ten,
    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: Colors.loginTextColor,
    borderColor: Colors.loginTextColor,
  },
  textSignIn: {
    padding: Dimens.ten,
    fontSize: Dimens.twenty,
    color: Colors.loginBackground,
    fontFamily: Fonts.SourceSansProSemibold,
  },
  textInput: {
    marginTop: Dimens.thirty,
    fontSize: Dimens.fourty,
    borderColor: Colors.loginTextColor,
    paddingVertical: Dimens.twenty,
    paddingRight: Dimens.twenty,
    color: Colors.loginTextColor,
    textAlign: 'left',
    fontFamily: Fonts.SourceSansProRegular,
  },
  welcomeHeader: {
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.oneFifty
          : Dimens.eighty
        : Dimens.eighty,
    fontSize: Dimens.thirtyTwo,
    color: Colors.loginTextColor,
    textAlign: 'left',
    fontFamily: Fonts.SourceSansProBold,
  },
  textHeaderI: {
    color: Colors.loginTextColor,
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: Dimens.fifteen,
    marginTop: Dimens.five,
    fontFamily: Fonts.SourceSansProRegular,
  },
});
