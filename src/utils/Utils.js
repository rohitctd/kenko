import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Dimens, Colors, Fonts, isIphoneXorAbove} from './Theme';
const {height} = Dimensions.get('window');

export const showProgressDialog = (viewColor, indicatorColor, textColor) => {
  return (
    <View style={[styles.dialogBodyContainer, {backgroundColor: viewColor}]}>
      <ActivityIndicator
        color={indicatorColor}
        size={'large'}
        style={styles.activityIndicatorStyle}
      />
      <Text
        style={[styles.dialogTextStyle, {color: textColor}]}
        children={'Please Wait ....'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dialogBodyContainer: {
    flex: 1,
    width: '65%',
    marginHorizontal: Dimens.fifty,
    justifyContent: 'center',
    position: 'absolute',
    paddingVertical: Dimens.thirtyFive,
    top: height / 2 - Dimens.fifty,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.activityBackgroundColor,
    opacity: 0.95,
    zIndex: 2,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: Dimens.zero,
    color: Colors.white,
  },
  dialogTextStyle: {
    alignSelf: 'center',
    fontSize: Dimens.eighteen,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Dimens.fifteen,
    fontFamily: Fonts.SourceSansProBold,
  },
});
