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
  backIconStyle: {
    position: 'absolute',
    paddingTop: Dimens.fifteen,
    paddingBottom: Dimens.thirty,
    paddingHorizontal: Dimens.fifteen,
  },
  profileHeaderTextStyle: {flex: 0.12},
  mainHeadingContainer: {
    flex: 0.9,
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
    paddingHorizontal: Dimens.twenty,
    backgroundColor: Colors.white,
  },

  labelText: {
    paddingVertical: Dimens.ten,
    fontSize: Dimens.seventeen,
    color: Colors.notificationHeaderTextColor,
    fontFamily: Fonts.SourceSansProRegular,
  },
  textInput: {
    flex:1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: Dimens.five,
    paddingBottom: Dimens.ten,
    fontSize: Dimens.seventeen,
    color: Colors.notificationHeaderTextColor,
    fontFamily: Fonts.SourceSansProSemibold,
  },
  listContainer: {
    width: '100%',
    marginRight: Dimens.ten,
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: Dimens.two,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: Dimens.ten,
  },
  saveButtonStyle: {
    padding: Dimens.ten,
    backgroundColor: Colors.profileBackgroundColor,
    textAlign: 'center',
    color: Colors.loginTextColor,
    fontSize: Dimens.twenty,
    borderRadius: Dimens.ten,
    marginVertical: Dimens.twentyFive,
    fontFamily: Fonts.SourceSansProSemibold,
  },
});
