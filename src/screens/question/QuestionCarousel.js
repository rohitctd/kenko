import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import * as constants from '../../utils/Constants';
import Loader from '../../component/Loader';
import {Dimens, Colors, Fonts} from '../../utils/Theme';
const {width} = Dimensions.get('window');
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';

let answeredQuestions = [];
let arr = [];

let reference = null;
class QuestionCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 1,
      selectedCheckbox: [],
    };
  }

  componentDidMount() {
    reference = this;
    AsyncStorage.getItem('LoginResponse')
      .then(response => this.setState({userDetail: JSON.parse(response)}))
      .catch(err => console.log(err));

    this.props.getMultipleQuestions(
      this.props.navigation.getParam('selectedGender', 'male')
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {answeredSaved} = nextProps.SavingQuestionReducer;
    if (answeredSaved) {
      nextProps.initializeSaveQuestion();
      AsyncStorage.setItem('QUESTION_CAROUSEL', 'Yes');
      nextProps.navigation.navigate('Permission');
    }
    return null;
  }

  _renderQuestionView() {
    const {multipleQuestions} = this.props.MultipleQuestionsReducer;
    const {userDetail} = this.state;

    return (
      <View>
        <View
          style={{
            padding: Dimens.twentyFive,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop:
              Platform.OS == 'ios'
                ? isIphoneXorAbove()
                  ? Dimens.thirtyFive
                  : Dimens.twenty
                : Dimens.Zero,
          }}
        >
          <FastImage
            style={{height: Dimens.twentyFive, width: Dimens.twentyFive}}
            source={require('../../assets/newSvg/coinQues.png')}
          />
          <Text
            style={{
              marginHorizontal: Dimens.tweleve,
              color: Colors.white,
              fontSize: Dimens.twenty,
              fontFamily: Fonts.SourceSansProSemibold,
              textAlign: 'justify',
            }}
            children={'70/200'}
          />
        </View>
        <Text
          style={{
            paddingHorizontal: Dimens.twentyFive,
            color: Colors.white,
            fontSize: Dimens.twenty,
            fontFamily: Fonts.SourceSansProSemibold,
            textAlign: 'right',
          }}
          children={this.state.activeSlide + '/' + multipleQuestions.length}
        />
        <View
          style={{
            marginHorizontal: Dimens.twentyFive,
            height: Dimens.five,
            marginTop: Dimens.twentyFive,
            backgroundColor: '#3B3B3B',
            borderRadius: Dimens.ten,
          }}
        >
          <View
            style={[
              {
                height: Dimens.five,
                backgroundColor: 'white',
                borderRadius: Dimens.ten,
              },
              {
                width:
                  multipleQuestions.length > 0
                    ? (this.state.activeSlide * 100) /
                        multipleQuestions.length +
                      '%'
                    : '0%',
              },
            ]}
          />
        </View>

        {this._renderQuestionCarousel()}

        <Text
          style={{
            paddingHorizontal: Dimens.twentyFive,
            marginTop: Dimens.ten,
            color: Colors.white,
            fontSize: Dimens.twenty,
            fontFamily: Fonts.SourceSansProSemibold,
            textAlign: 'center',
          }}
          children={'You will earn 20 credits on answering this questions'}
        />

        <View
          style={{
            paddingHorizontal: Dimens.twentyFive,
            marginTop: Dimens.fourty,
            marginHorizontal: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            onPress={() => {
              AsyncStorage.setItem('QUESTION_CAROUSEL', 'Yes');

              this.props.navigation.navigate('Permission');
            }}
            style={{
              color: Colors.white,
              fontSize: Dimens.twenty,
              fontFamily: Fonts.SourceSansProRegular,
              textAlign: 'right',
            }}
            children={'Continue later'}
          />
          <TouchableOpacity
            onPress={() => {
              if (answeredQuestions.length != multipleQuestions.length) {
                this.refs.toast.show(
                  'All questions are mandatory. Please answer all the questions. You may choose to skip this step.',
                  DURATION.LENGTH_SHORT
                );
                return;
              }

              global.accessToken =
                userDetail.token == null || userDetail.token == undefined
                  ? ''
                  : userDetail.token;

              this.props.saveQuestions(
                JSON.stringify({
                  user_id: userDetail.data[0].id,
                  answers: answeredQuestions,
                })
              );
            }}
          >
            <FastImage
              style={styles.questionIcon}
              source={require('../../assets/save.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderQuestionCarousel() {
    const {multipleQuestions} = this.props.MultipleQuestionsReducer;

    return (
      <View style={styles.bottomGridContainer}>
        <TouchableWithoutFeedback
          onPressIn={Keyboard.dismiss}
          accessible={false}
        >
          <Carousel
            sliderWidth={width}
            sliderHeight={Dimens.twentyThree}
            itemWidth={width - Dimens.sixty}
            data={multipleQuestions}
            renderItem={this._renderItem}
            hasParallaxImages={true}
            onSnapToItem={index => this.setState({activeSlide: index + 1})}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  _renderItem({item, index}, parallaxProps) {
    const {selectedCheckbox} = reference.state;
    return (
      <View style={styles.questionAnsStylingContainer}>
        <View style={styles.imageContainer}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.SourceSansProBold,
              fontSize: Dimens.twenty,
              marginHorizontal: Dimens.twentyFive,
              marginTop: Dimens.twentyFive,
              marginBottom: Dimens.tweleve,
            }}
            children={item.question}
          />

          {item.type == 'text' && (
            <TextInput
              style={styles.textHeaderII}
              underlineColorAndroid={'transparent'}
              onChangeText={name => {
                let ind = answeredQuestions.findIndex(
                  obj => obj.questionNo == index
                );
                if (ind == -1) {
                  answeredQuestions.push({
                    questionNo: index,
                    answer: name,
                  });
                } else {
                  answeredQuestions[ind].answer = name;
                }
              }}
              keyboardType={'numeric'}
              placeholder={item.hint == 'weight' ? '55' : '5.9'}
              maxLength={3}
              placeholderTextColor="silver"
            />
          )}

          {item.type == 'radio' && (
            <View>
              <RadioForm
                style={{
                  padding: Dimens.twentyFive,
                }}
                radio_props={item.options}
                buttonColor={Colors.loginBackground}
                selectedButtonColor={Colors.loginBackground}
                buttonSize={Dimens.twenty}
                labelStyle={{
                  color: Colors.black,
                  padding: Dimens.ten,
                  fontSize: Dimens.twentyThree,
                  marginRight: Dimens.twentyFive,
                  fontFamily: Fonts.SourceSansProSemibold,
                }}
                initial={-1}
                formHorizontal={true}
                onPress={value => {
                  let ind = answeredQuestions.findIndex(
                    obj => obj.questionNo == index
                  );
                  if (ind == -1) {
                    answeredQuestions.push({
                      questionNo: index,
                      answer: value,
                    });
                  } else {
                    answeredQuestions[ind].answer = value;
                  }
                }}
              />
            </View>
          )}

          {item.type == 'checkbox' && (
            <View
              style={{
                paddingHorizontal: Dimens.twentyFive,
                paddingTop: Dimens.fifteen,
              }}
            >
              {item.options.map((obj, i) => {
                return (
                  <Text
                    key={i}
                    onPress={() => {
                      if (i == item.options.length - 1) {
                        arr = [];
                        arr.push(i);
                      } else {
                        let noneIndex = arr.findIndex(
                          objj => objj == item.options.length - 1
                        );
                        let index = arr.findIndex(objj => objj == i);
                        if (noneIndex != -1) {
                          arr = [];
                        }
                        if (index == -1) {
                          arr.push(i);
                        } else {
                          arr.splice(index, 1);
                        }
                      }

                      reference.setState({
                        selectedCheckbox: arr,
                      });

                      let ind = answeredQuestions.findIndex(
                        objj => objj.questionNo == index
                      );
                      if (ind == -1) {
                        answeredQuestions.push({
                          questionNo: index,
                          answer: arr,
                        });
                      } else {
                        answeredQuestions[ind].answer = arr;
                      }
                    }}
                    style={[
                      {
                        fontSize: Dimens.sixteen,
                        fontFamily: Fonts.SourceSansProSemibold,
                        marginTop: Dimens.tweleve,
                        padding: Dimens.ten,
                        textAlign: 'center',
                        borderRadius: Dimens.twentyFive,
                        borderWidth: Dimens.one,
                        borderColor: '#060606',
                      },
                      {
                        backgroundColor: selectedCheckbox.includes(i)
                          ? '#e247ba'
                          : Colors.white,
                        color: selectedCheckbox.includes(i)
                          ? Colors.white
                          : Colors.blackAplha,
                      },
                    ]}
                    children={obj}
                  />
                );
              })}
            </View>
          )}
        </View>
      </View>
    );
  }

  render() {
    const {isFetching} = this.props.MultipleQuestionsReducer;
    const {saving} = this.props.SavingQuestionReducer;
    return (
      <View style={styles.videoScreenContainer}>
        <Toast ref="toast" />
        {(isFetching || saving) && <Loader />}

        {this._renderQuestionView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    MultipleQuestionsReducer: state.MultipleQuestionsReducer,
    SavingQuestionReducer: state.SavingQuestionReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMultipleQuestions: gender => {
      dispatch(getMultipleQuestions(gender));
    },
    saveQuestions: jsonObj => {
      dispatch(saveQuestions(jsonObj));
    },
    initializeSaveQuestion: () => {
      dispatch(initializeSaveQuestion());
    },
  };
};

const initializeSaveQuestion = () => {
  return {
    type: constants.INITIALIZE_SAVE_QUESTIONS,
  };
};

const saveQuestions = jsonObj => {
  return {
    type: constants.SAVING_QUESTIONS,
    jsonObj,
  };
};

const getMultipleQuestions = gender => {
  return {
    type: constants.FETCHING_MULTIPLE_QUESTIONS,
    gender,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCarousel);

const styles = StyleSheet.create({
  videoScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.loginBackground,
  },
  questionIcon: {
    height: Dimens.twentyFive,
    width: Dimens.twentyFive,
  },
  bottomGridContainer: {
    marginTop: Dimens.ten,
    width: width,
    height: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageContainer: {
    marginVertical: Dimens.twenty,
    width: '100%',
    height: '100%',
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: Dimens.twenty,
  },
  questionAnsStylingContainer: {
    width: width - Dimens.sixtyFive,
    height: '90%',
  },
  textHeaderII: {
    width: '30%',
    alignSelf: 'center',
    marginTop: Dimens.seventy,
    paddingHorizontal: Dimens.two,
    color: Colors.appOrange,
    textAlign: 'center',
    borderBottomWidth: Dimens.one,
    borderColor: '#060606',
    fontSize: Dimens.thirty,
    fontFamily: Fonts.SourceSansProBold,
  },
});
