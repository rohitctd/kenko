import React from 'react';
import {StyleSheet, Modal, View, Text, TouchableOpacity} from 'react-native';
import {Dimens, Colors} from '../utils/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

export default class VideoModalComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 10,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',
    };
  }

  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
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

  onEnd = () => {
    this.setState({playerState: PLAYER_STATES.ENDED});
  };

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {
    alert('Exit full screen');
  };

  enterFullScreen = () => {};

  onFullScreen = () => {
    if (this.state.screenType == 'contain')
      this.setState({screenType: 'cover'});
    else this.setState({screenType: 'contain'});
  };

  onSeeking = currentTime => this.setState({currentTime});
  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        supportedOrientations={['portrait', 'landscape']}
        visible={this.props.showModal}
        onRequestClose={this.props.hideModal}
      >
        <View style={[styles.Container]}>
          <Video
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            onLoadStart={this.onLoadStart}
            onProgress={this.onProgress}
            paused={this.state.paused}
            ref={videoPlayer => (this.videoPlayer = videoPlayer)}
            resizeMode={this.state.screenType}
            source={this.props.videoProp}
            style={styles.mediaPlayer}
            volume={10}
          />

          <MediaControls
            style={styles.mediaPlayer}
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

          <TouchableOpacity
            style={{
              position: 'absolute',
              right: Dimens.seven,
              top: Dimens.seven,
              elevation: Dimens.hundred,
            }}
            onPress={this.props.hideModal}
          >
            <Ionicons
              name="ios-close-circle-outline"
              size={Dimens.thirty}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    elevation: 2,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: Dimens.twenty,
    paddingVertical: Dimens.fourtyFive,
  },

  headerTextStyle: {
    textAlign: 'center',
    fontSize: Dimens.eighteen,
    color: Colors.white,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: Dimens.ten,
  },
  mediaPlayer: {
    position: 'absolute',
    top: Dimens.twenty,
    left: Dimens.twenty,
    bottom: Dimens.twenty,
    right: Dimens.twenty,
    backgroundColor: 'black',
  },
});
