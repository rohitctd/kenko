import { StyleSheet, Dimensions, Platform } from "react-native";
const { height } = Dimensions.get("window");

import { Dimens, Colors, isIphoneXorAbove, Fonts } from "../../utils/Theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    flexDirection: "column",
    padding: Dimens.thirty,
    backgroundColor: Colors.loginBackground
  },
  buttonSignInContainer: {
    width: Dimens.oneTwenty,
    borderWidth: 0.5,
    borderRadius: Dimens.five,
    backgroundColor: Colors.loginTextColor,
    borderColor: Colors.loginTextColor,
    marginTop: Dimens.twenty
  },
  textSignIn: {
    fontSize: Dimens.fourteen,
    color: Colors.resendTextColor,
    textAlign: "center",
    padding: Dimens.ten
  },
  textInput: {
    marginTop: Dimens.fifty,
    fontSize: Dimens.fourteen,
    borderColor: Colors.loginTextColor,
    paddingVertical: Dimens.twenty,
    paddingRight: Dimens.twenty,
    color: Colors.loginTextColor,
    textAlign: "left",
    fontSize: Dimens.twentyFive
  },
  textInputX: {
    height: Dimens.fifty,
    borderRadius: Dimens.twentyFive,
    borderWidth: 0.5,
    borderColor: Colors.loginTextColor,
    marginTop: Dimens.twenty,
    fontSize: Dimens.fourteen,
    marginStart: Dimens.twenty,
    marginEnd: Dimens.twenty,
    paddingTop: Dimens.five,
    paddingBottom: Dimens.five,
    paddingStart: Dimens.twenty,
    paddingEnd: Dimens.twenty,
    color: Colors.loginTextColor,
    textAlign: "center"
  },
  welcomeHeader: {
    paddingTop:
      Platform.OS == "ios"
        ? isIphoneXorAbove()
          ? Dimens.oneFifty
          : Dimens.eighty
        : Dimens.eighty,
    fontSize: Dimens.thirty,
    color: Colors.loginTextColor,
    textAlign: "left",
    fontWeight: "100"
  },
  eventHeader: {
    color: Colors.loginTextColor,
    fontSize: Dimens.fifteen,
    textAlign: "center",
    marginTop: Dimens.ten,
    marginStart: Dimens.seventy,
    marginEnd: Dimens.seventy
  },
  textHeaderI: {
    color: Colors.loginTextColor,
    textAlign: "left",
    marginTop: Dimens.twenty
  },
  leftIcon: {
    position: "absolute",
    paddingLeft: Dimens.twenty,
    paddingTop:
      Platform.OS == "ios"
        ? isIphoneXorAbove()
          ? Dimens.fifty
          : Dimens.thirtyFive
        : Dimens.twenty
  }
});
