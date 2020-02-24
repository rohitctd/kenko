import React, {PureComponent} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import AnimateNumber from 'react-native-animate-number';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import RNSwipeVerify from 'react-native-swipe-verify';
import {Colors, Dimens, shadowOpt, Fonts} from '../../../../utils/Theme';
import styles from './styles';
const {width} = Dimensions.get('window');
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import VideoModalComponent from '../../../../component/VideoModalComponent';
import ProgressCircle from 'react-native-progress-circle';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const dashBoardArr = [
  {
    id: 1,
    title: 'Kenko Score',
  },
  {
    id: 2,
    title: 'What is this score?',
  },
  {
    id: 3,
    title: 'Recent Activity',
  },
];
let i = 0;

export default class KenkoScoreScreen extends PureComponent {
  constructor(props) {
    super(props);

    let recentActivity = this.props.navigation.getParam('recentactivity', []);
    let activity = recentActivity.filter(obj => {
      return obj.kenko_score_update;
    });
    this.state = {
      internetConnected: false,
      kenkoScore: true,
      score: false,
      sum: false,
      scoreValue: this.props.navigation.getParam('scoreValue', ''),
      recentActivitiesArr: activity,
      currentTime: 0,
      duration: 10,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'contain',
      gifIndex: 0,
      showVideoModal: false,
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBackgroundColor(Colors.dashBoardBackground);
    });

    this.blurListener = this.props.navigation.addListener('didBlur', () => {
      if (this.refs.scoreSwipe) this.refs.scoreSwipe.reset();
    });

