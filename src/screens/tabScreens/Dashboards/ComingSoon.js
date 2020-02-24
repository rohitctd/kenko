import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Dimens, isIphoneXorAbove, Colors} from '../../../utils/Theme';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ComingSoon extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
              position:'absolute',
            width: '10%',
            left:Dimens.twenty,
            top:Dimens.twenty,
          }}
        >
          <Icon
            name={'ios-arrow-back'}
            color="white"
            size={Dimens.twentyFive}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <FastImage
          style={styles.staticImage}
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/newSvg/commingSoon.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:Colors.rewardScreenBackground},
  staticImage: {
    width: '80%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: Dimens.eight,
  },
});
