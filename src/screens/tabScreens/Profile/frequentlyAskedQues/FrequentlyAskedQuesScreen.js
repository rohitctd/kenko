import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList, Animatable} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import FeatherIcon from 'react-native-vector-icons/Feather';

import styles from './styles';
let dummyData = require('./frequentlyAskedQuestion.json');
import {Dimens, Colors, shadowOpt, Fonts} from '../../../../utils/Theme';

export default class FrequentlyAskedQuesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internetConnected: false,
      dummyData: dummyData,
    };
  }

  flatListItemSeparator = () => {
    return <View style={styles.divider} />;
  };

  renderListEmpty = () => {
    return (
      <View>
        <Text>No Questions yet</Text>
      </View>
    );
  };

  _keyExtractor = (item, index) => index.toString();

  renderQuestionView = data => {
    return (
      <View
        style={{
          flex: 1,
          marginBottom: Dimens.five,
          paddingHorizontal: Dimens.ten,
          backgroundColor: Colors.white,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            let dummy = this.state.dummyData;
            dummy.map(obj => (obj.isSelected = false));
            dummy[data.index].isSelected = true;
            this.setState({
              dummyData: dummy,
            });
          }}
          style={{
            flexDirection: 'row',
            padding: Dimens.ten,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#2e2e2e',
              flex: 0.95,
              fontWeight: 'bold',
              textAlign: 'justify',
              paddingRight: Dimens.five,
              fontSize: Dimens.sixteen,
              fontFamily: Fonts.SourceSansProSemibold,
            }}
            children={data.item.ques}
          />
          <FeatherIcon
            name={data.item.isSelected ? 'chevron-up' : 'chevron-down'}
            size={Dimens.twentyFive}
          />
        </TouchableOpacity>
        {data.item.isSelected && (
          <Text
            style={{
              flex: 1,
              paddingHorizontal: Dimens.ten,
              paddingBottom: Dimens.ten,
              fontSize: Dimens.sixteen,
              color: '#808080',
              textAlign: 'justify',
              fontFamily: Fonts.SourceSansProRegular,
            }}
            children={data.item.answer}
          />
        )}
      </View>
    );
  };

  render() {
    const {dummyData} = this.state;
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

        <View style={styles.mainHeadingContainer}>
          <BoxShadow inset={true} side={'top'} setting={shadowOpt}>
            <TouchableOpacity activeOpacity={1} style={styles.headingContainer}>
              <Text
                style={styles.headerTextStyle}
                children={'Frequently Asked Questions'}
              />
            </TouchableOpacity>
          </BoxShadow>

          <FlatList
            data={dummyData}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            style={styles.flatlistContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={this.renderListEmpty}
            ItemSeparatorComponent={this.flatListItemSeparator}
            ListHeaderComponent={this.renderHeader}
            renderItem={this.renderQuestionView}
          />
        </View>
      </View>
    );
  }
}
