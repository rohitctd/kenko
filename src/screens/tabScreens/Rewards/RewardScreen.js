import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import Shimmer from 'react-native-shimmer';
import NetInfo from '@react-native-community/netinfo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Toast, {DURATION} from 'react-native-easy-toast';

import {Colors, Dimens, Fonts} from '../../../utils/Theme';
import styles from './styles';
import * as constants from '../../../utils/Constants';
import Loader from '../../../component/Loader';
import {RewardComponent} from './RewardComponent';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');

let reference = null;
let stateReference = null;

class RewardScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTapBarIndex: 0,
      rewardCategoryId: '',
      stateRewardList: [],
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
      showGoBack: true,
    };
  }

  componentDidMount() {
    reference = this.props;
    stateReference = this.state;
    this.focusListener = reference.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.rewardScreenBackground);
    });

    NetInfo.isConnected.fetch().done(isConnected => {
      if (!isConnected) {
        this.refs.toast.show('No internet connection', DURATION.LENGTH_SHORT);
        return;
      }
      this.props.getRewardCategories();
      this.props.getRewardList();
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {rewardList} = nextProps.RewardListReducer;
    return {
      stateRewardList:
        rewardList != null && rewardList.length > 0 ? rewardList : [],
    };
  }

  componentDidUpdate(nextProps, prevState) {
    if (prevState.rewardCategoryId != this.state.rewardCategoryId) {
      this.props.getRewardList(
        JSON.stringify({categoryId: this.state.rewardCategoryId})
      );
    }
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _renderItem({item}, parallaxProps) {
    const {userdata} = reference.UserDetailReducer;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          reference.navigation.navigate('RewardDetailScreen', {
            RewardObj: JSON.stringify(item),
            CreditScorePoints: userdata.kenkoCreditScore,
          });
        }}
      >
        {/* <Shimmer> */}
        <ParallaxImage
          source={{uri: item.bannerImage}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.3}
          {...parallaxProps}
        />
        {/* <RewardComponent /> */}
        {/* </Shimmer> */}
        <Text style={styles.title} numberOfLines={2} children={item.detail} />
      </TouchableOpacity>
    );
  }

  renderTapBarItem = data => {
    let item = data.item;
    let index = data.index;
    return (
      <TouchableOpacity
        style={{justifyContent: 'center', flex: 1}}
        onPress={() => {
          this.setState({selectedTapBarIndex: index}, () => {
            this.props.getRewardList(
              JSON.stringify({categoryId: item.categoryId})
            );
          });
        }}
      >
        <Text
          style={{
            marginLeft: Dimens.fifteen,
            marginRight: Dimens.thirty,
            color: Colors.white,
            fontFamily:
              this.state.selectedTapBarIndex == index
                ? Fonts.SourceSansProBlack
                : Fonts.SourceSansProSemibold,
            fontSize:
              this.state.selectedTapBarIndex == index
                ? Dimens.twentyThree
                : Dimens.eighteen,
          }}
          children={item.categoryName}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {stateRewardList, showGoBack} = this.state;
    const {rewardCategories, isFetching} = this.props.RewardListReducer;
    const {userdata} = this.props.UserDetailReducer;

    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor={Colors.rewardScreenBackground}
          barStyle="light-content"
          translucent={false}
        />

        <Toast ref="toast" />

        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={[
                styles.headerTextStyle,
                !showGoBack
                  ? {paddingTop: Dimens.two}
                  : {paddingHorizontal: Dimens.twenty},
              ]}
              children={'REWARDS'}
            />
          </View>
          <View style={styles.kenkoCreditsStyle}>
            <Text style={styles.kenkoHeaderStyle} children={'Kenko Credits'} />
            <Text
              style={styles.kenkoPointStyle}
              children={
                userdata.kenkoCreditScore == '' ||
                userdata.kenkoCreditScore == null ||
                userdata.kenkoCreditScore == undefined
                  ? 0
                  : userdata.kenkoCreditScore
              }
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {/* Tab bar View........ */}
          <View style={styles.bottomTabBarContainer}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={rewardCategories}
              extraData={this.state}
              renderItem={this.renderTapBarItem}
            />
          </View>

          {/* Grid View........ */}
          <View style={styles.bottomGridContainer}>
            {/* {stateRewardList.length > 0 ? ( */}
            <Carousel
              sliderWidth={width}
              sliderHeight={Dimens.sixty}
              itemWidth={width - Dimens.sixty}
              data={stateRewardList}
              renderItem={this._renderItem}
              hasParallaxImages={true}
            />
            {/* ) : (
              <FastImage
                style={styles.staticImage}
                resizeMode={FastImage.resizeMode.contain}
                source={require('../../../assets/newSvg/commingSoon.png')}
              />
            )} */}
          </View>
        </View>

        {isFetching && <Loader />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    RewardListReducer: state.RewardListReducer,
    UserDetailReducer: state.UserDetailReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRewardCategories: () => {
      dispatch(getRewardCategories());
    },
    getRewardList: jsonObj => {
      dispatch(getRewardList(jsonObj));
    },
  };
};

const getRewardCategories = () => {
  return {
    type: constants.FETCHING_REWARD_CATEGORIES,
  };
};

const getRewardList = jsonObj => {
  return {
    type: constants.FETCHING_REWARD_LIST,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RewardScreen);
