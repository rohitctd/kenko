import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Dimens} from '../utils/Theme';

const loaderPath = require('../assets/kenko_loader.gif');
export default Loader = React.memo(props => {
  return (
    <View
      style={[
        {
          zIndex: 10,
          position: 'absolute',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          height: '110%',
          width: '120%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        props.loaderStyle,
      ]}
    >
      <FastImage
        source={loaderPath}
        style={{
          borderRadius: Dimens.ten,
          height: Dimens.twoFifty,
          width: Dimens.twoFifty,
        }}
      />
    </View>
  );
});
