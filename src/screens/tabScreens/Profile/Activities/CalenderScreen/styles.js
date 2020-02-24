import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  Dimens,
  isIphoneXorAbove,
  Colors,
  Fonts
} from "../../../../../utils/Theme";
const { width } = Dimensions.get("window");

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
  backIconContainerStyle: { flex: 0.15 },
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
  backIconStyle: {
    position: "absolute",
    paddingTop: Dimens.fifteen,
    paddingBottom: Dimens.thirty,
    paddingHorizontal: Dimens.fifteen
  },
  dateTimeContainer: { flex: 1 },
  listMapContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty
  },
  headerStyle: {
    height: Dimens.sixtyFive,
    padding: Dimens.eighteen,
    color: Colors.titleTextColor,
    fontSize: Dimens.twenty,
    fontFamily: Fonts.SourceSansProBold,
    borderTopLeftRadius: Dimens.twentyFive,
    borderTopRightRadius: Dimens.twentyFive,
    backgroundColor: Colors.white
  },
  addressStyle: {
    height: Dimens.eighty,
    textAlign: "left",
    paddingTop: Dimens.five,
    paddingHorizontal: Dimens.eighteen,
    color: Colors.titleTextColor,
    fontSize: Dimens.eighteen,
    fontFamily: Fonts.SourceSansProRegular,
    backgroundColor: Colors.white
  },
  calenderContainerStyle: {
    height: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.white
  },
  calenderStyle: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Dimens.twenty,
    paddingTop: Dimens.five,
    paddingBottom: Dimens.twenty,
    marginTop: Dimens.seven
  },
  dateHeadingTextStyle: {
    paddingTop: Dimens.five,
    paddingHorizontal: Dimens.ten,
    textAlign: "left",
    fontSize: Dimens.twenty,
    color: Colors.titleTextColor,
    fontFamily: Fonts.SourceSansProBold
  },
  availableDateTextStyle: {
    paddingBottom: Dimens.five,
    paddingHorizontal: Dimens.twenty,
    textAlign: "left",
    fontSize: Dimens.twenty,
    color: Colors.titleTextColor,
    fontFamily: Fonts.SourceSansProRegular,
    backgroundColor: Colors.white
  },
  dateFlatlistStyle: {
    flex: 1,
    margin: Dimens.five
  },
  availableTimeSlotTextStyle: {
    marginVertical: Dimens.seven,
    paddingTop: Dimens.fifteen,
    paddingHorizontal: Dimens.twenty,
    textAlign: "left",
    fontSize: Dimens.twenty,
    color: Colors.titleTextColor,
    fontFamily: Fonts.SourceSansProRegular,
    backgroundColor: Colors.white
  },
  timeSlotFlatlistStyle: {
    flex: 1,
    marginHorizontal: Dimens.fifteen
  },
  swiperContainer: {
    marginTop: Dimens.seven,
    height: Dimens.eighty,
    paddingVertical: Dimens.ten,
    paddingHorizontal: Dimens.twenty,
    backgroundColor: Colors.white
  },
  swipeButtonStyle: {
    textAlign: "center",
    fontSize: Dimens.sixteen,
    padding: Dimens.ten,
    borderRadius: Dimens.twenty,
    marginLeft: Dimens.twenty,
    color: Colors.activityBackgroundColor,
    fontFamily: Fonts.SourceSansProBold
  },
  timeSlotContainerStyle: {
    justifyContent: "center",
    flex: 1 / 3,
    marginHorizontal: Dimens.three,
    marginTop: Dimens.seven
  },
  timeSlotTextStyling: {
  
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1 / 6,
    marginHorizontal: Dimens.three
  },
  dayTextStyle: {
    fontSize: Dimens.eighteen,
    color: "#7c7c7c"
  },
  dateTextStyle: {
    marginTop: Dimens.five,
    textAlign: "center",
    paddingVertical: Dimens.ten,
    paddingHorizontal: Dimens.sixteen,
    fontSize: Dimens.sixteen,
    borderRadius: Dimens.hundred
  }
});
