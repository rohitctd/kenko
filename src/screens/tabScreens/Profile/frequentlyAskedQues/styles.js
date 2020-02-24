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
  profileHeaderTextStyle: {flex: 0.1},
  mainHeadingContainer: {
    paddingTop: Dimens.fifteen,
    flex: 0.9,
  },
  headingContainer: {
    backgroundColor: Colors.notificationHeaderBackground,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    fontFamily: Fonts.SourceSansProBold,
    fontSize: Dimens.eighteen,
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
    color: '#2e2e2e',
    fontFamily: Fonts.SourceSansProBold,
  },
  flatlistContainer: {
    flex: 0.9,
    backgroundColor: Colors.orderHeaderTextColor,
  },
  orderContainer: {
    flex: 1,
    paddingVertical: Dimens.ten,
    paddingHorizontal: Dimens.twenty,
    fontSize: Dimens.twenty,
    backgroundColor: Colors.white,
  },
  labelText: {
    paddingVertical: Dimens.ten,
    fontSize: Dimens.eighteen,
    color: Colors.notificationHeaderTextColor,
  },
  textInput: {
    paddingTop: Dimens.five,
    paddingBottom: Dimens.ten,
    fontSize: Dimens.eighteen,
    color: Colors.notificationHeaderTextColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    fontWeight: 'bold',
    borderRadius: Dimens.ten,
    marginVertical: Dimens.twentyFive,
  },
});
