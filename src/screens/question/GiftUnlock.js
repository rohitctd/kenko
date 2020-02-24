import * as React from "react";
import { Text, View, StyleSheet, Image, Platform } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import ConfettiCannon from "react-native-confetti-cannon";
import { Dimens, Colors } from "../../utils/Theme";

export default class GiftUnlock extends React.Component {
  constructor() {
    super();
    this.state = {
      shoot: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ shoot: true });
    }, 1000);
  }

  _handlePress() {
    this.setState({ shoot: false });
    setTimeout(() => {
      this.setState({ shoot: true });
    }, 500);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.paragraphHeading} children={"Congrates !!"} />
            <View
              style={{
                backgroundColor: "grey",
                width: "100%",
                height: Dimens.one
              }}
            />
            <Text style={styles.paragraph} children={"You got a Cashback"} />
            <Image
              style={styles.logo}
              source={{
                uri:
                  "https://aboutreact.com/wp-content/uploads/2019/05/gift.png"
              }}
            />
            <Text style={styles.textLarge} children={"$22.22"} />
            <View
              style={{
                marginTop: Dimens.twenty,
                backgroundColor: "green",
                width: "100%"
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: Dimens.twenty,
                  padding: Dimens.ten,
                  textAlign: "center"
                }}
                onPress={() => this._handlePress()}
                children={"Claim"}
              />
            </View>
          </View>

          {/*Cannon which will fire whenever shoot is true*/}
          {this.state.shoot ? (
            <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
          ) : null}
        </View>

        <Icon
          onPress={() => this.props.navigation.goBack()}
          style={{
            position: "absolute",
            paddingLeft: Dimens.fifteen,
            paddingTop:
              Platform.OS == "ios"
                ? isIphoneXorAbove()
                  ? Dimens.fifty
                  : Dimens.thirtyFive
                : Dimens.thirty
          }}
          color={"green"}
          size={Dimens.twentyFive}
          name={"chevron-left"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Dimens.thirty,
    backgroundColor: "#ecf0f1",
    padding: Dimens.tweleve
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    padding: Dimens.twentyFive,
    backgroundColor: "white"
  },
  textLarge: {
    margin: Dimens.twentyFive,
    fontSize: Dimens.fourty,
    fontWeight: "bold",
    textAlign: "center",
    color: "green"
  },
  paragraphHeading: {
    margin: Dimens.twentyFive,
    fontSize: Dimens.twenty,
    fontWeight: "bold",
    textAlign: "center",
    color: "green"
  },
  paragraph: {
    margin: Dimens.twentyFive,
    fontSize: Dimens.eighteen,
    textAlign: "center"
  },
  logo: {
    height: Dimens.eighty,
    width: Dimens.eighty
  }
});
