import React from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {RNCamera} from 'react-native-camera';
import CountDown from 'react-native-countdown-component';

import styles from './styles';
import {Colors, Dimens} from '../../utils/Theme';
import firebase from 'react-native-firebase';
import {storage} from '../../firebase/Firebase';
import AsyncStorage from '@react-native-community/async-storage';
import KenkoCoffee from '../../component/KenkoCoffee';

let cameraRef = null;

export default class VideoRecordingScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 10,
      isFullScreen: false,
      isLoading: true,
      paused: true,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',

      openCamera: true,
      cameraType: 'front',
      flash: 'off',
      autoFocus: 'on',
      isRecording: false,
      uploading: false,
      progress: 0,
      videoUrl: '',
      userDetail: '',
      timer: 0,
      disableCaptureButton: false,

      showTimer: false,
    };
  }

  startTimer = () => {
    this.clockCall = setInterval(() => {
      this.incrementClock();
    }, 1000);
  };

  incrementClock = () => {
    if (this.state.timer === 30) {
      clearInterval(this.clockCall);
    } else {
      this.setState(prevstate => ({timer: prevstate.timer + 1}));
    }
  };

  stopTimer() {
    clearInterval(this.clockCall);
  }

  componentWillUnmount() {
    clearInterval(this.clockCall);
  }

  componentDidMount() {
    AsyncStorage.getItem('LoginResponse')
      .then(response => this.setState({userDetail: JSON.parse(response)}))
      .catch(err => console.log(err));
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

  onReplay = () => {
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const {isLoading, playerState} = this.state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };

  onLoad = data => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = data => this.setState({isLoading: true});

  onEnd = () => this.setState({playerState: PLAYER_STATES.ENDED});

  onSeeking = currentTime => this.setState({currentTime});

  takeVideo = async () => {
    if (cameraRef) {
      try {
        const promise = cameraRef.recordAsync({
          mute: false,
          maxDuration: 30,
          quality: RNCamera.Constants.VideoQuality['480p'],
        });

        if (promise) {
          this.setState({
            isRecording: true,
          });
          const data = await promise;
          this.setState({
            isRecording: false,
            videoUrl: data.uri,
            openCamera: false,
            disableCaptureButton: true,
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  uploadToFireBase = () => {
    const {videoUrl, isRecording, userDetail, uploading} = this.state;

    if (isRecording) {
      this.refs.toast.show('Please end the video recording before proceeding');
      return;
    }

    if (videoUrl == null || videoUrl == '' || videoUrl == undefined) {
      this.refs.toast.show('Please record your video first');
      return;
    }

    if (uploading) {
      this.refs.toast.show('Please wait while we upload your video');
      return;
    }

    let userMobileNumber = userDetail.data[0].mobileNumber;
    const ext = videoUrl.split('.').pop();
    const filename = `${userMobileNumber}.${ext}`;
    this.setState({uploading: true}, () => {
      storage
        .ref('video-intel/' + filename)
        .putFile(videoUrl)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            let state = {};
            state = {
              ...state,
              progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100, // Calculate progress percentage
            };
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              this.setState({showTimer: true});
              setTimeout(() => {
                this.setState(
                  {
                    uploading: false,
                    progress: '0',
                    showTimer: false,
                    paused: true,
                  },
                  () => {
                    AsyncStorage.setItem('IsVideoUploaded', 'Yes');
                    this.props.navigation.navigate('Question2Screen');
                  }
                );
              }, 60000);
            } else if (snapshot.state === firebase.storage.TaskState.ERROR) {
              this.setState({uploading: false, progress: '0'}, () =>
                console.log('Error', 'Error while uploading Video ')
              );
            }

            this.setState(state);
          },
          error => {
            Alert.alert('Failure', 'Sorry, Please try again.');
          }
        );
    });
  };

  render() {
    return (
      <View style={styles.videoScreenContainer}>
        <Toast ref="toast" />
        <View style={styles.backButtonContainer}>
          <Icon
            name={'ios-arrow-back'}
            color="white"
            size={Dimens.twenty}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <Text
          style={styles.textHeaderI}
          children={'Tell us your name, age & place of residence'}
        />
        <View style={styles.mainContainerForVideo}>
          <View style={styles.vedioContainer}>
            {this.state.openCamera ? (
              <RNCamera
                ref={ref => {
                  cameraRef = ref;
                }}
                captureAudio={true}
                style={styles.cameraStyling}
                type={this.state.cameraType}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
              >
                <FastImage
                  style={styles.faceRecognitionStyling}
                  resizeMode={FastImage.resizeMode.contain}
                  source={require('../../assets/newSvg/facial-recognition.png')}
                />
              </RNCamera>
            ) : (
              <View style={styles.mediaPlayerStyling}>
                <Video
                  onEnd={this.onEnd}
                  onLoad={this.onLoad}
                  onLoadStart={this.onLoadStart}
                  onProgress={this.onProgress}
                  paused={this.state.paused}
                  ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                  resizeMode={this.state.screenType}
                  source={{uri: this.state.videoUrl}}
                  style={{flex: 1, backgroundColor: 'black'}}
                  volume={10}
                />

                <MediaControls
                  duration={this.state.duration}
                  isLoading={this.state.isLoading}
                  mainColor="#333"
                  onPaused={this.onPaused}
                  onReplay={this.onReplay}
                  onSeek={this.onSeek}
                  onSeeking={this.onSeeking}
                  playerState={this.state.playerState}
                  progress={this.state.currentTime}
                />
              </View>
            )}
          </View>

          {!this.state.disableCaptureButton && (
            <TouchableOpacity
              style={[
                styles.cameraButtonContainer,
                {borderColor: this.state.isRecording ? 'white' : 'red'},
              ]}
              activeOpacity={this.state.disableCaptureButton ? 1 : 0}
              onPress={() => {
                if (this.state.isRecording) {
                  this.stopTimer();
                  cameraRef.stopRecording();
                  this.setState({
                    openCamera: false,
                    disableCaptureButton: true,
                  });
                } else {
                  this.setState({openCamera: true}, () => {
                    this.startTimer();
                    this.takeVideo();
                  });
                }
              }}
            >
              <FastImage
                style={styles.cameraButtonStyling}
                source={require('../../assets/camera_btn.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.refreshContainer}
            onPress={() => {
              if (this.state.isRecording) {
                this.refs.toast.show(
                  'Please end the video recording before proceeding'
                );
                return;
              }
              this.setState({
                disableCaptureButton: false,
                videoUrl: '',
                uploading: false,
                openCamera: true,
                timer: 0,
              });
            }}
          >
            <FastImage
              style={styles.refreshStyle}
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/newSvg/refresh.png')}
            />
          </TouchableOpacity>

          <View style={styles.counterStyle}>
            <Text
              style={[styles.timerText, {fontSize: Dimens.twenty}]}
              children={
                '00 : ' +
                (this.state.timer < 10
                  ? '0' + this.state.timer
                  : this.state.timer)
              }
            />

            <Text
              style={[styles.timerText, {fontSize: Dimens.twenty}]}
              children={' / 00 : 30'}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              if (this.state.isRecording) {
                this.refs.toast.show('Please stop video first!');
                return;
              }
              setTimeout(() => {
                this.setState({
                  disableCaptureButton: false,
                  videoUrl: '',
                  uploading: false,
                  openCamera: true,
                  timer: 0,
                  cameraType:
                    this.state.cameraType == 'back' ? 'front' : 'back',
                });
              }, 50);
            }}
          >
            <FastImage
              style={styles.rotateIconStyle}
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/newSvg/rotate.png')}
            />
          </TouchableOpacity>
        </View>

        {this.state.uploading && (
          <KenkoCoffee showTimer={this.state.showTimer} />
        )}

        <TouchableOpacity
          style={styles.nextButtonContainer}
          onPress={() => this.uploadToFireBase()}
          activeOpacity={0.5}
        >
          <Text style={styles.nextIconText} children={'Upload & Next'} />

          <FeatherIcon
            color={Colors.loginTextColor}
            size={Dimens.thirty}
            name={'chevron-right'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
