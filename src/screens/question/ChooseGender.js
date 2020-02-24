import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Dimens, Colors, Fonts} from '../../utils/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Toast, {DURATION} from 'react-native-easy-toast';

import {connect} from 'react-redux';
import * as constants from '../../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Loader from '../../component/Loader';

class ChooseGender extends React.Component {
  constructor(props) {
    super(props);
    StatusBar.setHidden(false);
  }

  state = {
    message: '',
    userDetail: '',
    isMaleSelected: true,
  };

  componentDidMount() {
    AsyncStorage.getItem('LoginResponse')
      .then(response => {
        console.log(response);
        this.setState({
          userDetail: JSON.parse(response),
          isMaleSelected: JSON.parse(response).data[0].gender == 'male',
        });
      })
      .catch(err => console.log(err));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {genderUpdationSuccess, errorMessageGender} = nextProps.EmailReducer;

    if (genderUpdationSuccess) {
      nextProps.initializeGenderReducer();
      AsyncStorage.setItem('GENDER_SCREEN', 'Yes');

      nextProps.navigation.navigate('TermsScreen', {
        selectedGender: prevState.isMaleSelected ? 'male' : 'female',
      });
    }
    return {message: errorMessageGender};
  }

  showMessage = () => {
    const {message} = this.state;
    if (message == null || message == undefined || message == '') {
      return;
    }
    this.refs.toast.show(message, DURATION.LENGTH_SHORT);
  };

  render() {
    const {isMaleSelected, userDetail} = this.state;
    const {isUpdatingGender} = this.props.EmailReducer;

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.fontStyling} children={'Gender'} />
        <Toast ref="toast" />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({isMaleSelected: true});
            }}
            style={[
              styles.buttonStyling,
              isMaleSelected ? styles.selectedState : styles.unselectedState,
            ]}
          >
            <Icon
              style={{margin: Dimens.twenty}}
              color={isMaleSelected ? '#2D9CD7' : Colors.white}
              size={Dimens.eighty}
              name={'male'}
            />
            <Text
              style={[
                styles.textStyling,
                {color: isMaleSelected ? '#2D9CD7' : Colors.white},
              ]}
              children={'Male'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({isMaleSelected: false});
            }}
            style={[
              styles.buttonStyling,
              {marginLeft: Dimens.five},
              !isMaleSelected ? styles.selectedState : styles.unselectedState,
            ]}
          >
            <Icon
              style={{margin: Dimens.twenty}}
              color={!isMaleSelected ? '#F52EBF' : Colors.white}
              size={Dimens.eighty}
              name={'female'}
            />
            <Text
              style={[
                styles.textStyling,
                {
                  color: !isMaleSelected ? '#F52EBF' : Colors.white,
                },
              ]}
              children={'Female'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.nextButtonContainer}
          onPress={() => {
            NetInfo.isConnected.fetch().done(isConnected => {
              if (!isConnected) {
                this.refs.toast.show(
                  'No internet connection',
                  DURATION.LENGTH_SHORT
                );
                return;
              }
              global.accessToken =
                userDetail.token == null || userDetail.token == undefined
                  ? ''
                  : userDetail.token;

              this.props.updateGender(
                userDetail.data[0].id,
                JSON.stringify({gender: isMaleSelected ? 'male' : 'female'})
              );
            });
          }}
          activeOpacity={0.5}
        >
          <Text style={styles.nextIconText} children={'Next'} />

          <FeatherIcon
            color={Colors.loginTextColor}
            size={Dimens.thirty}
            name={'chevron-right'}
          />
        </TouchableOpacity>

        {isUpdatingGender && <Loader />}
        {this.showMessage()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    EmailReducer: state.EmailReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateGender: (id, jsonObj) => {
      dispatch(updateGender(id, jsonObj));
    },
    initializeGenderReducer: () => {
      dispatch(initializeGenderReducer());
    },
  };
};

const initializeGenderReducer = () => {
  return {
    type: constants.INITIALIZE_GENDER_REDUCER,
  };
};

const updateGender = (id, jsonObj) => {
  return {
    type: constants.UPDATING_GENDER,
    id,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseGender);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: Dimens.twentyFive,
    backgroundColor: Colors.loginBackground,
  },
  fontStyling: {
    marginTop: Dimens.eighty,
    color: Colors.white,
    fontSize: Dimens.thirty,
    fontFamily: Fonts.SourceSansProBold,
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: Dimens.twentySeven,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyling: {
    flex: 0.47,
    flexDirection: 'column',
    borderWidth: Dimens.one,
    borderColor: Colors.white,
    borderRadius: Dimens.twenty,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyling: {
    fontFamily: Fonts.SourceSansProBold,
    fontSize: Dimens.twentyFive,
    color: Colors.white,
    textAlign: 'center',
    paddingBottom: Dimens.twenty,
  },
  unselectedState: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  selectedState: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 0,
  },
  nextButtonContainer: {
    bottom: Dimens.twenty,
    right: Dimens.twenty,
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextIconText: {
    color: Colors.loginTextColor,
    textAlign: 'center',
    marginBottom: Dimens.three,
    fontSize: Dimens.twenty,
    fontFamily: Fonts.SourceSansProRegular,
  },
  iconStyle: {
    width: Dimens.twentyFive,
    height: Dimens.twentyFive,
  },
});