    // this.myLoop(30 + (50 * parseInt(this.state.scoreValue)) / 1000);
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
      kenkoScore: false,
      score: false,
      [viewName]: true,
    });

  getBackgroundColor = id => {
    let color = '';
    let textColor = '';
    switch (id) {
      case 1:
        textColor = Colors.white;
        color = Colors.kenkoScore;
        break;
      case 2:
        textColor = Colors.white;
        color = Colors.rewardScreenBackground;
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
        this.showSelectedView('kenkoScore');
        break;

      case 2:
        this.showSelectedView('score');
        break;

      default:
        if (recentActivitiesArr.length > 0) this.showSelectedView('recent');
        break;
    }
  };

  getGif = score => {
    let value = '';
    switch (score) {
      case 0:
        value = require('../../../../assets/scoreGif/frame_00_delay-0.01s.gif');
        break;
      case 1:
        value = require('../../../../assets/scoreGif/frame_01_delay-0.01s.gif');
        break;
      case 2:
        value = require('../../../../assets/scoreGif/frame_02_delay-0.01s.gif');
        break;
      case 3:
        value = require('../../../../assets/scoreGif/frame_03_delay-0.01s.gif');
        break;
      case 4:
        value = require('../../../../assets/scoreGif/frame_04_delay-0.01s.gif');
        break;
      case 5:
        value = require('../../../../assets/scoreGif/frame_05_delay-0.01s.gif');
        break;
      case 6:
        value = require('../../../../assets/scoreGif/frame_06_delay-0.01s.gif');
        break;
      case 7:
        value = require('../../../../assets/scoreGif/frame_07_delay-0.01s.gif');
        break;
      case 8:
        value = require('../../../../assets/scoreGif/frame_08_delay-0.01s.gif');
        break;
      case 9:
        value = require('../../../../assets/scoreGif/frame_09_delay-0.01s.gif');
        break;
      case 10:
        value = require('../../../../assets/scoreGif/frame_10_delay-0.01s.gif');
        break;
      case 11:
        value = require('../../../../assets/scoreGif/frame_11_delay-0.01s.gif');
        break;
      case 12:
        value = require('../../../../assets/scoreGif/frame_12_delay-0.01s.gif');
        break;
      case 13:
        value = require('../../../../assets/scoreGif/frame_13_delay-0.01s.gif');
        break;
      case 14:
        value = require('../../../../assets/scoreGif/frame_14_delay-0.01s.gif');
        break;
      case 15:
        value = require('../../../../assets/scoreGif/frame_15_delay-0.01s.gif');
        break;
      case 16:
        value = require('../../../../assets/scoreGif/frame_16_delay-0.01s.gif');
        break;
      case 17:
        value = require('../../../../assets/scoreGif/frame_17_delay-0.01s.gif');
        break;
      case 18:
        value = require('../../../../assets/scoreGif/frame_18_delay-0.01s.gif');
        break;
      case 19:
        value = require('../../../../assets/scoreGif/frame_19_delay-0.01s.gif');
        break;
      case 20:
        value = require('../../../../assets/scoreGif/frame_20_delay-0.01s.gif');
        break;
      case 21:
        value = require('../../../../assets/scoreGif/frame_21_delay-0.01s.gif');
        break;
      case 22:
        value = require('../../../../assets/scoreGif/frame_22_delay-0.01s.gif');
        break;
      case 23:
        value = require('../../../../assets/scoreGif/frame_23_delay-0.01s.gif');
        break;
      case 24:
        value = require('../../../../assets/scoreGif/frame_24_delay-0.01s.gif');
        break;
      case 25:
        value = require('../../../../assets/scoreGif/frame_25_delay-0.01s.gif');
        break;
      case 26:
        value = require('../../../../assets/scoreGif/frame_26_delay-0.01s.gif');
        break;
      case 27:
        value = require('../../../../assets/scoreGif/frame_27_delay-0.01s.gif');
        break;
      case 28:
        value = require('../../../../assets/scoreGif/frame_28_delay-0.01s.gif');
        break;
      case 29:
        value = require('../../../../assets/scoreGif/frame_29_delay-0.01s.gif');
        break;
      case 30:
        value = require('../../../../assets/scoreGif/frame_30_delay-0.01s.gif');
        break;
      case 31:
        value = require('../../../../assets/scoreGif/frame_31_delay-0.01s.gif');
        break;
      case 32:
        value = require('../../../../assets/scoreGif/frame_32_delay-0.01s.gif');
        break;
      case 33:
        value = require('../../../../assets/scoreGif/frame_33_delay-0.01s.gif');
        break;
      case 34:
        value = require('../../../../assets/scoreGif/frame_34_delay-0.01s.gif');
        break;
      case 35:
        value = require('../../../../assets/scoreGif/frame_35_delay-0.01s.gif');
        break;
      case 36:
        value = require('../../../../assets/scoreGif/frame_36_delay-0.01s.gif');
        break;
      case 37:
        value = require('../../../../assets/scoreGif/frame_37_delay-0.01s.gif');
        break;
      case 38:
        value = require('../../../../assets/scoreGif/frame_38_delay-0.01s.gif');
        break;
      case 39:
        value = require('../../../../assets/scoreGif/frame_39_delay-0.01s.gif');
        break;
      case 40:
        value = require('../../../../assets/scoreGif/frame_40_delay-0.01s.gif');
        break;
      case 41:
        value = require('../../../../assets/scoreGif/frame_41_delay-0.01s.gif');
        break;
      case 42:
        value = require('../../../../assets/scoreGif/frame_42_delay-0.01s.gif');
        break;
      case 43:
        value = require('../../../../assets/scoreGif/frame_43_delay-0.01s.gif');
        break;
      case 44:
        value = require('../../../../assets/scoreGif/frame_44_delay-0.01s.gif');
        break;
      case 45:
        value = require('../../../../assets/scoreGif/frame_45_delay-0.01s.gif');
        break;
      case 46:
        value = require('../../../../assets/scoreGif/frame_46_delay-0.01s.gif');
        break;
      case 47:
        value = require('../../../../assets/scoreGif/frame_47_delay-0.01s.gif');
        break;
      case 48:
        value = require('../../../../assets/scoreGif/frame_48_delay-0.01s.gif');
        break;
      case 49:
        value = require('../../../../assets/scoreGif/frame_49_delay-0.01s.gif');
        break;
      case 50:
        value = require('../../../../assets/scoreGif/frame_50_delay-0.01s.gif');
        break;
      case 51:
        value = require('../../../../assets/scoreGif/frame_51_delay-0.01s.gif');
        break;
      case 52:
        value = require('../../../../assets/scoreGif/frame_52_delay-0.01s.gif');
        break;
      case 53:
        value = require('../../../../assets/scoreGif/frame_53_delay-0.01s.gif');
        break;
      case 54:
        value = require('../../../../assets/scoreGif/frame_54_delay-0.01s.gif');
        break;
      case 55:
        value = require('../../../../assets/scoreGif/frame_55_delay-0.01s.gif');
        break;
      case 56:
        value = require('../../../../assets/scoreGif/frame_56_delay-0.01s.gif');
        break;
      case 57:
        value = require('../../../../assets/scoreGif/frame_57_delay-0.01s.gif');
        break;
      case 58:
        value = require('../../../../assets/scoreGif/frame_58_delay-0.01s.gif');
        break;
      case 59:
        value = require('../../../../assets/scoreGif/frame_59_delay-0.01s.gif');
        break;
      case 60:
        value = require('../../../../assets/scoreGif/frame_60_delay-0.01s.gif');
        break;
      case 61:
        value = require('../../../../assets/scoreGif/frame_61_delay-0.01s.gif');
        break;
      case 62:
        value = require('../../../../assets/scoreGif/frame_62_delay-0.01s.gif');
        break;
      case 63:
        value = require('../../../../assets/scoreGif/frame_63_delay-0.01s.gif');
        break;
      case 64:
        value = require('../../../../assets/scoreGif/frame_64_delay-0.01s.gif');
        break;
      case 65:
        value = require('../../../../assets/scoreGif/frame_65_delay-0.01s.gif');
        break;
      case 66:
        value = require('../../../../assets/scoreGif/frame_66_delay-0.01s.gif');
        break;
      case 67:
        value = require('../../../../assets/scoreGif/frame_67_delay-0.01s.gif');
        break;
      case 68:
        value = require('../../../../assets/scoreGif/frame_68_delay-0.01s.gif');
        break;
      case 69:
        value = require('../../../../assets/scoreGif/frame_69_delay-0.01s.gif');
        break;
      case 70:
        value = require('../../../../assets/scoreGif/frame_70_delay-0.01s.gif');
        break;
      case 71:
        value = require('../../../../assets/scoreGif/frame_71_delay-0.01s.gif');
        break;
      case 72:
        value = require('../../../../assets/scoreGif/frame_72_delay-0.01s.gif');
        break;
      case 73:
        value = require('../../../../assets/scoreGif/frame_73_delay-0.01s.gif');
        break;
      case 74:
        value = require('../../../../assets/scoreGif/frame_74_delay-0.01s.gif');
        break;
      case 75:
        value = require('../../../../assets/scoreGif/frame_75_delay-0.01s.gif');
        break;
      case 76:
        value = require('../../../../assets/scoreGif/frame_76_delay-0.01s.gif');
        break;
      case 77:
        value = require('../../../../assets/scoreGif/frame_77_delay-0.01s.gif');
        break;
      case 78:
        value = require('../../../../assets/scoreGif/frame_78_delay-0.01s.gif');
        break;
      case 79:
        value = require('../../../../assets/scoreGif/frame_79_delay-0.01s.gif');
        break;
      case 80:
        value = require('../../../../assets/scoreGif/frame_80_delay-0.01s.gif');
        break;
      default:
        value = require('../../../../assets/scoreGif/frame_80_delay-0.01s.gif');
        break;
    }
    return value;
  };

  myLoop = lastValue => {
    setTimeout(() => {
      if (i <= lastValue) {
        this.setState({gifSrc: this.getGif(i)}, () => {
          i++;
          this.myLoop(lastValue);
        });
      }
    }, 520);
  };

  getGifAccordingToScore(score) {
    switch (score) {
      case 1:
        return require('../../../../assets/loader/gif1.gif');
      case 2:
        return require('../../../../assets/loader/gif2.gif');
      case 3:
        return require('../../../../assets/loader/gif3.gif');
      case 4:
        return require('../../../../assets/loader/gif4.gif');
      case 5:
        return require('../../../../assets/loader/gif5.gif');
      case 6:
        return require('../../../../assets/loader/gif6.gif');
      case 7:
        return require('../../../../assets/loader/gif7.gif');
      case 8:
        return require('../../../../assets/loader/gif8.gif');
      case 9:
        return require('../../../../assets/loader/gif9.gif');
      case 10:
        return require('../../../../assets/loader/gif10.gif');
      default:
        return require('../../../../assets/loader/gif1.gif');
    }
  }

  renderKenkoScore = () => {
    return (
      <View style={styles.kenkoContainer}>
        <ProgressCircle
          percent={(this.state.scoreValue * 100) / 1000}
          radius={Dimens.hundred}
          borderWidth={Dimens.ten}
          color={Colors.scoreColor}
          shadowColor="#fffff4"
          bgColor={Colors.kenkoScore}
        >
          <View
            style={{
              position: 'absolute',
              elevation: 2,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <AnimateNumber
              style={{
                fontSize: Dimens.eighty,
                color: Colors.white,
                fontFamily: Fonts.SourceSansProSemibold,
              }}
              value={this.state.scoreValue}
              interval={5}
              countBy={10}
            />
            <Text
              style={{
                fontSize: Dimens.eighteen,
                color: Colors.white,
                fontFamily: Fonts.SourceSansProSemibold,
              }}
              children={'Goal 1000'}
            />
          </View>
        </ProgressCircle>
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
                'https://firebasestorage.googleapis.com/v0/b/calcium-doodad-244801.appspot.com/o/Asset%2FVideos%2F2nd%20Video%20Kenko%20with%20soundeffects.mp4?alt=media&token=747fe53b-3b28-4525-9f4d-5e040d94ddec',
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
            ref={'scoreSwipe'}
            borderRadius={Dimens.hundred}
            width={width - Dimens.hundred}
            style={{marginTop: Dimens.ten}}
            buttonSize={Dimens.fifty}
            buttonColor={Colors.white}
            backgroundColor={'#f9c842'}
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
                color={'#f9c842'}
              />
            }
          >
            <Text
              style={styles.swipeButtonStyle}
              children={'Improve your score'}
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

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  //To show on whole Screen
  dashBoardView = () => {
    const {kenkoScore, score} = this.state;
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

          {item.id == 1 && kenkoScore ? this.renderKenkoScore() : null}
          {item.id == 2 && score ? this.renderScoreVideo() : null}
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
                'https://firebasestorage.googleapis.com/v0/b/calcium-doodad-244801.appspot.com/o/Asset%2FVideos%2F2nd%20Video%20Kenko%20with%20soundeffects.mp4?alt=media&token=747fe53b-3b28-4525-9f4d-5e040d94ddec',
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
