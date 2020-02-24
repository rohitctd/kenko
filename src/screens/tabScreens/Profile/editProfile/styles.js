import {StyleSheet, Platform} from 'react-native';
import {Dimens, isIphoneXorAbove, Colors, Fonts} from '../../../../utils/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.profileBackgroundColor,
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.fifty
          : Dimens.twenty
        : Dimens.Zero,
  },
  imageStyle: {
    width: Dimens.hundred,
    height: Dimens.hundred,
    alignSelf: 'center',
    borderRadius: Dimens.fifty,
    marginBottom: Dimens.fifteen,
    backgroundColor: '#ccc',
    borderWidth: StyleSheet.hairlineWidth,
  },
  backIconStyle: {
    position: 'absolute',
    paddingTop: Dimens.fifteen,
    paddingBottom: Dimens.thirty,
    paddingHorizontal: Dimens.fifteen,
  },
  profileHeaderTextStyle: {flex: 0.1},
  mainHeadingContainer: {
    flex: 0.9,
    paddingTop: Dimens.twentyFive,
  },
  headingContainer: {
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    backgroundColor: Colors.white,
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
    color: Colors.notificationHeaderTextColor,
    fontFamily: Fonts.SourceSansProBold,
  },
  orderContainer: {
    flex: 1,
    paddingTop: Dimens.twenty,
    paddingBottom: Dimens.thirty,
    paddingHorizontal: Dimens.twenty,
    fontSize: Dimens.twenty,
    backgroundColor: Colors.white,
  },
  labelText: {
    paddingVertical: Dimens.three,
    fontSize: Dimens.seventeen,
    color: Colors.notificationHeaderTextColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
  textInput: {
    paddingBottom: Dimens.five,
    fontSize: Dimens.seventeen,
    color: Colors.headingTextColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontFamily: Fonts.SourceSansProSemibold,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: Dimens.fifteen,
  },
  saveButtonStyle: {
    padding: Dimens.ten,
    backgroundColor: Colors.profileBackgroundColor,
    textAlign: 'center',
    color: Colors.loginTextColor,
    fontSize: Dimens.twenty,
    fontFamily: Fonts.SourceSansProSemibold,
    borderRadius: Dimens.tweleve,
    marginVertical: Dimens.twentyFive,
  },
  selectInputLarge: {
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 7,
      },
      android: {
        flex: 1,
      },
    }),
  },
  selectInputInner: {
    fontFamily: Fonts.SourceSansProSemibold,
    color: Colors.notificationHeaderTextColor,
    ...Platform.select({
      ios: {fontSize: Dimens.fourteen},
      android: {fontSize: Dimens.fourteen},
    }),
  },
});
