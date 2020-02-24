import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {BoxShadow} from 'react-native-shadow';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');
import * as constants from '../../../../utils/Constants';
import {Colors, Dimens, Fonts} from '../../../../utils/Theme';
import styles from './styles';
import Loader from '../../../../component/Loader';

let reference = null;

class RewardDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    let rewardObj = JSON.parse(this.props.navigation.getParam('RewardObj'));
    this.state = {
      selectedTapBarIndex: 0,
      rewardObj: rewardObj,
      rewardId: rewardObj.rewardId,
    };
  }

  componentDidMount() {
    reference = this.props;
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.rewardScreenBackground);
    });

    this.props.getRewardRedemption(this.state.rewardId);
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _renderItem({item, index}, parallaxProps) {
    const {rewardRedemptions} = reference.RewardRedemptionReducer;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          reference.navigation.navigate('CheckoutScreen', {
            CreditScorePoints: reference.navigation.getParam(
              'CreditScorePoints'
            ),
            RewardObj: reference.navigation.getParam('RewardObj'),
            RewardRedemptionObj: JSON.stringify(item),
          });
        }}
      >
        <View style={{padding: Dimens.fifteen, marginTop: Dimens.fifteen}}>
          <Text
            style={{
              fontSize: Dimens.eighteen,
              color: Colors.white,
              fontFamily: Fonts.SourceSansProSemibold,
            }}
            children={'KENKO CREDIT + CASH'}
          />
        </View>
        <View style={{padding: Dimens.fifteen, flexDirection: 'row'}}>
          <View style={{paddingRight: Dimens.fifteen}}>
            <Text
              style={{
                fontSize: Dimens.twentyThree,
                color: Colors.white,
                fontFamily: Fonts.SourceSansProSemibold,
              }}
              children={item.cash}
            />
            <Text
              style={{
                fontSize: Dimens.twentyFive,
                color: Colors.white,
                fontFamily: Fonts.SourceSansProSemibold,
              }}
              children={'Credits'}
            />
          </View>
          <Text
            style={{
              fontSize: Dimens.twentyFive,
              color: Colors.white,
              fontFamily: Fonts.SourceSansProSemibold,
            }}
            children={item.points}
          />
        </View>
        {/* <ParallaxImage
          source={{uri: rewardRedemptions[0].bannerImage}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.3}
          {...parallaxProps}
        /> */}
      </TouchableOpacity>
    );
  }

  renderDetailView = () => {
    const {rewardObj} = this.state;
    const {rewardRedemptions} = this.props.RewardRedemptionReducer;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainHeadingContainer}>
          <FastImage
            style={styles.mainImageContainer}
            source={{uri: rewardObj.logoImage}}
            resizeMode={FastImage.resizeMode.contain}
          />

          <View style={styles.redemptionStyle}>
            <BoxShadow
              inset={true}
              side={'top'}
              setting={{
                width: parseInt(width),
                height: Dimens.fifty,
                color: '#000',
                border: Dimens.fifteen,
                radius: Dimens.twenty,
                opacity: 0.15,
                x: 0,
                y: -Dimens.three,
                style: {
                  marginVertical: Dimens.zero,
                },
              }}
            >
              <Text
                style={styles.redemptionHeaderStyle}
                children={'Redemption Options'}
              />
            </BoxShadow>
            <View style={styles.carouselStyle}>
              <Carousel
                sliderWidth={width}
                // sliderHeight={'100%'}
                itemWidth={width - Dimens.hundred}
                data={rewardRedemptions[0].rewardRedemptions}
                renderItem={this._renderItem}
                hasParallaxImages={true}
              />
            </View>
          </View>

          <View style={styles.detailContainer}>
            <BoxShadow
              inset={true}
              side={'top'}
              setting={{
                width: parseInt(width),
                height: Dimens.fifty,
                color: '#000',
                border: Dimens.fifteen,
                radius: Dimens.twenty,
                opacity: 0.15,
                x: 0,
                y: -Dimens.three,
                style: {
                  marginTop: Dimens.zero,
                },
              }}
            >
              <Text
                style={styles.detailHeaderStyle}
                children={rewardRedemptions[0].rewardName}
              />
            </BoxShadow>

            <View style={styles.detailBackgroundColor}>
              <Text
                style={styles.detaiolStyling}
                children={rewardRedemptions[0].detail}
              />
              <Text
                style={styles.benefitsHeaderStyling}
                children={rewardRedemptions[0].benefit}
              />
              <Text
                style={styles.benefitsHeaderStyling}
                children={rewardRedemptions[0].instruction}
              />
              <Text
                style={styles.benefitsHeaderStyling}
                children={rewardRedemptions[0].termsAndConditions}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  render() {
    const {isFetching} = this.props.RewardRedemptionReducer;
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor={Colors.rewardScreenBackground}
          barStyle="light-content"
          translucent={false}
        />
        <View style={styles.headerTextStyle}>
          <FeatherIcon
            onPress={() => this.props.navigation.goBack()}
            color={Colors.loginTextColor}
            size={Dimens.thirtyFive}
            name={'chevron-left'}
          />
        </View>
        {this.renderDetailView()}
        {isFetching && <Loader />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {RewardRedemptionReducer: state.RewardRedemptionReducer};
};

const mapDispatchToProps = dispatch => {
  return {
    getRewardRedemption: jsonObj => {
      dispatch(getRewardRedemption(jsonObj));
    },
  };
};

const getRewardRedemption = jsonObj => {
  return {
    type: constants.GETTING_REWARD_REDEMPTIONS,
    jsonObj,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RewardDetailScreen);
