import React, {PureComponent} from 'react';
import {View, FlatList, Text, StatusBar, Dimensions} from 'react-native';
import styles from './styles';
import {BoxShadow} from 'react-native-shadow';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import {shadowOpt, Colors, Dimens, Fonts} from '../../../utils/Theme';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');
let notificationJson = require('./notification');

class NotificationScreen extends PureComponent {
  state = {internetConnected: false, data: []};

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.notificationBackgroundColor);
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  getIconFromNotificationType(iconName) {
    let iconPath = '';
    switch (iconName) {
      case 'score':
        iconPath = require('../../../assets/profilePic.jpeg');
        break;
      case 'activities':
        iconPath = require('../../../assets/profilePic.jpeg');
        break;
      case 'gift':
        iconPath = require('../../../assets/profilePic.jpeg');
        break;
      case 'tip':
        iconPath = require('../../../assets/profilePic.jpeg');
        break;
      default:
        iconPath = require('../../../assets/profilePic.jpeg');
        break;
    }
    return iconPath;
  }

  itemView = data => {
    return data.map((item, index) => {
      return (
        <View style={styles.itemContainer} key={index}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.imageStyle}
              source={this.getIconFromNotificationType(item.type)}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text
              numberOfLines={0}
              style={styles.detailStyle}
              children={item.detail}
            />
          </View>

          <Text style={styles.dateStyle} children={item.dateTime} />
        </View>
      );
    });
  };

  //To show on whole Screen
  notificationView = data => {
    return (
      <View style={styles.notificationDetailContainer}>
        {data.index !== 0 ? (
          <BoxShadow
            inset={true}
            side={'top'}
            setting={{
              width: parseInt(width),
              height: Dimens.fifty,
              color: '#000',
              border: Dimens.tweleve,
              radius: Dimens.fifteen,
              opacity: 0.1,
              x: 0,
              y: -Dimens.five,
              style: {
                marginVertical: Dimens.zero,
                marginTop: -Dimens.three,
              },
            }}
          >
            <Text
              style={styles.notificationHeaderStyle}
              children={data.item.title}
            />
          </BoxShadow>
        ) : (
          <Text
            style={styles.notificationHeaderStyle}
            children={data.item.title}
          />
        )}
        {this.itemView(data.item.data)}
      </View>
    );
  };

  renderListEmpty = () => {
    return (
      <View
        style={{
          marginTop: heightPercentageToDP(40),
          height: Dimens.hundred,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: Dimens.twentyTwo,
            fontFamily: Fonts.SourceSansProSemibold,
            color: Colors.notificationBackgroundColor,
            padding: Dimens.thirty,
          }}
          children={"You've no notifications yet!"}
        />
      </View>
    );
  };

  render() {
    const {data} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.headerTextStyle} children={'NOTIFICATIONS'} />

        <FlatList
          style={styles.mainHeadingContainer}
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.notificationView}
          ListEmptyComponent={this.renderListEmpty}
        />
      </View>
    );
  }
}

export default NotificationScreen;
