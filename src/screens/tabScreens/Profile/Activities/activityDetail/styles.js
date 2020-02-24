import { StyleSheet, Platform } from "react-native";
import {
  Dimens,
  isIphoneXorAbove,
  Colors,
  Fonts
} from "../../../../../utils/Theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.activityBackgroundColor,
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
    flex: 1,
    position: "absolute",
    marginTop: Dimens.twentyFive,
    width: "100%",
    bottom: Dimens.zero,
    top:
      Platform.OS == "ios"
        ? isIphoneXorAbove()
          ? Dimens.hundred
          : Dimens.seventy
        : Dimens.fifty,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Dimens.twentyFive,
    borderTopRightRadius: Dimens.twentyFive,
    overflow: "hidden"
  },
  headingContainer: {
    height: Dimens.sixty,
    backgroundColor: Colors.orderHeaderTextColor,
    borderTopLeftRadius: Dimens.twentyFive,
    borderTopRightRadius: Dimens.twentyFive
  },
  headerTextStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: "flex-start",
    textAlign: "left",
    paddingLeft: Dimens.twenty,
    justifyContent: "center",
    marginVertical: Dimens.ten,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Dimens.ten,
    color: Colors.textHeadingColor,
    fontFamily: Fonts.SourceSansProBold
  },
  nameStyle: {
    fontSize: Dimens.twenty,
    alignSelf: "flex-start",
    textAlign: "left",
    justifyContent: "center",
    paddingLeft: Dimens.fifteen,
    color: Colors.black,
    fontFamily: Fonts.SourceSansProBold
  },
  addressStyle: {
    fontSize: Dimens.eighteen,
    alignSelf: "flex-start",
    textAlign: "left",
    justifyContent: "center",
    marginVertical: Dimens.five,
    paddingLeft: Dimens.thirty,
    paddingRight: Dimens.hundred,
    color: Colors.textHeadingColor,
    fontFamily: Fonts.SourceSansProRegular
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: Dimens.thirty,
    paddingHorizontal: Dimens.fifteen,
    backgroundColor: Colors.white,
    justifyContent: "space-between"
  },
  searchContainer: {
    backgroundColor: Colors.loginTextColor,
    marginTop: Dimens.five,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Dimens.ten
  },
  iconStyle: {
    paddingLeft: Dimens.fifteen,
    paddingRight: Dimens.ten
  },
  flatlistContainer: {
    flex: 0.9,
    backgroundColor: Colors.orderHeaderTextColor
  },
  divider: {
    width: "100%",
    height: Dimens.two
  },
  PlanContainer: {
    justifyContent: "flex-start"
  },
  planImageConatiner: {
    flex: 0.2,
    width: Dimens.sixty,
    height: Dimens.sixty,
    borderRadius: Dimens.thirty,
    marginLeft: Dimens.five,
    marginRight: Dimens.ten
  },
  distanceStyle: {
    fontSize: Dimens.eighteen,
    textAlign: "left",
    color: Colors.black,
    fontFamily: Fonts.SourceSansProBold
  },
  locationLabelStyle: {
    fontSize: Dimens.eighteen,
    textAlign: "left",
    color: Colors.black,
    fontFamily: Fonts.SourceSansProSemibold
  },
  directionLabelStyle: {
    fontSize: Dimens.twenty,
    textAlign: "left",
    color: Colors.black,
    paddingLeft: Dimens.ten,
    fontFamily: Fonts.SourceSansProSemibold
  },
  actionTypeStyle: {
    marginTop: Dimens.ten,
    marginHorizontal: Dimens.ten,
    textAlign: "center",
    fontSize: Dimens.sixteen,
    paddingVertical: Dimens.three,
    color: Colors.white,
    fontFamily: Fonts.SourceSansProSemibold,
    borderRadius: Dimens.fifteen,
    overflow: "hidden"
  },
  dateStyle: {
    includeFontPadding: false,
    textAlign: "left",
    fontSize: Dimens.seventeen,
    paddingHorizontal: Dimens.thirty,
    color: Colors.dimTextColor,
    fontFamily: Fonts.SourceSansProRegular
  },
  detailStyle: {
    textAlign: "left",
    fontSize: Dimens.eighteen,
    color: Colors.black,
    paddingVertical: Dimens.tweleve,
    fontFamily: Fonts.SourceSansProRegular,
    paddingHorizontal: Dimens.thirty
  },
  featureStyle: {
    paddingHorizontal: Dimens.thirty,
    textAlign: "left",
    fontSize: Dimens.eighteen,
    color: Colors.black,
    fontFamily: Fonts.SourceSansProBold
  },
  labelStyle: {
    paddingVertical: Dimens.ten,
    paddingHorizontal: Dimens.thirty,
    textAlign: "left",
    fontSize: Dimens.twenty,
    color: Colors.black,
    fontFamily: Fonts.SourceSansProBold
  },
  referenceStyle: {
    paddingVertical: Dimens.seven,
    paddingHorizontal: Dimens.thirty,
    textAlign: "left",
    fontSize: Dimens.twenty,
    color: Colors.dimTextColor,
    fontFamily: Fonts.SourceSansProRegular
  },
  phoneStyle: {
    paddingHorizontal: Dimens.thirty,
    textAlign: "left",
    fontSize: Dimens.eighteen,
    color: Colors.dimTextColor,
    fontFamily: Fonts.SourceSansProRegular
  },
  labNameStyle: {
    paddingTop: Dimens.five,
    paddingHorizontal: Dimens.thirty,
    textAlign: "left",
    fontSize: Dimens.eighteen,
    color: Colors.black,
    fontFamily: Fonts.SourceSansProBold
  },
  reportStyle: {
    paddingTop: Dimens.five,
    paddingHorizontal: Dimens.thirty,
    textAlign: "left",
    fontSize: Dimens.sixteen,
    color: Colors.black,
    fontFamily: Fonts.SourceSansProRegular
  }
});
