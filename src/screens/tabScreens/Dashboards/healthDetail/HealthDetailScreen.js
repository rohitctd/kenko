import React, {PureComponent} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RNSwipeVerify from 'react-native-swipe-verify';
import moment from 'moment';

import styles from './styles';
const {width} = Dimensions.get('window');

import {Dimens, Colors, shadowOpt, Fonts} from '../../../../utils/Theme';

class HealthDetailScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      internetConnected: false,
      healthDetailList: this.props.navigation.getParam('healthDetailList', ''),
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBackgroundColor(Colors.dashBoardBackground);
    });

    this.blurListener = this.props.navigation.addListener('didBlur', () => {
      if (this.refs.healthSwipe) this.refs.healthSwipe.reset();
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
      <View
        style={{
          fontSize: Dimens.twenty,
          paddingHorizontal: Dimens.ten,
          paddingTop: Dimens.ten,
          paddingBottom: Dimens.twenty,
          height: Dimens.threeHundred,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: Dimens.twentyTwo,
            fontFamily: Fonts.SourceSansProSemibold,
            color: Colors.textHeadingColor,
            marginTop: Dimens.fifty,
          }}
          children={'No Health Activity yet!'}
        />
      </View>
    );
  };

  _keyExtractor = (item, index) => index.toString();

  renderhealthView = data => {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.itemStyle}>
          <View style={styles.leftContainer}>
            <Text
              style={styles.dateStyle}
              children={moment
                .unix(parseInt(data.item.date._seconds))
                .format('DD MMM, YYYY')}
            />
            <Text style={styles.signStyle} children={data.item.title} />
            <Text style={styles.detailStyle} children={data.item.description} />
          </View>
          <Icon
            style={styles.iconStyle}
            name={data.item.positiveIcon ? 'arrowup' : 'arrowdown'}
            color={data.item.positiveIcon ? '#97d654' : '#ca443f'}
            size={Dimens.twentyFive}
          />
        </View>
      </View>
    );
  };

  _renderListFooter() {
    const {healthDetailList} = this.state;

    return (
      healthDetailList.length > 0 && (
        <View
          style={{
            backgroundColor: '#f5f5f5',
            flex: 0.1,
            paddingHorizontal: Dimens.fifteen,
            paddingVertical: Dimens.twentyFive,
          }}
        >
          <RNSwipeVerify
            ref={'healthSwipe'}
            borderRadius={Dimens.hundred}
            width={width - Dimens.hundred}
            style={{marginTop: Dimens.ten}}
            buttonSize={Dimens.fifty}
            borderColor="#f5f5f5"
            buttonColor={Colors.dashBoardBackground}
            backgroundColor={'#fcc9ee'}
            okButton={{visible: true, duration: 500}}
            onVerified={() => {
              this.props.navigation.navigate('ComingSoon');
            }}
            icon={
              <Image
                source={require('../../../../assets/swipebutton.png')}
                style={{
                  width: Dimens.twentyFive,
                  height: Dimens.twentyFive,
                }}
              />
            }
          >
            <Text
              style={styles.swipeButtonStyle}
              children={'Recommended Improvement plan'}
            />
          </RNSwipeVerify>
        </View>
      )
    );
  }

  renderhealthListView() {
    return (
      <View style={styles.mainHeadingContainer}>
        {/* <BoxShadow inset={true} side={"top"} setting={shadowOpt}> */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.showSelectedView('orders');
          }}
          style={[styles.headingContainer]}
        >
          <Text style={styles.headerTextStyle} children={'Health Profile'} />
        </TouchableOpacity>
        {/* </BoxShadow> */}

        <FlatList
          data={this.state.healthDetailList}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderhealthView}
          style={styles.flatlistContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={this.renderListEmpty}
          ItemSeparatorComponent={this.flatListItemSeparator}
        />
        {this._renderListFooter()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileHeaderTextStyle}>
          <FeatherIcon
            style={styles.backIconStyle}
            onPress={() => this.props.navigation.goBack()}
            color={Colors.loginTextColor}
            size={Dimens.thirtyFive}
            name={'chevron-left'}
          />
        </View>
        {this.renderhealthListView()}
      </View>
    );
  }
}

export default HealthDetailScreen;
