import { StyleSheet } from "react-native";
import { Colors, Dimens } from "../utils/Theme";

export default StyleSheet.create({
  headerStyle: {
    fontWeight: "500",
    fontSize: Dimens.twentyFour,
    alignSelf: "center",
    backgroundColor: Colors.mainBackgroundColor,
    elevation: 0,
    shadowOpacity: 0
  }
});
