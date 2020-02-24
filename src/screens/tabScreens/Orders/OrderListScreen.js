import React, {Component} from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Toast, {DURATION} from 'react-native-easy-toast';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import FastImage from 'react-native-fast-image';

import {Dimens, Colors, shadowOpt, Fonts} from '../../../utils/Theme';
import * as constants from '../../../utils/Constants';
import Loader from '../../../component/Loader';
import styles from './styles';

class OrderListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetail: {
        id: '',
        addressLine1: '',
        addressLine2: '',
        age: '',
        city: '',
        company: '',
        kenkoCreditScore: '',
        dob: '',
        email: '',
        fname: '',
        gender: '',
        profileStatus: '',
        kenkoCredits: '',
        kenkoScore: '',
        lname: '',
        martialStatus: '',
        mobileNumber: '',
        profession: '',
        regionCode: '',
        appNotificationStatus: false,
        emailNotificationStatus: false,
        state: '',
        sumInsured: '',
      },
      internetConnected: false,
      isSearched: false,
      searchText: '',
      orderArray: [],
      backUp: [],
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.activityBackgroundColor);
    });

    AsyncStorage.getItem('LoginResponse')
      .then(value => {
        global.accessToken = JSON.parse(value).token;

        this.setState({userDetail: JSON.parse(value).data[0]}, () => {
          NetInfo.isConnected.fetch().done(isConnected => {
            if (!isConnected) {
              this.refs.toast.show(
                'No internet connection',
                DURATION.LENGTH_SHORT
              );
              return;
            }
            this.props.getOrders(this.state.userDetail.id);
          });
        });
      })
      .catch(e => console.log(e));
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {userOrders} = nextProps.OrderReducer;
    if (!prevState.isSearched) {
      return {
        orderArray: userOrders.data,
        backUp: userOrders.data,
      };
    }
  }

  renderHeader = () => {
    return (
      <View style={styles.searchContainer}>
        <Icon
          style={styles.iconStyle}
          name="search1"
          size={Dimens.twentyFive}
          color={Colors.silver}
        />

        <TextInput
          style={styles.searchTextInput}
          placeholder="Search all orders"
          placeholderTextColor={Colors.activityBackgroundColor}
          underlineColorAndroid="transparent"
          maxLength={30}
          returnKeyType="search"
          ref={input => {
            this.searchTextInput = input;
          }}
          defaultValue={this.state.searchText}
          onChangeText={text => this.renderSearch(text)}
        />

        {this.state.searchText != '' ? (
          <TouchableOpacity
            onPress={() => this.setState({searchText: '', isSearched: false})}
          >
            <Icon
              style={styles.iconStyle}
              name="close"
              size={Dimens.twentyFive}
              color={Colors.silver}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  renderSearch(searchTextData) {
    let text = searchTextData.toUpperCase();
    let backupArr = this.state.backUp;
    let searchArr = backupArr.filter(item => {
      const kenkoOrderId = `${item.kenkoOrderId.toUpperCase()} `;
      return (
        (kenkoOrderId.match(text) != null ? kenkoOrderId.match(text) : -1) !==
        -1
      );
    });

    this.setState(
      {
        searchText: searchTextData,
        isSearched: true,
        orderArray: searchArr,
      },
      () => console.log(this.state.orderArray)
    );
  }

  flatListItemSeparator = () => {
    return <View style={styles.divider} />;
  };

  renderListEmpty = () => {
    return (
      <View style={styles.orderContainer}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: Dimens.twentyTwo,
            fontFamily: Fonts.SourceSansProSemibold,
            color: Colors.textHeadingColor,
            marginTop: heightPercentageToDP(50),
          }}
          children={'No orders yet!'}
        />
      </View>
    );
  };

  _keyExtractor = (item, index) => index.toString();

  renderOrderView = data => {
    let item = data.item;
    return (
      <View style={styles.orderContainer}>
        <View style={styles.orderAndDateStyle}>
          <Text
            style={styles.orderNumberStyle}
            children={'Order Ref No ' + item.kenkoOrderId}
          />
          <Text
            style={styles.orderNumberStyle}
            children={'04:45PM 22 Jan,2019'}
          />
        </View>

        <Text
          style={styles.redeemPointStyle}
          children={
            'Redeemed ' +
            item.kenkoCredits +
            ' and paid ' +
            '\u20B9' +
            item.txnAmt
          }
        />

        <View style={styles.PlanContainer}>
          <FastImage
            style={styles.planImageConatiner}
            source={require('../../../assets/profilePic.jpeg')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={styles.planTextStyle}
            children={'1mg Diabetes Care Plan'}
          />
        </View>
      </View>
    );
  };

  render() {
    const {isFetching} = this.props.OrderReducer;
    const {orderArray} = this.state;

    return (
      <View style={styles.container}>
        <Toast ref="toast" />

        <Text style={styles.mainHeaderTextStyle} children={'Orders'} />

        {isFetching && <Loader />}

        <View style={styles.mainHeadingContainer}>
          <BoxShadow inset={true} side={'top'} setting={shadowOpt}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.headingContainer]}
            >
              <Text style={styles.headerTextStyle} children={'My Orders'} />
            </TouchableOpacity>
          </BoxShadow>

          <FlatList
            data={orderArray}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderOrderView}
            style={styles.flatlistContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={this.renderListEmpty}
            ItemSeparatorComponent={this.flatListItemSeparator}
            // ListHeaderComponent={this.renderHeader}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    OrderReducer: state.OrderReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: jsonObj => {
      dispatch(getOrders(jsonObj));
    },
  };
};

const getOrders = jsonObj => {
  return {
    type: constants.FETCHING_ORDERS,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderListScreen);
