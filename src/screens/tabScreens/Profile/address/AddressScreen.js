import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Toast, {DURATION} from 'react-native-easy-toast';
import NetInfo from '@react-native-community/netinfo';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {connect} from 'react-redux';
import * as constants from '../../../../utils/Constants';
import styles from './styles';
import {Dimens, Colors, shadowOpt, Fonts} from '../../../../utils/Theme';
import Loader from '../../../../component/Loader';

class AddressScreen extends PureComponent {
  constructor(props) {
    super(props);
    const {getParam} = props.navigation;
    let addressObj = getParam('AddressDetail', '');
    console.log(addressObj);
    this.state = {
      internetConnected: false,
      userDetail: addressObj,
      address1: addressObj.addressLine1,
      address2: addressObj.addressLine2,
      city: addressObj.city,
      state: addressObj.state,
      pincode: addressObj.regionCode,
      showCities: false,
      cityId: '',
      citiesFetched: false,
      cityArr: [],
      backUpCityArray: [],
    };
  }

  componentDidMount() {
    this.refs.address.focus();
    this.props.getAllCities();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {addressUpdated} = nextProps.UpdateUserSettingReducer;
    const {cities} = nextProps.CityReducer;

    if (addressUpdated) {
      nextProps.initializeAddressReducer();
      nextProps.navigation.goBack();
    }

    if (cities.length > 0 && !prevState.citiesFetched) {
      return {cityArr: cities, backUpCityArray: cities, citiesFetched: true};
    }
    return null;
  }

  saveAddress = () => {
    const {
      address1,
      address2,
      city,
      state,
      pincode,
      cityId,
      userDetail,
    } = this.state;

    if (address1 == '') {
      this.refs.toast.show('Please enter your address', DURATION.LENGTH_SHORT);
      return;
    }
    // if (address2 == '') {
    //   this.refs.toast.show('Please enter Address!', DURATION.LENGTH_SHORT);
    //   return;
    // }
    if (city == '') {
      this.refs.toast.show('Please enter city', DURATION.LENGTH_SHORT);
      return;
    }
    if (state == '') {
      this.refs.toast.show('Please enter state', DURATION.LENGTH_SHORT);
      return;
    }
    if (pincode == '') {
      this.refs.toast.show('Please enter pincode', DURATION.LENGTH_SHORT);
      return;
    }

    NetInfo.isConnected.fetch().done(isConnected => {
      if (!isConnected) {
        this.refs.toast.show('No internet connection', DURATION.LENGTH_SHORT);
        return;
      }

      this.props.updateUserAdress(
        JSON.stringify({
          app_notification: userDetail.appNotificationStatus,
          email_notification: userDetail.emailNotificationStatus,
          address: {
            addressLine1: address1,
            addressLine2: address2,
            city: cityId == '' ? city : cityId,
            regionCode: pincode,
            state: state,
          },
          user_id: userDetail.id,
        })
      );
    });
  };

