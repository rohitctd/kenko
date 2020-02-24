import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {
  Colors,
  Fonts,
  Dimens,
  isIphoneXorAbove,
  shadowOpt,
} from '../../../../utils/Theme';
import {BoxShadow} from 'react-native-shadow';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default class NeedHelpScreen extends PureComponent {
  state = {
    messages: [],
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1, // reciever
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2, //sender
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <View style={styles.container}>
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
              <Text style={styles.headerTextStyle} children={'Chat with Us'} />
            </TouchableOpacity>
          </BoxShadow>
        </View>

        <GiftedChat
          optionTintColor={'#cccccc'}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.profileBackgroundColor,
    paddingTop:
      Platform.OS == 'ios'
        ? isIphoneXorAbove()
          ? Dimens.fifty
          : Dimens.twenty
        : Dimens.Zero,
  },
  profileHeaderTextStyle: {flex: 0.2},

  backIconStyle: {
    position: 'absolute',
    paddingTop: Dimens.fifteen,
    paddingBottom: Dimens.thirty,
    paddingHorizontal: Dimens.fifteen,
  },
  mainHeadingContainer: {
    paddingTop: Dimens.fifteen,
    flex: 0.9,
  },
  headingContainer: {
    borderTopLeftRadius: Dimens.twenty,
    borderTopRightRadius: Dimens.twenty,
    backgroundColor: Colors.white,
    fontFamily: Fonts.SourceSansProBold,
    fontSize: Dimens.eighteen,
  },
  headerTextStyle: {
    fontSize: Dimens.twenty,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: Dimens.twenty,
    justifyContent: 'center',
    marginVertical: Dimens.ten,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Dimens.ten,
    color: Colors.black,
    fontFamily: Fonts.SourceSansProBold,
  },
});
