//import liraries
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Feather";
import { Colors, Dimens } from "../../utils/Theme";

export default class Question1Screen extends React.PureComponent {
  state = {
    loggedIn: false,
    username: "",
    password: "",
    deviceToken: ""
  };

  attemptSignInn() {
    try {
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }

    if (!this.isFormValid()) {
      return;
    }

    this.props.navigation.navigate("MovieNavigator");
  }

  isFormValid() {
    // all fields  are mandatory .........
    const { username, password } = this.state;
    if (username.length <= 0) {
      Alert.alert("Warning", "You must enter a Username");
      return false;
    }

    if (password.length <= 6) {
      Alert.alert("Warning", "You must enter a password");
      return false;
    }

    return true;
  }

  _question1View(isLoading) {
    return (
      <View style={styles.container}>
    
        <Text
          style={styles.question1HeaderI}
          children={"Tell us your name, age"}
        />
        <Text style={styles.question1HeaderII} children={"& place of residence"} />

        <TouchableOpacity
          style={styles.nextButtonContainer}
          onPress={() => this.props.navigation.navigate("Question2Screen")}
          activeOpacity={0.5}
        >
          <Text style={styles.iconText} children={"Next"} />
          <Icon
            color={Colors.loginTextColor}
            size={Dimens.thirtyFive}
            name={"chevron-right"}
          />
        </TouchableOpacity>


        <Icon
          onPress={() => this.props.navigation.goBack()}
          style={styles.leftIcon}
          color={Colors.loginTextColor}
          size={Dimens.twentyFive}
          name={"chevron-left"}
        />

      </View>
    );
  }

  render() {
    return this._question1View();
  }
}
