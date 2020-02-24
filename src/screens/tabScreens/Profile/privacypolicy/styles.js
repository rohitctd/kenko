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
    flex: .9,
    paddingTop: Dimens.ten,
  },
  headingContainer: {
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    backgroundColor: Colors.white,
    fontFamily: Fonts.SourceSansProBold,
  },
  headerTextStyle: {
    fontSize: Dimens.sixteen,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: Dimens.twenty,
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Dimens.ten,
    color: Colors.textHeadingColor,
    fontWeight: '500',
  },
  orderContainer: {
    paddingTop: Dimens.fifteen,
    marginTop: Dimens.one,
    fontSize: Dimens.twenty,
    paddingHorizontal: Dimens.twenty,
    backgroundColor: Colors.white,
  },
  privacyPolicyTextStyle: {
    fontFamily: Fonts.SourceSansProRegular,
    textAlign: 'justify',
    fontSize: Dimens.eighteen,
    color: Colors.textHeadingColor,
    marginTop: Dimens.five,
  },
});
