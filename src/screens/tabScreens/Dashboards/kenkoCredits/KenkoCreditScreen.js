import React, {PureComponent} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import AnimateNumber from 'react-native-animate-number';
import Icon from 'react-native-vector-icons/AntDesign';
import {FlatList} from 'react-native-gesture-handler';
import RNSwipeVerify from 'react-native-swipe-verify';

import {Colors, Dimens, shadowOpt, Fonts} from '../../../../utils/Theme';
import styles from './styles';
const {width} = Dimensions.get('window');
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import VideoModalComponent from '../../../../component/VideoModalComponent';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const dashBoardArr = [
  {
    id: 1,
    title: 'Kenko Credits',
  },
  {
    id: 2,
    title: 'How can I redeem Kenko credits?',
  },
  {
    id: 3,
    title: 'Recent Activity',
  },
];

export default class KenkoCreditScreen extends PureComponent {
  videoPlayer;

  constructor(props) {
    super(props);

    let recentActivity = this.props.navigation.getParam('recentactivity', []);
    let activity = recentActivity.filter(obj => {
      return obj.kenko_credit_update;
    });
    this.state = {
      internetConnected: false,
      kenkoCredit: true,
      redeemCredits: false,
      creditValue: this.props.navigation.getParam('creditValue', 0),
      recentActivitiesArr: activity,
      showVideoModal: false,
      currentTime: 0,
      duration: 10,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'contain',

      showCoinImage: false,
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
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

  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    //Handler for Replay
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const {isLoading, playerState} = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };

  onLoad = data => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = data => this.setState({isLoading: true});

  onEnd = () => this.setState({playerState: PLAYER_STATES.ENDED});

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {
    alert('Exit full screen');
  };

  enterFullScreen = () => {};

  onFullScreen = () => {
    this.setState({
      showVideoModal: true,
      paused: true,
      // screenType: this.state.screenType == 'contain' ? 'cover' : 'contain',
    });
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({currentTime});

  showSelectedView = viewName =>
    this.setState({
      kenkoCredit: false,
      redeemCredits: false,
      [viewName]: true,
    });

  getBackgroundColor = id => {
    let color = '';
    let textColor = '';
    switch (id) {
      case 1:
        textColor = Colors.white;
        color = Colors.activityBackgroundColor;
        break;
      case 2:
        textColor = Colors.white;
        color = Colors.scoreColor;
        break;
      case 3:
      default:
        textColor = Colors.black;
        color = Colors.notificationHeaderBackground;
        break;
    }
    return {color: color, textColor: textColor};
  };

  headerClickType = id => {
    const {recentActivitiesArr} = this.state;
    switch (id) {
      case 1:
        this.showSelectedView('kenkoCredit');
        break;

      case 2:
        this.showSelectedView('redeemCredits');
        break;

      default:
        if (recentActivitiesArr.length > 0) this.showSelectedView('recent');
        break;
    }
  };

  renderKenkoCredit = () => {
    return (
      <View style={styles.kenkoContainer}>
        <View>
          {this.state.showCoinImage ? (
            <FastImage
              style={{
                height: Dimens.oneSeventyFive,
                width: Dimens.oneEighty,
              }}
              source={require('../../../../assets/coin1.gif')}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <FastImage
              style={{
                height: Dimens.oneSeventyFive,
                width: Dimens.oneEighty,
              }}
              onLoad={() => {
                setTimeout(() => {
                  this.setState({
                    showCoinImage: true,
                  });
                }, 4000);
              }}
              source={require('../../../../assets/coin.gif')}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
        <AnimateNumber
          style={{
            flex: 0.6,
            textAlign: 'center',
            fontSize: Dimens.eighty,
            color: Colors.white,
            fontFamily: Fonts.SourceSansProSemibold,
          }}
          value={this.state.creditValue}
          interval={10}
          countBy={10}
        />
      </View>
    );
  };

  renderScoreVideo = () => {
    return (
      <View style={styles.healthContainer}>
        <View style={styles.itemStyle}>
          <Video
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            onLoadStart={this.onLoadStart}
            onProgress={this.onProgress}
            paused={this.state.paused}
            ref={videoPlayer => (this.videoPlayer = videoPlayer)}
            resizeMode={this.state.screenType}
            onFullScreen={this.state.isFullScreen}
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/calcium-doodad-244801.appspot.com/o/Asset%2FVideos%2F3rd%20video%20kenko%20with%20soundeffects.mp4?alt=media&token=a6a52c72-0413-4e6e-8cd7-d21f6b7a02f2',
            }}
            style={{
              width: '100%',
              height: Dimens.twoTwenty,
              flexDirection: 'row',
              backgroundColor: Colors.blackAplha,
            }}
            volume={10}
          />

          <MediaControls
            duration={this.state.duration}
            isLoading={this.state.isLoading}
            mainColor="#333"
            onFullScreen={this.onFullScreen}
            onPaused={this.onPaused}
            onReplay={this.onReplay}
            onSeek={this.onSeek}
            onSeeking={this.onSeeking}
            playerState={this.state.playerState}
            progress={this.state.currentTime}
            //   toolbar={this.renderToolbar()}
          />
        </View>
        <View
          style={{
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
            buttonSize={Dimens.fifty}
            buttonColor={Colors.white}
            backgroundColor={'#d8ec42'}
            okButton={{visible: true, duration: 500}}
            onVerified={() => {
              this.setState({paused: true}, () => {
                this.props.navigation.navigate('Rewards');
              });
            }}
            icon={
              <Icon
                name={'arrowright'}
                size={Dimens.twentyFive}
                color={'#d8ec42'}
              />
            }
          >
            <Text
              style={styles.swipeButtonStyle}
              children={'Redeem your credits'}
            />
          </RNSwipeVerify>
        </View>
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id.toString();

  renderRecentActivity = () => {
    const {recentActivitiesArr} = this.state;
    return (
      <FlatList
        style={{
          height:
            recentActivitiesArr.length <= 0
              ? heightPercentageToDP(50)
              : heightPercentageToDP(75),
        }}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderRecentActivities}
        data={recentActivitiesArr}
        ListEmptyComponent={this._recentDataEmptyConatiner}
      />
    );
  };

  _recentDataEmptyConatiner = () => {
    return (
      <View
        style={[styles.nohealthContainer, {height: heightPercentageToDP(45)}]}
      >
        <Text
          style={[
            styles.noHealthDataStyle,
            {marginTop: Dimens.hundred, color: Colors.black},
          ]}
          children={'No Recent Activity Data yet!'}
        />
      </View>
    );
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
            children={this.Capitalize(item.actionType)}
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

  //To show on whole Screen
  dashBoardView = () => {
    const {kenkoCredit, redeemCredits} = this.state;
    return dashBoardArr.map((item, index) => {
      let colors = this.getBackgroundColor(item.id).color;
      let textColor = this.getBackgroundColor(item.id).textColor;
      return (
        <View
          key={index}
          style={[
            styles.notificationDetailContainer,
            {
              backgroundColor: colors,
              marginTop: index == 0 ? 0 : -Dimens.sixteen,
            },
          ]}
        >
          {/* <BoxShadow inset={true} side={"top"} setting={shadowOpt}> */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.headerClickType(item.id);
            }}
          >
            <Text
              style={[styles.notificationHeaderStyle, {color: textColor}]}
              children={item.title}
            />
          </TouchableOpacity>
          {/* </BoxShadow> */}

          {item.id == 1 && kenkoCredit ? this.renderKenkoCredit() : null}
          {item.id == 2 && redeemCredits ? this.renderScoreVideo() : null}
          {item.id == 3 ? this.renderRecentActivity() : null}
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerTextStyle}>
          <FeatherIcon
            style={styles.backIconStyle}
            onPress={() => this.props.navigation.goBack()}
            color={Colors.loginTextColor}
            size={Dimens.thirtyFive}
            name={'chevron-left'}
          />
        </View>

        <ScrollView style={styles.mainHeadingContainer}>
          {this.dashBoardView()}
        </ScrollView>

        {this.state.showVideoModal && (
          <VideoModalComponent
            videoProp={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/calcium-doodad-244801.appspot.com/o/Asset%2FVideos%2F3rd%20video%20kenko%20with%20soundeffects.mp4?alt=media&token=a6a52c72-0413-4e6e-8cd7-d21f6b7a02f2',
            }}
            showModal={this.state.showVideoModal}
            hideModal={() =>
              this.setState({showVideoModal: false, paused: false})
            }
          />
        )}
      </View>
    );
  }
}
