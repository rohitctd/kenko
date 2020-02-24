import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Dimens, Colors} from '../utils/Theme';
import CountDown from 'react-native-countdown-component';

const loaderPath = require('../assets/kenko_coffee.gif');
export default KenkoCoffeeLoader = React.memo(props => {
  return (
    <View
      style={{
        height: '110%',
        width: '120%',
        position: 'absolute',
        zIndex: 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
      }}
    >
      <FastImage
        source={loaderPath}
        style={{
          borderRadius: Dimens.ten,
          height: Dimens.threeFifty,
          width: Dimens.threeFifty,
        }}
      />

      <View style={{marginTop: Dimens.twenty}}>
        {props.showTimer && (
          <CountDown
            timeToShow={['M', 'S']}
            timeLabels={false}
            size={10}
            digitTxtStyle={{color: Colors.white}}
            digitStyle={{backgroundColor: Colors.loginBackground}}
            until={59}
            onFinish={() => {}}
            onPress={() => {}}
            size={Dimens.twentyFive}
            showSeparator={true}
            separatorStyle={{color: Colors.white}}
            running={props.showTimer}
          />
        )}
      </View>
    </View>
  );
});
