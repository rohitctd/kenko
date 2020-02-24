import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { BoxShadow } from "react-native-shadow";
import FeatherIcon from "react-native-vector-icons/Feather";

import styles from "./styles";
import { Dimens, Colors, shadowOpt } from "../../../../utils/Theme";

class ContactUsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      internetConnected: false,
      address1: "",
      address2: "",
      city: "",
      state: "",
      pincode: ""
    };
  }

  saveAddress = () => {};

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileHeaderTextStyle}>
          <FeatherIcon
            style={styles.backIconStyle}
            onPress={() => this.props.navigation.goBack()}
            color={Colors.loginTextColor}
            size={Dimens.thirtyFive}
            name={"chevron-left"}
          />
        </View>
        <View style={styles.mainHeadingContainer}>
          <BoxShadow inset={true} side={"top"} setting={shadowOpt}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.headingContainer]}
            >
              <Text style={styles.headerTextStyle} children={"Contact Us"} />
            </TouchableOpacity>
          </BoxShadow>

          <View style={styles.contactContainer}>
            <Text style={styles.HeadingStyle} children={"Email"} />
            <Text
              style={styles.textStyling}
              children={"support@kenko-health.com"}
            />
            <Text style={styles.HeadingStyle} children={"Phone"} />
            <Text style={styles.textStyling} children={"9876543210"} />
            <Text style={styles.HeadingStyle} children={"Our Address"} />
            <Text style={styles.addressStyle1} children={"Kenko Private Ltd"} />
            <Text
              style={styles.addressStyle}
              children={"#1, Unitech Trade Center"}
            />
            <Text
              style={styles.addressStyle}
              children={"Sector 41, Gurugram"}
            />
            <Text style={styles.addressStyle} children={"Haryana - 120012"} />
            <Text style={styles.addressStyle} children={"India"} />
          </View>
        </View>
      </View>
    );
  }
}

export default ContactUsScreen;
