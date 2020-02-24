import React, {PureComponent} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import Svg, {Ellipse, G, Path} from 'react-native-svg';
import AsyncStorage from '@react-native-community/async-storage';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import FastImage from 'react-native-fast-image';
import {Dimens, Colors} from '../../utils/Theme';

export default class Vedio extends PureComponent {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 10,
      isLoading: true,
      paused: false,
      screenType: 'cover',

      isFullScreen: false,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
    };

    try {
      AsyncStorage.setItem('IsVideoPlayed', 'Yes');
    } catch (error) {
      console.log('Error', error);
    }
  }

  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onProgress = data => {
    const {isLoading, playerState} = this.state;
    this.setState({currentTime: data.currentTime});
  };

  onLoad = data => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = data => this.setState({isLoading: true});

  onEnd = () => {
    this.props.navigation.navigate('SignInScreen');
  };

  onSeeking = currentTime => this.setState({currentTime});

  render() {
    return (
      <View style={styles.container}>
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          resizeMode={this.state.screenType}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          source={require('../../assets/new/IntroVideo.mp4')}
          style={styles.mediaPlayer}
          volume={10}
        />

        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="100%"
          viewBox="0 0 44 168"
          style={{
            position: 'absolute',
            right: 0,
          }}
          onPress={() => this.props.navigation.navigate('SignInScreen')}
        >
          <G fill="none" fillRule="evenodd" transform="translate(1 -21)">
            <Ellipse
              cx="110"
              cy="105"
              fill="#000"
              fillOpacity="0.5"
              stroke="#fff"
              strokeOpacity="0.252"
              opacity="0.749"
              rx="110"
              ry="105"
            ></Ellipse>
            <Path
              fill="#fff"
              fillRule="nonzero"
              d="M19.857 99l-.857.844L27.286 108 19 116.156l.857.844L29 108z"
              opacity="0.704"
            ></Path>
          </G>
        </Svg>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaPlayer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
});
