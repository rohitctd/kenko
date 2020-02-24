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
    flex: 0.9
  },
  headingContainer: {
    height: Dimens.sixty,
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
    fontFamily: Fonts.SourceSansProBlack
  },
  orderContainer: {
    flex: 1,
    paddingTop:Dimens.tweleve,
    paddingHorizontal: Dimens.twenty,
    fontSize: Dimens.twenty,
    backgroundColor: Colors.white
  },
  labelText: {
    paddingVertical: Dimens.ten,
    fontSize: Dimens.eighteen,
    color: "black",
    fontFamily: Fonts.SourceSansProRegular,
  },
  textInput: {
    paddingTop: Dimens.five,
    paddingBottom: Dimens.ten,
    fontSize: Dimens.eighteen,
    color: Colors.notificationTextColor,
    fontFamily: Fonts.SourceSansProRegular,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: Dimens.fifteen
  },
  saveButtonStyle: {
    padding: Dimens.ten,
    backgroundColor: Colors.profileBackgroundColor,
    textAlign: "center",
    color: Colors.loginTextColor,
    fontSize: Dimens.twenty,
    borderRadius: Dimens.ten,
    marginVertical: Dimens.twentyFive,
    fontFamily: Fonts.SourceSansProSemibold
  }
});
