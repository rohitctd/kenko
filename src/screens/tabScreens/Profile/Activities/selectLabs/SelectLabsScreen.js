import React, {PureComponent} from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import {Dimens, Colors, shadowOpt} from '../../../../../utils/Theme';
const width = Dimensions.get('screen').width;

let data = require('./labs.json');

class SelectLabsScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    internetConnected: false,
  };

  flatListItemSeparator = () => {
    return <View style={styles.divider} />;
  };

  renderListEmpty = () => {
    return (
      <View>
        <Text>No Labs yet</Text>
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id.toString();

  renderLabView = data => {
    let item = data.item;
    return (
      <View style={styles.itemContainer}>
        <FastImage
          style={styles.planImageConatiner}
          source={require('../../../../../assets/images/k_active.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.PlanContainer}>
          <Text style={styles.nameStyle} children={item.labName} />
          <Text
            style={styles.addressStyle}
            numberOfLines={5}
            children={item.labAddress}
          />

          <View
            style={{flexDirection: 'row', paddingHorizontal: Dimens.fifteen}}
          >
            <Text style={styles.distanceStyle} children={item.distance} />
            <Text
              style={styles.locationLabelStyle}
              children={', from your location'}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: Dimens.fifteen,
              paddingTop: Dimens.ten,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <FontAwesome
              style={styles.distanceStyle}
              size={Dimens.thirtyFive}
              color={Colors.activityBackgroundColor}
              name={'location-arrow'}
            />
            <Text style={styles.directionLabelStyle} children={'Direction'} />
          </View>
        </View>
        <FeatherIcon
          onPress={() => {
            this.props.navigation.navigate('CalenderScreen');
          }}
          style={{alignSelf: 'center', flex: 0.1, marginVertical: Dimens.ten}}
          color={Colors.activityBackgroundColor}
          size={Dimens.twentyFive}
          name={'chevron-right'}
        />
      </View>
    );
  };

  renderLabListView() {
    return (
      <View style={styles.mainHeadingContainer}>
        <BoxShadow
          inset={true}
          side={'top'}
          setting={{
            width: parseInt(width),
            height: Dimens.sixtyFive,
            color: '#000',
            border: Dimens.ten,
            radius: Dimens.twenty,
            opacity: 0.1,
            x: 0,
            y: -Dimens.eight,
            style: {
              marginVertical: -10,
            },
          }}
        >
          <TouchableOpacity style={[styles.headingContainer]}>
            <Text style={styles.headerTextStyle} children={'Select Lab'} />
          </TouchableOpacity>
        </BoxShadow>

        <FlatList
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderLabView}
          style={styles.flatlistContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={this.renderListEmpty}
          ItemSeparatorComponent={this.flatListItemSeparator}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileHeaderTextStyle}>
          <FeatherIcon
            style={styles.backIconStyle}
            onPress={() => this.props.navigation.goBack()}
            color={Colors.loginTextColor}
            size={Dimens.thirtyFive}
            name={'chevron-left'}
          />
        </View>
        {this.renderLabListView()}
      </View>
    );
  }
}

export default SelectLabsScreen;
