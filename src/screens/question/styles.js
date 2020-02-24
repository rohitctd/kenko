import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Dimens, Colors, isIphoneXorAbove, Fonts} from '../../utils/Theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: Dimens.twenty,
    backgroundColor: Colors.loginBackground,
  },
  videoScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: Dimens.twentyFive,
    backgroundColor: Colors.loginBackground,
  },
  iconContainer: {
    flex: 1,
    marginTop: wp(5),
    marginLeft:
      DeviceInfo.getDeviceType() === 'Tablet' || Platform.isPad
        ? wp(25)
        : wp(10),

    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: Dimens.thirty,
    marginHorizontal: Dimens.twenty,
  },
  iconText: {
    color: Colors.loginTextColor,
    textAlign: 'center',
    fontFamily: Fonts.SourceSansProRegular,
    marginTop: Dimens.one,
    marginLeft: Dimens.twenty,
    fontSize: Dimens.twentyTwo,
  },

  nextIconText: {
    color: Colors.loginTextColor,
    textAlign: 'center',
    marginBottom: Dimens.three,
    fontSize: Dimens.twenty,
    fontFamily: Fonts.SourceSansProRegular,
  },
  iconStyle: {
    width: Dimens.twentyFive,
    height: Dimens.twentyFive,
  },

  silentOvalStyle: {
    borderRadius: Dimens.thirty,
    backgroundColor: '#5ce1e6ff',
    width: Dimens.fifty,
    height: Dimens.fifty,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selfieOvalStyle: {
    borderRadius: Dimens.thirty,
    backgroundColor: '#f52ebf',
    width: Dimens.fifty,
    height: Dimens.fifty,
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailsOvalStyle: {
    borderRadius: Dimens.thirty,
    backgroundColor: '#7ed958',
    width: Dimens.fifty,
    height: Dimens.fifty,
    alignItems: 'center',
    justifyContent: 'center',
  },

  giftOvalStyle: {
    borderRadius: Dimens.thirty,
    backgroundColor: '#f7b500',
    width: Dimens.fifty,
    height: Dimens.fifty,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonSignInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Dimens.ten,
    marginLeft: Dimens.fifteen,
  },
  textSignUp: {
    color: Colors.loginTextColor,
    textAlign: 'center',
    fontSize: Dimens.fourteen,
  },
  textSignIn: {
    fontSize: Dimens.fourteen,
    color: Colors.textTokenColor,
    textAlign: 'center',
    padding: Dimens.ten,
  },
  welcomeHeader: {
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.oneFifty
          : Dimens.eighty
        : Dimens.eighty,
    fontSize: Dimens.fourty,
    color: Colors.loginTextColor,
    textAlign: 'center',
    fontFamily: Fonts.SourceSansProBlack,
  },
  eventHeader: {
    color: Colors.loginTextColor,
    fontSize: Dimens.fifteen,
    textAlign: 'center',
    marginTop: Dimens.ten,
    marginStart: Dimens.seventy,
    marginEnd: Dimens.seventy,
  },
  textHeaderI: {
    color: Colors.loginTextColor,
    textAlign: 'center',
    marginTop: Dimens.twentyFive,
    fontSize: Dimens.thirty,
    fontFamily: Fonts.SourceSansProBold,
    lineHeight: Dimens.thirty,
  },

  textHeaderSecond: {
    color: Colors.loginTextColor,
    textAlign: 'center',
    marginTop: Dimens.one,
    fontSize: Dimens.thirty,
    fontFamily: Fonts.SourceSansProBold,
    lineHeight: Dimens.thirtyTwo,
  },

  ageTextHeader: {
    color: Colors.loginTextColor,
    textAlign: 'center',
    fontSize: Dimens.twentyFive,
    fontFamily: Fonts.SourceSansProRegular,
  },
  textHeaderII: {
    marginLeft: Dimens.two,
    paddingHorizontal: Dimens.ten,
    color: Colors.appOrange,
    textAlign: 'left',
    includeFontPadding: false,
    fontSize: Dimens.thirty,
    fontFamily: Fonts.SourceSansProBold,
    lineHeight: Dimens.thirtyFive,
    marginTop: Platform.OS == 'ios' ? -Dimens.three : -Dimens.fifteen,
  },
  textHeaderIII: {
    color: Colors.appOrange,
    textAlign: 'left',
    marginTop: Platform.OS == 'ios' ? -Dimens.three : -Dimens.fifteen,
    paddingHorizontal: Dimens.seven,
    fontSize: Dimens.thirty,
    fontFamily: Fonts.SourceSansProBold,
    lineHeight: Dimens.thirtyFive,
  },

  andTextHeader: {
    color: Colors.editTextColor,
    textAlign: 'center',
    marginTop: Dimens.one,
    fontSize: Dimens.thirtyFive,
    fontWeight: '700',
    lineHeight: Dimens.thirtyTwo,
  },
  nextButtonContainer: {
    bottom: Dimens.twenty,
    right: Dimens.twenty,
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftIcon: {
    position: 'absolute',
    paddingLeft: Dimens.twenty,
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.fifty
          : Dimens.thirtyFive
        : Dimens.twenty,
  },
  // Question1
  question1HeaderI: {
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.oneFifty
          : Dimens.eighty
        : Dimens.eighty,
    fontSize: Dimens.thirtyTwo,
    color: Colors.loginTextColor,
    textAlign: 'center',
  },
  question1HeaderII: {
    color: Colors.loginTextColor,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: Dimens.thirtyTwo,
  },

  bottomViewHeading: {
    marginHorizontal: Dimens.twenty,
    alignSelf: 'center',
    width: '100%',
    height: Dimens.hundred,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 17, //Here is the trick
  },

  bottomTextHeading: {
    textAlign: 'center',
    width: '100%',
    marginTop: Dimens.fourty,
    color: '#ffffff',
    fontFamily: 'Source Sans Pro',
    fontSize: Dimens.sixteen,
    fontFamily: Fonts.SourceSansProRegular,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  questionIcon: {
    height: Dimens.twenty,
    width: Dimens.twenty,
    padding: Dimens.ten,
  },
  // Question2

  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  timerText: {
    color: Colors.white,
    fontFamily: Fonts.SourceSansProSemibold,
    fontSize: Dimens.eighteen,
  },
  rotateIconStyle: {
    padding: Dimens.five,
    height: Dimens.twentyFive,
    width: Dimens.twentyFive,
  },
  counterStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshStyle: {
    height: Dimens.twentyThree,
    width: Dimens.twentyThree,
  },
  refreshContainer: {
    height: Dimens.twentyThree,
    width: Dimens.twentyThree,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: Dimens.sixty,
  },
  cameraButtonStyling: {
    width: Dimens.sixtyFive,
    height: Dimens.sixtyFive,
    alignSelf: 'center',
  },
  cameraButtonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: Dimens.seventy,
    height: Dimens.seventy,
    borderRadius: Dimens.seventy,
    borderWidth: Dimens.one,
    marginTop: -Dimens.thirtyFive,
  },
  mediaPlayerStyling: {
    width: '100%',
    overflow: 'hidden',
    height: Dimens.threeFifty,
  },
  faceRecognitionStyling: {
    alignSelf: 'center',
    padding: Dimens.five,
    height: Dimens.twoHundred,
    width: Dimens.twoHundred,
  },
  cameraStyling: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: Dimens.thirty,
  },
  vedioContainer: {
    width: '100%',
    height: Dimens.threeFifty,
    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: Dimens.seven,
  },
  mainContainerForVideo: {
    height: Dimens.threeFifty,
    marginTop: Dimens.thirtyFive,
    borderRadius: Dimens.seven,
  },
  backButtonContainer: {
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.thirtyFive
          : Dimens.twenty
        : Dimens.Zero,
  },

  viewContainer: {
    width: width,
    height: height - 20,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
  },
  listContainer: {
    width: '60%',
    height: '30%',
    marginRight: Dimens.ten,
    backgroundColor: 'white',
  },
  itemSeperator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.loginBackground,
  },
});
