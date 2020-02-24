import React, {PureComponent} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {BoxShadow} from 'react-native-shadow';
import FastImage from 'react-native-fast-image';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import RNSwipeVerify from 'react-native-swipe-verify';
import {connect} from 'react-redux';
import Toast, {DURATION} from 'react-native-easy-toast';

import styles from './styles';
import {shadowOpt, Dimens, Colors, Fonts} from '../../../../utils/Theme';
import * as constants from '../../../../utils/Constants';
import Loader from '../../../../component/Loader';

let activityJson = require('./ActivityJson.json');
const {width} = Dimensions.get('window');

class ActivityScreen extends PureComponent {
  constructor(props) {
    super(props);
    const {getParam} = props.navigation;
    this.state = {
      internetConnected: false,
      data: getParam('recentActivities', []),
      allData: true,
      activeData: false,
      completedData: false,
      itemIndexOpen: '',
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.profileBackgroundColor);
    });
    NetInfo.isConnected.fetch().done(isConnected => {
      if (!isConnected) {
        this.refs.toast.show('No internet connection', DURATION.LENGTH_SHORT);
        return;
      }
      // this.props.getActivities(userdetail.user_id);
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  getIconFromItemType(iconName) {
    let iconPath = '';
    switch (iconName) {
      // case "score":
      //   iconPath = require("../../../assets/images/k_active.png");
      //   break;
      // case "activities":
      //   iconPath = require("../../../assets/images/k_active.png");
      //   break;
      // case "gift":
      //   iconPath = require("../../../assets/images/k_active.png");
      //   break;
      // case "tip":
      //   iconPath = require("../../../assets/images/k_active.png");
      //   break;
      default:
        iconPath = require('../../../../assets/profilePic.jpeg');
        break;
    }
    return iconPath;
  }

  showSwiperView(item, showSwiper) {
    return (
      <View style={{flex: 1}}>
        {showSwiper ? (
          <View
            style={{
              paddingVertical: Dimens.ten,
              paddingHorizontal: Dimens.twenty,
              backgroundColor: Colors.white,
            }}
          >
            <RNSwipeVerify
              borderRadius={Dimens.hundred}
              width={width - Dimens.hundred}
              style={{marginTop: Dimens.ten}}
              buttonSize={Dimens.sixty}
              borderColor="#fff"
              buttonColor={Colors.activityBackgroundColor}
              backgroundColor={'#d0ccdd'}
              okButton={{visible: true, duration: 500}}
              onVerified={() => {
                this.props.navigation.navigate('SelectLabsScreen');
              }}
              icon={
                <Icon
                  name={'arrowright'}
                  size={Dimens.twentyFive}
                  color={Colors.white}
                />
              }
            >
              <Text
                style={styles.swipeButtonStyle}
                children={'Book an Appointment'}
              />
            </RNSwipeVerify>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.nextButtonContainer}
            onPress={() => {
              if (item.actionType == 'Completed' || item.actionType == 'Active')
                this.props.navigation.navigate('ActivityDetailScreen', {
                  data: item,
                });
            }}
            activeOpacity={0.5}
          >
            <Text style={styles.iconText} children={'View more'} />
            <Icon
              style={{
                ...Platform.select({ios: {paddingTop: Dimens.three}}),
              }}
              color={Colors.activityBackgroundColor}
              size={Dimens.twentyTwo}
              name={'arrowright'}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  activityViewItem = data => {
    let item = data.item;
    let index = data.index;

    let featureColor =
      item.kenko_points_action == 'earn'
        ? Colors.activityBackgroundColor
        : Colors.rewardScreenBackground;

    let buttonActionColor =
      item.kenko_points_action == 'Completed'
        ? Colors.rewardScreenBackground
        : item.actionType == 'earn'
        ? Colors.insureBackground
        : '#ed6132';

    let showSwiper = item.actionType == 'Need Action';

    return (
      <View style={styles.mainItemContainer} key={data.index}>
        <View style={styles.itemContainer}>
          <FastImage
            style={styles.imageStyle}
            source={this.getIconFromItemType('')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.imageContainer}>
            <Text
              numberOfLines={2}
              style={styles.titleStyle}
              children={item.title}
            />
            <Text style={styles.detailStyle} children={item.reason} />
            <Text
              style={[styles.featureStyle, {color: featureColor}]}
              children={item.feature}
            />

            <View style={styles.dateContainer}>
              <Text
                style={[
                  styles.actionTypeStyle,
                  {
                    backgroundColor:
                      item.actionType != '' ? buttonActionColor : Colors.white,
                  },
                ]}
                children={item.actionType}
              />
              <Text
                style={styles.dateStyle}
                children={moment
                  .unix(parseInt(item.created.seconds))
                  .format('DD MMM, YYYY')}
              />
            </View>
          </View>
        </View>

        {/* <FadeInOut isVisible={item.showDetail} style={styles.someStyle}>
          {this.showSwiperView(showSwiper)}
        </FadeInOut> */}
        {item.showDetail && this.showSwiperView(item, showSwiper)}

        <FeatherIcon
          style={{alignSelf: 'center', marginVertical: Dimens.ten}}
          onPress={() => {
            let closeAll = this.state.data.map(obj => ({
              ...obj,
              showDetail: false,
            }));

            closeAll[index].showDetail = !item.showDetail;

            this.setState({
              data: closeAll,
            });
          }}
          color={Colors.activityBackgroundColor}
          size={Dimens.twentyFive}
          name={!item.showDetail ? 'chevron-down' : 'chevron-up'}
        />
      </View>
    );
  };

  emptyListContainer = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTextStyle} children={'No Activities yet!'} />
      </View>
    );
  };

  render() {
    const {allData, activeData, completedData, data} = this.state;
    const {isFetching, activities} = this.props.ActivitiesReducer;
    const {dashboardDetail} = this.props.UserDetailReducer;
    // let recentactivity = dashboardDetail.data[0].recentactivity;

    return (
      <View style={styles.container}>
        <Toast ref="toast" />
        {isFetching && <Loader />}

        <StatusBar
          hidden={false}
          backgroundColor={Colors.activityBackgroundColor}
          barStyle="light-content"
          translucent={false}
        />
        <View style={styles.profileHeaderTextStyle}>
          <FeatherIcon
            style={styles.backIconStyle}
            onPress={() => this.props.navigation.goBack()}
            color={Colors.loginTextColor}
            size={Dimens.thirtyFive}
            name={'chevron-left'}
          />
        </View>

        {/* <Text style={styles.headerTextStyle} children={'ACTIVITY'} /> */}

        {/* <View style={styles.activityStatsStyle}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={
                () => {}
                // this.setState({
                //   allData: true,
                //   activeData: false,
                //   completedData: false,
                //   data: activityJson,
                // })
              }
              style={styles.countStyle}
            >
              <Text
                style={[
                  styles.countTextStyle,
                  {color: allData ? Colors.white : '#bab1d5'},
                ]}
                children={'0'}
              />
              <Text
                style={[
                  styles.countDetailStyle,
                  {color: allData ? Colors.white : '#bab1d5'},
                ]}
                children={'All Activities'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={
                () => {}
                // this.setState({
                //   allData: false,
                //   activeData: true,
                //   completedData: false,
                //   data: activityJson.filter(
                //     item => item.actionType == 'Active'
                //   ),
                // })
              }
              activeOpacity={0.8}
              style={styles.countStyle}
            >
              <Text
                style={[
                  styles.countTextStyle,
                  {color: activeData ? Colors.white : '#bab1d5'},
                ]}
                children={'0'}
              />
              <Text
                style={[
                  styles.countDetailStyle,
                  {color: activeData ? Colors.white : '#bab1d5'},
                ]}
                children={'Active Activities'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={
                () => {}
                // this.setState({
                //   allData: false,
                //   activeData: false,
                //   completedData: true,
                //   data: activityJson.filter(
                //     item => item.actionType == 'Completed'
                //   ),
                // })
              }
              activeOpacity={0.8}
              style={styles.countStyle}
            >
              <Text
                style={[
                  styles.countTextStyle,
                  {color: completedData ? Colors.white : '#bab1d5'},
                ]}
                children={'0'}
              />
              <Text
                style={[
                  styles.countDetailStyle,
                  {color: completedData ? Colors.white : '#bab1d5'},
                ]}
                children={'Completed Activities'}
              />
            </TouchableOpacity>
          </View>
        </View> */}

        <View style={styles.mainHeadingContainer}>
          <BoxShadow
            inset={true}
            side={'top'}
            setting={{
              width: parseInt(width),
              height: Dimens.sixtyFive,
              color: '#000',
              border: Dimens.tweleve,
              radius: Dimens.fifteen,
              opacity: 0.1,
              x: 0,
              y: -Dimens.three,
              style: {
                marginVertical: Dimens.zero,
              },
            }}
          >
            <TouchableOpacity activeOpacity={1} style={styles.activityHeader}>
              <Text
                style={styles.activityTextStyle}
                children={'All Activities'}
              />
            </TouchableOpacity>
          </BoxShadow>

          <FlatList
            style={styles.flatlistContainer}
            data={data}
            ListEmptyComponent={this.emptyListContainer}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderRecentActivities}
          />
        </View>
      </View>
    );
  }

  _renderRecentActivities = data => {
    let item = data.item;

    let typeColor =
      item.actionType == 'Redeemed'
        ? '#F7B500'
        : item.actionType == 'earn'
        ? Colors.insureBackground
        : '#ed6132';
    let typeSign = item.actionType == 'earn' ? '+' : '-';

    return (
      <View style={styles.recentItemStyle}>
        <View style={styles.recentLeftContainer}>
          <Text
            style={styles.dateRecentStyle}
            children={moment
              .unix(parseInt(item.date._seconds))
              .format('DD MMM, YYYY')}
          />
          <Text style={styles.titleStyle} children={item.title} />
          <Text style={styles.recentDetailStyle} children={item.description} />
        </View>

        <View style={[styles.recentRightContainer]}>
          <Text
            style={[styles.typeStyle, {backgroundColor: typeColor}]}
            children={item.actionType}
          />

          <Text
            style={[styles.pointStyle]}
            children={typeSign + item.kenkoPoints + ' points'}
          />
          <Text
            style={styles.closingBalanceStyle}
            children={'Closing balance ' + item.closing_balance}
          />
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {
    ActivitiesReducer: state.ActivitiesReducer,
    UserDetailReducer: state.UserDetailReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getActivities: jsonObj => {
      dispatch(getActivities(jsonObj));
    },
  };
};

const getActivities = jsonObj => {
  return {
    type: constants.FETCHING_ACTIVITIES,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityScreen);