  _renderItems = data => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: Dimens.fifteen,
          alignItems: 'center',
        }}
        key={data.item.name.toString()}
        onPress={() => {
          try {
            Keyboard.dismiss();
          } catch (e) {
            console.log(e);
          }
          this.setState({
            showCities: false,
            stateId: data.item.state.id,
            cityId: data.item.id,
            city: data.item.name,
            state: data.item.state.name,
          });
        }}
      >
        <EntypoIcon
          style={{marginRight: Dimens.ten}}
          name={'location-pin'}
          size={Dimens.twentyFive}
          color={'gray'}
        />

        <Text
          style={{
            flex: 1,
            fontFamily: Fonts.SourceSansProSemibolds,
            fontSize: Dimens.twenty,
          }}
          children={data.item.name}
        />
      </TouchableOpacity>
    );
  };

  searchCityFunction = city => {
    if (city == '' || city == null || city == undefined) {
      return;
    }

    let searchCity = city.toUpperCase();
    let backUpCityArr = this.state.backUpCityArray;

    let searchArr = backUpCityArr.filter(item => {
      const name = `${item.name.toUpperCase()} `;
      return (
        (name.match(searchCity) != null ? name.match(searchCity) : -1) !== -1
      );
    });

    this.setState({cityArr: searchArr});
  };

  render() {
    const {cityArr} = this.state;
    const {updatingAddress} = this.props.UpdateUserSettingReducer;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                <Text style={styles.headerTextStyle} children={'My Address'} />
              </TouchableOpacity>
            </BoxShadow>

            <ScrollView
              style={styles.orderContainer}
              keyboardShouldPersistTaps={'always'}
              keyboardDismissMode={'on-drag'}
              nestedScrollEnabled={true}
            >
              <View style={styles.inputContainer}>
                <Text style={styles.labelText} children={'Address Line 1'} />
                <TextInput
                  style={styles.textInput}
                  ref={'address'}
                  onChangeText={val => this.setState({address1: val})}
                  onSubmitEditing={() => this.refs.address2.focus()}
                  defaultValue={this.state.address1}
                  keyboardType="email-address"
                  returnKeyType="next"
                  placeholder="Address line 1"
                  placeholderTextColor={Colors.placeHolderColor}
                  selectionColor={Colors.notificationHeaderTextColor}
                  maxLength={40}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labelText} children={'Address Line 2'} />
                <TextInput
                  style={styles.textInput}
                  ref={'address2'}
                  onChangeText={val => this.setState({address2: val})}
                  onSubmitEditing={() => this.refs.city.focus()}
                  defaultValue={this.state.address2}
                  keyboardType="email-address"
                  returnKeyType="next"
                  placeholder="Address line 2"
                  placeholderTextColor={Colors.placeHolderColor}
                  selectionColor={Colors.notificationHeaderTextColor}
                  maxLength={25}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labelText} children={'City'} />
                <TextInput
                  style={styles.textInput}
                  ref={'city'}
                  onChangeText={city =>
                    this.setState(
                      {city: city, showCities: city != '' && city != null},
                      () => {
                        this.searchCityFunction(city);
                      }
                    )
                  }
                  // onChangeText={val => this.setState({city: val})}
                  onSubmitEditing={() => this.refs.pincode.focus()}
                  defaultValue={this.state.city}
                  keyboardType="email-address"
                  returnKeyType="next"
                  placeholder="City"
                  placeholderTextColor={Colors.placeHolderColor}
                  selectionColor={Colors.notificationHeaderTextColor}
                  maxLength={25}
                />
                {this.state.showCities && (
                  <FlatList
                    numColumns={1}
                    keyboardShouldPersistTaps={'always'}
                    keyboardDismissMode={'on-drag'}
                    maxHeight={Dimens.twoHundred}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    data={cityArr}
                    nestedScrollEnabled={true}
                    extraData={cityArr}
                    disableVirtualization={false}
                    style={styles.listContainer}
                    renderItem={this._renderItems}
                    ListEmptyComponent={() => {
                      return (
                        <Text
                          style={{
                            flex: 1,
                            marginTop: '50%',
                            textAlign: 'center',
                            fontFamily: Fonts.SourceSansProSemibolds,
                            fontSize: Dimens.twenty,
                            padding: Dimens.tweleve,
                          }}
                          children={'No city available by this name'}
                        />
                      );
                    }}
                    getItemLayout={(data, index) => ({
                      length: 30,
                      offset: 30 * index,
                      index,
                    })}
                    keyExtractor={(item, index) => {
                      (
                        index + Math.floor(Math.random() * Math.floor(3))
                      ).toString();
                    }}
                  />
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labelText} children={'Pincode'} />
                <TextInput
                  style={styles.textInput}
                  ref={'pincode'}
                  onChangeText={val => this.setState({pincode: val})}
                  onSubmitEditing={() => this.refs.state.focus()}
                  defaultValue={this.state.pincode}
                  keyboardType="number-pad"
                  returnKeyType="next"
                  placeholder="Pin Code"
                  placeholderTextColor={Colors.placeHolderColor}
                  selectionColor={Colors.notificationHeaderTextColor}
                  maxLength={6}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labelText} children={'State'} />
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                >
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        flex: 1,
                        borderBottomWidth: 0,
                        color: Colors.placeHolderColor,
                      },
                    ]}
                    ref={'state'}
                    onChangeText={val => this.setState({state: val})}
                    onSubmitEditing={() => this.saveAddress()}
                    defaultValue={this.state.state}
                    keyboardType="email-address"
                    returnKeyType="done"
                    placeholder="State"
                    editable={false}
                    placeholderTextColor={Colors.dimTextColor}
                    selectionColor={Colors.notificationHeaderTextColor}
                    maxLength={40}
                  />
                  <EvilIcons
                    color={Colors.dimTextColor}
                    size={Dimens.thirtyFive}
                    name={'lock'}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.saveAddress();
                }}
                activeOpacity={0.5}
              >
                <Text
                  style={styles.saveButtonStyle}
                  children={'SAVE ADDRESS'}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>

          {updatingAddress && <Loader />}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    UpdateUserSettingReducer: state.UpdateUserSettingReducer,
    CityReducer: state.CityReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserAdress: jsonObj => {
      dispatch(updateUserAdress(jsonObj));
    },
    initializeAddressReducer: () => {
      dispatch(initializeAddressReducer());
    },
    getAllCities: () => {
      dispatch(getAllCities());
    },
  };
};

const getAllCities = () => {
  return {
    type: constants.GETTING_CITIES,
  };
};

const initializeAddressReducer = () => {
  return {
    type: constants.INITIALIZE_ADDRESS_REDUCER,
  };
};

const updateUserAdress = jsonObj => {
  return {
    type: constants.UPDATING_USER_ADDRESS,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressScreen);
