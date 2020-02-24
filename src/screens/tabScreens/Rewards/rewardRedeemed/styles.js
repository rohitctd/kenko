import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  Colors,
  Dimens,
  isIphoneXorAbove,
  Fonts
} from "../../../../utils/Theme";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.loginBackground,
    flexDirection: "column"
  },
  headerTextStyle: {
    paddingTop:
      Platform.OS == "ios"
        ? isIphoneXorAbove()
          ? Dimens.sixtyFive
          : Dimens.thirtyFive
        : Dimens.fifteen,
    paddingHorizontal: Dimens.fifteen,
    paddingBottom: Dimens.fifteen,
    flexDirection: "row"
  },
  item: {
    width: "80%",
    height: "85%"
  },
  imageContainer: {
    width: "90%",
    height: "100%",
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: Dimens.ten
  },
  swipeButtonStyle: {
    textAlign: "center",
    fontSize: Dimens.sixteen,
    padding: Dimens.ten,
    borderRadius: Dimens.twenty,
    marginLeft: Dimens.twenty,
    color: Colors.loginBackground,
    fontFamily: Fonts.SourceSansProBold
  },
  thankYouContainer: {
    top: height / 3.5,
    left: width / 3.2,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  thankIconStyle: {
    width: Dimens.eighty,
    height: Dimens.eighty,
    backgroundColor: Colors.rewardScreenBackground,
    borderRadius: Dimens.fourty,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.white,
    borderWidth: Dimens.five
  },
  thankTextContainer: {
    fontFamily: Fonts.SourceSansProSemibold,
    color: Colors.white,
    fontSize: Dimens.twentyTwo,
    paddingHorizontal: Dimens.twentyFive,
    paddingVertical: Dimens.twentyFive
  },
  hoverContainer: {
    width: "100%",
    position: "absolute",
    bottom: Dimens.pointOne,
    backgroundColor: "white",
    paddingHorizontal: Dimens.twentyFive,
    paddingVertical: Dimens.twentyFive,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    overflow: "hidden"
  },
  redirectedTextStyle: {
    fontFamily: Fonts.SourceSansProSemibold,
    color: Colors.black,
    fontSize: Dimens.eighteen,
    paddingBottom: Dimens.ten,
    textAlign: "center"
  },
  swipeButtonContainer: {
    paddingVertical: Dimens.twenty,
    paddingHorizontal: Dimens.twenty,
    backgroundColor: Colors.white
  },
  textContainer: {
    top: height / 1.5,
    left: width / 8,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Dimens.twentyFive,
    paddingBottom: Dimens.twentyFive,
    paddingHorizontal: Dimens.twentyFive
  },
  textStyling: {
    fontFamily: Fonts.SourceSansProSemibold,
    color: Colors.white,
    fontSize: Dimens.eighteen
  }
});
