import React from 'react';
import {View, StatusBar, Dimensions, Text} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {CheckBox} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import RNSwipeVerify from 'react-native-swipe-verify';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

const {width} = Dimensions.get('window');

import {Colors, Dimens, Fonts} from '../../../../utils/Theme';
import {razorPayKeyId} from '../../../../utils/Constants';
import styles from './styles';

class CheckoutScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    let rewardObj = JSON.parse(this.props.navigation.getParam('RewardObj'));
    let rewardRedemptionObj = JSON.parse(
      this.props.navigation.getParam('RewardRedemptionObj')
    );

    this.state = {
      selectedTapBarIndex: 0,
      checked: false,
      rewardObj: rewardObj,
      creditScorePoints: this.props.navigation.getParam('CreditScorePoints'),
      rewardRedemptionObj: rewardRedemptionObj,
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.dashBoardBackground);
    });
    this.blurListener = this.props.navigation.addListener('didBlur', () => {
      if (this.refs.creditSwipe) this.refs.creditSwipe.reset();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
    if (this.blurListener) {
      this.blurListener.remove();
    }
  }

  flatListItemSeparator = () => {
    return <View style={styles.divider} />;
  };

  renderListEmpty = () => {
    return (
      <View>
        <Text>No Payment Options</Text>
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id.toString();

  // renderCheckoutView = data => {
  //   let item = data.item;
  //   return (
  //     <View style={styles.itemIndexContainer}>
  //       <View style={styles.imageContainer}>
  //         <FastImage
  //           source={{uri: item.img}}
  //           style={styles.imageStyling}
  //           resizeMode={FastImage.resizeMode.contain}
  //         />
  //         <Text style={styles.textStyling} children={item.name} />
  //       </View>
  //       <Text
  //         onPress={() => {
  //           RazorpayCheckout.open({
  //             description: 'Credits towards consultation',
  //             image: 'https://i.imgur.com/3g7nmJC.png',
  //             currency: 'INR',
  //             key: razorPayKeyId,
  //             amount: this.state.rewardRedemptionObj.cashAmt,
  //             name: 'foo',
  //             prefill: {
  //               email: 'void@razorpay.com',
  //               contact: '9191919191',
  //               name: 'Razorpay Software',
  //             },
  //             theme: {color: '#F37254'},
  //           })
  //             .then(data => {
  //               // handle success
  //               console.log(`Success: ${data.razorpay_payment_id}`);
  //             })
  //             .catch(error => {
  //               // handle failure
  //               console.log(`Error: ${error.code} | ${error.description}`);
  //             });

  //           // this.props.navigation.navigate('RewardRedeemedScreen');
  //         }}
  //         style={styles.payNowStyling}
  //         children={'Pay Now'}
  //       />
  //     </View>
  //   );
  // };

  render() {
    const {rewardRedemptionObj, creditScorePoints, rewardObj} = this.state;
    const {userdata} = this.props.UserDetailReducer;
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

        <Text style={styles.headerStyle} children={rewardObj.rewardName} />
        <Text
          style={styles.creditStyling}
          children={
            creditScorePoints +
            ' credits ' +
            '\u20B9 ' +
            rewardRedemptionObj.cash
          }
        />

        <View style={styles.headingContainerStyling}>
          <View style={styles.firstHeaderContainerStyling}>
            <CheckBox
              style={{backgroundColor: 'green'}}
              checked={this.state.checked}
              onPress={() => this.setState({checked: !this.state.checked})}
            />
            <View>
              <Text
                style={styles.firstHeaderStyling}
                children={'Kenko Credits used ' + rewardRedemptionObj.points}
              />
              <Text
                style={styles.secondHeaderStyling}
                children={'Available balance ' + creditScorePoints}
              />
            </View>
          </View>
          {/* <Text
            style={styles.chooseToPay}
            children={
              'Choose an option to pay ' +
              '\u20B9' +
              rewardRedemptionObj.cashAmt
            }
          /> */}
          {/* <View style={styles.flatListDivider} /> */}
          {/* <FlatList
            data={optionArr}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderCheckoutView}
            style={styles.mainHeadingContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={this.renderListEmpty}
            ItemSeparatorComponent={this.flatListItemSeparator}
          /> */}

          <View
            style={{
              marginTop: Dimens.hundred,
              height: '20%',
              paddingHorizontal: Dimens.fifteen,
              paddingVertical: Dimens.seven,
              jusifyContent: 'flex-end',
            }}
          >
            <RNSwipeVerify
              ref={'creditSwipe'}
              borderRadius={Dimens.hundred}
              width={width - Dimens.hundred}
              buttonSize={Dimens.sixty}
              buttonColor={Colors.dashBoardBackground}
              backgroundColor={'#f6c7ec'}
              okButton={{visible: true, duration: 500}}
              onVerified={() => {
                this.refs.creditSwipe.reset();
                RazorpayCheckout.open({
                  description: 'Credits towards consultation',
                  image: userdata.profileImage,
                  currency: 'INR',
                  key: razorPayKeyId,
                  amount: this.state.rewardRedemptionObj.cashAmt,
                  name: userdata.fname,
                  prefill: {
                    email: userdata.email,
                    contact: userdata.mobileNumber,
                    name: userdata.fname,
                  },
                  theme: {color: '#F37254'},
                })
                  .then(data => {
                    // handle success
                    console.log(`Success: ${data.razorpay_payment_id}`);
                  })
                  .catch(error => {
                    // handle failure
                    console.log(`Error: ${error.code} | ${error.description}`);
                  });
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
                children={'Proceed to Pay'}
              />
            </RNSwipeVerify>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    UserDetailReducer: state.UserDetailReducer,
  };
};

export default connect(mapStateToProps)(CheckoutScreen);
