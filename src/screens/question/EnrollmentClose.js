import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Dimens, Colors, Fonts} from '../../utils/Theme';
let text =
  "Sorry enrolments are closed for the time being. we'll send you an invite when they re-open";

export default class EnrollmentClose extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textStyling} children={text} />

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.buttonStyle} children={'OKAY'} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: Dimens.twentyFive,
    backgroundColor: Colors.loginBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyling: {
    marginTop: Dimens.eighty,
    color: Colors.white,
    fontSize: Dimens.twentyFive,
    fontFamily: Fonts.SourceSansProSemibold,
    textAlign: 'center',
  },
  buttonStyle: {
    marginTop: Dimens.fourty,
    color: Colors.loginBackground,
    fontSize: Dimens.twenty,
    paddingVertical: Dimens.tweleve,
    paddingHorizontal: Dimens.fourty,
    fontFamily: Fonts.SourceSansProSemibold,
    textAlign: 'justify',
    backgroundColor: Colors.white,
  },
});
