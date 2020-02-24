import React, {PureComponent} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  BackHandler,
  StyleSheet,
  Keyboard,
  Text,
} from 'react-native';
import {Dimens, Colors, Fonts} from '../utils/Theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

export default class CityComponent extends PureComponent {
  constructor(props) {
    super(props);
    try {
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
    this.state = {cities: props.data};
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    this.props.hideComponent();
    return true;
  };

  _ItemSeparatorComponent = () => {
    return <View style={styles.itemSeperator} />;
  };

  _renderItems = data => {
    return (
      <TouchableOpacity
        key={data.item.name.toString()}
        onPress={() => this.props.selectedCity(data.item)}
      >
        <Text
          style={{
            fontFamily: Fonts.SourceSansProSemibolds,
            fontSize: Dimens.twenty,
            padding: Dimens.tweleve,
          }}
          children={data.item.name}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.viewContainer}>
        <FlatList
          numColumns={1}
          getItemLayout={(data, index) => ({
            length: 30,
            offset: 30 * index,
            index,
          })}
          keyboardDismissMode={'on-drag'}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          data={this.state.cities}
          extraData={this.state.cities}
          disableVirtualization={false}
          style={styles.listContainer}
          keyExtractor={(item, index) => {
            (index + Math.floor(Math.random() * Math.floor(3))).toString();
          }}
          renderItem={this._renderItems}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    width: width,
    height: height - 20,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
  },
  listContainer: {
    width: '70%',
    height: '80%',
    position: 'absolute',
    elevation: 30,
    margin: Dimens.ten,
    backgroundColor: 'white',
    borderRadius: Dimens.ten,
  },
  itemSeperator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.loginBackground,
  },
});
