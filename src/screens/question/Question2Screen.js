import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Toast, {DURATION} from 'react-native-easy-toast';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import SelectInput from 'react-native-select-input-ios';

import * as constants from '../../utils/Constants';
import styles from './styles';
import {Colors, Dimens, Fonts, isIphoneXorAbove} from '../../utils/Theme';
import Loader from '../../component/Loader';
import {widthPercentageToDP} from 'react-native-responsive-screen';

class Question2Screen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      city: '',
      isEditedOn: false,
      userDetail: '',
      message: '',
      showCities: false,
      stateId: '',
      cityId: '',

      citiesFetched: false,
      cityArr: [],
      backUpCityArray: [],
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.props.initializeReducer();
    });

    AsyncStorage.getItem('LoginResponse')
      .then(response => {
        loginresponse = JSON.parse(response);
        global.accessToken = loginresponse.token;

        this.setState({
          userDetail: JSON.parse(response),
          name: JSON.parse(response).data[0].fname,
          age: JSON.parse(response).data[0].age.toString(),
          city: JSON.parse(response).data[0].city,
        });

        this.props.getDataFromFirebase(
          JSON.parse(response).data[0].mobileNumber
        );
        this.props.getAllCities();
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      status,
      name,
      location,
      age,
      message,
    } = nextProps.IntelligenceReducer;
    const {userDetailUpdated} = nextProps.UpdateUserDetailReducer;

    const {cities} = nextProps.CityReducer;
    if (cities.length > 0 && !prevState.citiesFetched) {
      return {cityArr: cities, backUpCityArray: cities, citiesFetched: true};
    }

    if (userDetailUpdated) {
      let user = prevState.userDetail;
      user.data[0].age = prevState.age;
      user.data[0].fname = prevState.name;
      user.data[0].city = prevState.city;

      AsyncStorage.setItem('LoginResponse', JSON.stringify(user));
      AsyncStorage.setItem('NAME_SCREEN', 'Yes');
      nextProps.navigation.navigate('EmailAddress');
    }

    if (status) {
      nextProps.initializeIntelligenceReducer();
      return {
        name: name,
        age: age,
        city: location,
      };
    }

    return null;
  }

  saveUserData = () => {
    try {
      Keyboard.dismiss();
    } catch (e) {
      console.log(e);
    }
    const {name, age, city, userDetail} = this.state;
    global.accessToken = userDetail.token;

    if (name == '') {
      this.refs.toast.show('Please enter your name', DURATION.LENGTH_SHORT);
      return;
    }

    if (age == '' || age == '0' || age == '00' || parseInt(age) < 10) {
      this.refs.toast.show('Please enter your age', DURATION.LENGTH_SHORT);
      return;
    }

    if (city == '') {
      this.refs.toast.show(
        'Please enter your place of residence',
        DURATION.LENGTH_SHORT
      );
      return;
    }

    NetInfo.isConnected.fetch().done(isConnected => {
      if (!isConnected) {
        this.refs.toast.show('No internet connection', DURATION.LENGTH_SHORT);
        return;
      }

      this.setState({isEditedOn: false}, () =>
        this.props.updateUserInformation(
          userDetail.data[0].id,
          JSON.stringify({
            age: this.state.age,
            fname: this.state.name,
            city: this.state.cityId == '' ? this.state.city : this.state.cityId,
          })
        )
      );
    });
  };

  showMessage = () => {
    const {message} = this.state;
    if (message == null || message == undefined || message == '') {
      return;
    }
    this.refs.toast.show(message, DURATION.LENGTH_SHORT);
  };

  UpdateEditProp(name) {
    setTimeout(() => {
      if (name == 'FName') {
        this.FName.focus();
      } else if (name == 'Place') {
        this.Place.focus();
      } else {
        this.Age.focus();
      }
    }, 0);

    if (!this.state.isEditedOn) this.setState({isEditedOn: true});
  }

  _ItemSeparatorComponent = () => {
    return <View style={styles.itemSeperator} />;
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
            stateId: data.item.state_id,
            cityId: data.item.id,
            city: data.item.name,
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

  _renderQuestion2View() {
    const {isEditedOn, cityArr} = this.state;
    const {isFetching} = this.props.UpdateUserDetailReducer;
    const {isFetchingUserDetail} = this.props.IntelligenceReducer;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.videoScreenContainer}>
          <Toast ref="toast" />

          <View
            style={{
              width: '10%',
              paddingTop:
                Platform.OS == 'ios'
                  ? isIphoneXorAbove()
                    ? Dimens.thirtyFive
                    : Dimens.twenty
                  : Dimens.Zero,
            }}
          >
            <Icon
              name={'ios-arrow-back'}
              color="white"
              size={Dimens.twenty}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>

          <View
            style={{
              marginTop: Dimens.oneTwenty,
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Text
              style={[styles.ageTextHeader, {flexGrow: 0.1}]}
              children={'I am'}
            />
            <TouchableOpacity
              activeOpacity={isEditedOn ? 1 : 0}
              onPress={() => {
                !isEditedOn && this.UpdateEditProp('FName');
              }}
            >
              <TextInput
                style={[styles.textHeaderII, {flexGrow: 0.2}]}
                returnKeyType="next"
                editable={isEditedOn}
                underlineColorAndroid={
                  isEditedOn ? Colors.white : 'transparent'
                }
                keyboardType={'default'}
                ref={ref => (this.FName = ref)}
                onChangeText={name => this.setState({name: name})}
                value={this.state.name}
                placeholder={'Name'}
                maxLength={18}
                placeholderTextColor="silver"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Text style={styles.ageTextHeader} children={'My age is '} />
            <TouchableOpacity
              activeOpacity={isEditedOn ? 1 : 0}
              onPress={() => {
                !isEditedOn && this.UpdateEditProp('Age');
              }}
            >
              <TextInput
                style={styles.textHeaderIII}
                returnKeyType="next"
                editable={isEditedOn}
                ref={ref => (this.Age = ref)}
                underlineColorAndroid={
                  isEditedOn ? Colors.white : 'transparent'
                }
                onChangeText={age => this.setState({age: age.trim()})}
                value={this.state.age}
                placeholder={'Age'}
                keyboardType={'numeric'}
                maxLength={2}
                placeholderTextColor="silver"
              />
            </TouchableOpacity>
            <Text style={styles.ageTextHeader} children={'years'} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text
              style={[styles.ageTextHeader, {flexGrow: 0.1}]}
              children={'I stay in '}
            />

            <TouchableOpacity
              activeOpacity={isEditedOn ? 1 : 0}
              onPress={() => {
                !isEditedOn && this.UpdateEditProp('Place');
              }}
            >
              <TextInput
                style={[styles.textHeaderIII, {flexGrow: 0.3}]}
                returnKeyType="next"
                editable={isEditedOn}
                ref={ref => (this.Place = ref)}
                underlineColorAndroid={
                  isEditedOn ? Colors.white : 'transparent'
                }
                onChangeText={city =>
                  this.setState(
                    {city: city, showCities: city != '' && city != null},
                    () => {
                      this.searchCityFunction(city);
                    }
                  )
                }
                value={this.state.city}
                placeholder={'Place'}
                keyboardType={'default'}
                maxLength={25}
                placeholderTextColor="silver"
              />
            </TouchableOpacity>
            {/* <Text style={styles.ageTextHeader} children={'.'} />
             */}
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginRight: widthPercentageToDP(2),
            }}
          >
            {this.state.showCities && (
              <FlatList
                numColumns={1}
                keyboardShouldPersistTaps={'always'}
                keyboardDismissMode={'on-drag'}
                ItemSeparatorComponent={this._ItemSeparatorComponent}
                data={cityArr}
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

          <View style={styles.bottomViewHeading}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <View />

              <TouchableOpacity onPress={() => this.saveUserData()}>
                <FastImage
                  style={styles.questionIcon}
                  source={require('../../assets/save.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          {(isFetching || isFetchingUserDetail) && <Loader />}
          {this.showMessage()}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return this._renderQuestion2View();
  }
}

const mapStateToProps = state => {
  return {
    IntelligenceReducer: state.IntelligenceReducer,
    UpdateUserDetailReducer: state.UpdateUserDetailReducer,
    AuthReducer: state.AuthReducer,
    CityReducer: state.CityReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserInformation: (userId, jsonObj) => {
      dispatch(updateUserInformation(userId, jsonObj));
    },
    initializeReducer: () => {
      dispatch(initializeReducer());
    },
    getDataFromFirebase: jsonObj => {
      dispatch(getDataFromFirebase(jsonObj));
    },
    initializeIntelligenceReducer: () => {
      dispatch(initializeIntelligenceReducer());
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

const initializeIntelligenceReducer = () => {
  return {
    type: constants.INITIALIZE_INTELLIGENCE,
  };
};

const getDataFromFirebase = jsonObj => {
  return {
    type: constants.FETCHING_USER_DATA_FROM_FIREBASE,
    jsonObj,
  };
};

const updateUserInformation = (userId, jsonObj) => {
  return {
    type: constants.UPDATING_USER_DATA,
    userId,
    jsonObj,
  };
};

const initializeReducer = () => {
  return {
    type: constants.INITIALIZE_USER_NAME_AGE_LOCATION_REDUCER,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question2Screen);
