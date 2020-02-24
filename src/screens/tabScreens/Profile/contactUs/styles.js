import { StyleSheet, Platform } from "react-native";
import {
  Dimens,
  isIphoneXorAbove,
  Colors,
  Fonts
} from "../../../../utils/Theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.profileBackgroundColor,
    paddingTop:
      Platform.OS == "ios"
        ? isIphoneXorAbove()
          ? Dimens.fifty
          : Dimens.twenty
        : Dimens.Zero
  },
  backIconStyle: {
    position: "absolute",
    paddingTop: Dimens.fifteen,
    paddingBottom: Dimens.thirty,
    paddingHorizontal: Dimens.fifteen
  },
  profileHeaderTextStyle: { flex: 0.1 },
  mainHeadingContainer: {
    flex: 0.9,
    paddingTop:10
  },
  contactContainer: { flex: 1, backgroundColor: Colors.white },
  headingContainer: {
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    backgroundColor: Colors.white
  },
  headerTextStyle: {
    fontSize: Dimens.twenty,
    alignSelf: "flex-start",
    textAlign: "left",
    paddingLeft: Dimens.twenty,
    justifyContent: "center",
    marginVertical: Dimens.ten,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Dimens.ten,
    color: Colors.notificationHeaderTextColor,
    fontFamily: Fonts.SourceSansProBold
  },
  orderContainer: {
    flex: 1,
    paddingVertical: Dimens.ten,
    paddingHorizontal: Dimens.twenty,
    fontSize: Dimens.twenty,
    backgroundColor: Colors.white
  },
  HeadingStyle: {
    paddingHorizontal: Dimens.twenty,
    paddingTop: Dimens.twentyFive,
    paddingBottom: Dimens.seven,
    fontSize: Dimens.eighteen,
    color: Colors.notificationTextColor,
    fontFamily: Fonts.SourceSansProRegular
  },
  textStyling: {
    paddingHorizontal: Dimens.twenty,
    paddingBottom: Dimens.ten,
    fontSize: Dimens.eighteen,
    color: Colors.profileBackgroundColor,
    fontFamily: Fonts.SourceSansProBold
  },
  addressStyle: {
    paddingHorizontal: Dimens.twenty,
    fontSize: Dimens.eighteen,
    color: Colors.headingTextColor,
    fontFamily: Fonts.SourceSansProRegular
  },
  addressStyle1: {
    paddingHorizontal: Dimens.twenty,
    fontSize: Dimens.eighteen,
    color: Colors.headingTextColor,
    fontFamily: Fonts.SourceSansProBold
  }
});
