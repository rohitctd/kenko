import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {BoxShadow} from 'react-native-shadow';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNSwipeVerify from 'react-native-swipe-verify';
import Icon from 'react-native-vector-icons/AntDesign';

import {Dimens, Colors} from '../../../../../utils/Theme';
import styles from './styles';

const {width} = Dimensions.get('window');
const dateTimeHeadingArr = [
  {
    id: 1,
    title: '1mg Path Lab',
  },
  {
    id: 2,
    title: 'Select Date & Time',
  },
];

const timingArr = [
  {id: '1', slot: '9:00 - 10:00', index: null},
  {id: '2', slot: '10:00 - 11:00', index: null},
  {id: '3', slot: '10:30 - 11:30', index: null},
  {id: '4', slot: '11:00 - 12:00', index: null},
  {id: '5', slot: '12:00 - 13:00', index: null},
  {id: '6', slot: '14:00 - 15:00', index: null},
  {id: '7', slot: '15:30 - 16:30', index: null},
  {id: '8', slot: '16:30 - 17:30', index: null},
];

const dayArr = [
  {id: '1', day: 'Mon', date: '1', index: null},
  {id: '2', day: 'Tue', date: '2', index: null},
  {id: '3', day: 'Wed', date: '3', index: null},
  {id: '4', day: 'Thu', date: '4', index: null},
  {id: '5', day: 'Fri', date: '5', index: null},
  {id: '6', day: 'Sat', date: '6', index: null},
];

export default class CalenderScreen extends Component {
  state = {
    timingArr: timingArr,
    dayArr: dayArr,
    internetConnected: false,
  };

  _keyExtractor = (item, index) => item.id;

  _renderItemTimeSlot = data => {
    return (
      <TouchableOpacity
        style={styles.timeSlotContainerStyle}
        onPress={() => {
          let closeAll = this.state.timingArr.map(obj => ({
            ...obj,
            index: null,
          }));

          closeAll[data.index].index = data.index;

          this.setState({
            timingArr: closeAll,
          });
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            padding: Dimens.three,
            fontSize: Dimens.sixteen,
            borderRadius: Dimens.twenty,
            backgroundColor:
              data.item.index == data.index
                ? Colors.loginBackground
                : '#f9f9f9',
            color: data.item.index == data.index ? Colors.white : '#7c7c7c',
          }}
          children={data.item.slot}
        />
      </TouchableOpacity>
    );
  };

  _renderItemDateSlot = data => {
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.dayTextStyle} children={data.item.day} />

        <TouchableOpacity
          onPress={() => {
            let closeAll = this.state.dayArr.map(obj => ({
              ...obj,
              index: null,
            }));

            closeAll[data.index].index = data.index;

            this.setState({
              dayArr: closeAll,
            });
          }}
        >
          <Text
            style={[
              styles.dateTextStyle,
              {
                backgroundColor:
                  data.item.index == data.index
                    ? Colors.insureBackground
                    : '#f9f9f9',
                color: data.item.index == data.index ? Colors.white : '#7c7c7c',
              },
            ]}
            children={data.item.date}
          />
        </TouchableOpacity>
      </View>
    );
  };

  _getItemLayout = (data, index) => {
    const productHeight = Dimens.threeHundred + Dimens.fifteen;
    return {
      length: productHeight,
      offset: productHeight * index,
      index,
    };
  };

  renderCalender = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.calenderContainerStyle}>
          <View style={styles.calenderStyle}>
            <FontAwesome
              name={'calendar'}
              size={Dimens.twentyFive}
              color={Colors.activityBackgroundColor}
            />
            <Text
              style={styles.dateHeadingTextStyle}
              children={'August 2019'}
            />
          </View>

          <Text
            style={styles.availableDateTextStyle}
            children={'Available Dates'}
          />

          <FlatList
            getItemLayout={this._getItemLayout}
            numColumns={6}
            style={styles.dateFlatlistStyle}
            data={this.state.dayArr}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItemDateSlot}
          />

          <Text
            style={styles.availableTimeSlotTextStyle}
            children={'Available Timings'}
          />

          <FlatList
            getItemLayout={this._getItemLayout}
            numColumns={3}
            style={styles.timeSlotFlatlistStyle}
            data={this.state.timingArr}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItemTimeSlot}
          />

          <View style={styles.swiperContainer}>
            <RNSwipeVerify
              borderRadius={Dimens.hundred}
              width={width - Dimens.hundred}
              style={{marginTop: Dimens.ten}}
              buttonSize={Dimens.fifty}
              borderColor="#fff"
              buttonColor={Colors.activityBackgroundColor}
              backgroundColor={'#d0ccdd'}
              okButton={{visible: true, duration: 500}}
              onVerified={() => {
                this.props.navigation.navigate('SlotBookingScreen');
              }}
              icon={
                <Icon
                  name={'arrowright'}
                  size={Dimens.twenty}
                  color={Colors.white}
                />
              }
            >
              <Text
                style={styles.swipeButtonStyle}
                children={'Confirm Appointment'}
              />
            </RNSwipeVerify>
          </View>
        </View>
      </ScrollView>
    );
  };

  renderActivityDetailView() {
    return dateTimeHeadingArr.map((item, index) => {
      return (
        <View
          key={item.id.toString()}
          style={[
            styles.listMapContainer,
            {
              height: index == 0 ? Dimens.oneTwenty : '100%',
              marginTop: index == 0 ? 0 : -Dimens.fifteen,
            },
          ]}
        >
          <BoxShadow
            inset={true}
            side={'top'}
            setting={{
              width: parseInt(width),
              height: Dimens.sixtyFive,
              color: '#000',
              border: Dimens.ten,
              radius: Dimens.twenty,
              opacity: 0.3,
              x: 0,
              style: {
                marginVertical: -10,
              },
            }}
          >
            <Text style={[styles.headerStyle]} children={item.title} />
          </BoxShadow>

          {item.id == 1 ? (
            <Text
              style={styles.addressStyle}
              children={'Near Courtyard Marriot , Shop no.'}
            />
          ) : null}
          {item.id == 2 ? this.renderCalender() : null}
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backIconContainerStyle}>
          <FeatherIcon
            style={styles.backIconStyle}
            onPress={() => this.props.navigation.goBack()}
            color={Colors.loginTextColor}
            size={Dimens.thirtyFive}
            name={'chevron-left'}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          {this.renderActivityDetailView()}
        </View>
      </View>
    );
  }
}
