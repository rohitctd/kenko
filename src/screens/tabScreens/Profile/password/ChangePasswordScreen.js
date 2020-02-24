import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import {BoxShadow} from 'react-native-shadow';
import FeatherIcon from 'react-native-vector-icons/Feather';

import styles from './styles';
import {Dimens, Colors, shadowOpt} from '../../../../utils/Theme';

class ChangePasswordScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      internetConnected: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  componentDidMount() {
    this.refs.oldPassword.focus();
  }

  changePassword = () => {
    const {oldPassword, newPassword, confirmPassword} = this.state;
    if (oldPassword == '') {
      this.refs.toast.show(
        'Please enter your current password',
        DURATION.LENGTH_SHORT
      );
      return;
    }
    if (newPassword == '') {
      this.refs.toast.show(
        'Please enter your new password',
        DURATION.LENGTH_SHORT
      );
      return;
    }
    if (confirmPassword == '') {
      this.refs.toast.show(
        'Please re-enter your new password',
        DURATION.LENGTH_SHORT
      );
      return;
    }
    if (confirmPassword != newPassword) {
      this.refs.toast.show(
        "Passwords don't match",
        DURATION.LENGTH_SHORT
      );
      return;
    }

    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <Toast ref="toast" />

        <View style={styles.profileHeaderTextStyle}>
          <FeatherIcon
            style={styles.backIconStyle}
            onPress={() => this.props.navigation.goBack()}
            color={Colors.loginTextColor}
            size={Dimens.thirtyFive}
            name={'chevron-left'}
          />
        </View>

        <View style={styles.mainHeadingContainer}>
          <BoxShadow inset={true} side={'top'} setting={shadowOpt}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.headingContainer]}
            >
              <Text
                style={styles.headerTextStyle}
                children={'Change Password'}
              />
            </TouchableOpacity>
          </BoxShadow>

          <ScrollView style={styles.orderContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText} children={'Current Password'} />
              <TextInput
                style={styles.textInput}
                ref={'oldPassword'}
                onChangeText={val => this.setState({oldPassword: val})}
                onSubmitEditing={() => this.refs.newPassWord.focus()}
                defaultValue={this.state.oldPassword}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Enter your current password"
                placeholderTextColor={Colors.notificationHeaderTextColor}
                selectionColor={Colors.notificationHeaderTextColor}
                maxLength={40}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText} children={'New Password'} />
              <TextInput
                style={styles.textInput}
                ref={'newPassWord'}
                onChangeText={val => this.setState({newPassword: val})}
                onSubmitEditing={() => this.refs.confirm.focus()}
                defaultValue={this.state.newPassword}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Enter your new password"
                placeholderTextColor={Colors.notificationHeaderTextColor}
                selectionColor={Colors.notificationHeaderTextColor}
                maxLength={40}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText} children={'Confirm Password'} />
              <TextInput
                style={styles.textInput}
                ref={'confirm'}
                onChangeText={val => this.setState({confirmPassword: val})}
                onSubmitEditing={() => this.changePassword()}
                defaultValue={this.state.confirmPassword}
                keyboardType="email-address"
                returnKeyType="done"
                placeholder="Confirm your new password"
                placeholderTextColor={Colors.notificationHeaderTextColor}
                selectionColor={Colors.notificationHeaderTextColor}
                maxLength={40}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.changePassword();
              }}
              activeOpacity={0.5}
            >
              <Text
                style={styles.saveButtonStyle}
                children={'CHANGE PASSWORD'}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ChangePasswordScreen;
