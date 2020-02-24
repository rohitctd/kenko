import React, {PureComponent} from 'react';
import {View, Dimensions, Text, ScrollView} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MapView from 'react-native-maps';
import FastImage from 'react-native-fast-image';

import styles from './styles';
const {width, height} = Dimensions.get('window');
import {Dimens, Colors, shadowOpt, Fonts} from '../../../../../utils/Theme';

class ActivityDetailScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {data: this.props.navigation.getParam('data', '')};
  }

  state = {
    internetConnected: false,
  };

  renderLabView = () => {
    const {data} = this.state;
    let featureColor =
      data.textType == 'earned'
        ? Colors.activityBackgroundColor
        : Colors.rewardScreenBackground;

    let width =
      data.actionType == 'Completed'
        ? '60%'
        : data.actionType == 'Active'
        ? '40%'
        : 0;

    let buttonActionColor =
      data.actionType == 'Completed'
        ? Colors.rewardScreenBackground
        : data.actionType == 'Active'
        ? Colors.insureBackground
        : '#ed6132';

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.itemContainer}>
          <View style={styles.PlanContainer}>
            <Text style={styles.nameStyle} children={data.title} />
            <Text
              style={[
                styles.actionTypeStyle,
                {
                  backgroundColor:
                    data.actionType != '' ? buttonActionColor : Colors.white,
                  width: width,
                },
              ]}
              children={data.actionType}
            />
          </View>

          <FastImage
            style={styles.planImageConatiner}
            source={require('../../../../../assets/images/k_active.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <Text style={styles.dateStyle} children={data.date} />
        <Text style={styles.detailStyle} children={data.description} />

        <Text
          style={[styles.featureStyle, {color: featureColor}]}
          children={data.feature}
        />

        <View
          style={{
            height: Dimens.ten,
            marginVertical: Dimens.fifteen,
            width: '100%',
            backgroundColor: Colors.orderHeaderTextColor,
          }}
        />

        <Text
          style={styles.labelStyle}
          children={
            data.actionType == 'Completed'
              ? 'Lab Details'
              : 'Your Appointment Details'
          }
        />

        <Text style={styles.referenceStyle} children={'Ref No 21222000'} />

        <Text style={styles.labNameStyle} children={'Dr lal Path'} />

        <Text
          style={styles.addressStyle}
          numberOfLines={5}
          children={
            'Near Courtyard Marriott, Shop No. 121-H,Sushant Arcade, Sushant Lok Phase I, Gurugram, Haryana 1221001'
          }
        />
        <Text style={styles.labNameStyle} children={'Phone'} />
        <Text style={styles.phoneStyle} children={'98031222000'} />

        <Text style={styles.labNameStyle} children={'Date & Time'} />
        <Text
          style={styles.phoneStyle}
          children={'30 July 2019 10:00AM - 11:00PM'}
        />

        <View
          style={{
            height: Dimens.ten,
            marginVertical: Dimens.fifteen,
            width: '100%',
            backgroundColor: Colors.orderHeaderTextColor,
          }}
        />

        <Text
          style={styles.labelStyle}
          children={data.actionType == 'Completed' ? 'Report' : 'Map'}
        />
        {data.actionType == 'Completed' ? (
          <View>
            <Text
              style={styles.reportStyle}
              children={'Your reports is available now'}
            />
            <Text
              style={styles.reportStyle}
              children={'Report publishedon 31th July 2019 at 13:00'}
            />

            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: Dimens.thirty,
                paddingTop: Dimens.ten,
                paddingBottom: Dimens.twenty,
                marginTop: Dimens.ten,
              }}
            >
              <FontAwesome
                name={'file-pdf-o'}
                size={Dimens.twentyFive}
                color={Colors.activityBackgroundColor}
              />
              <Text
                style={{
                  paddingTop: Dimens.five,
                  paddingHorizontal: Dimens.ten,
                  textAlign: 'left',
                  fontSize: Dimens.sixteen,
                  color: Colors.activityBackgroundColor,
                  fontFamily: Fonts.SourceSansProRegular,
                }}
                children={'Download'}
              />
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                height: Dimens.twoHundred,
                marginHorizontal: Dimens.thirty,
                marginVertical: Dimens.ten,
                backgroundColor: Colors.activityBackgroundColor,
              }}
            />
            {/* <MapView
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            /> */}
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: Dimens.thirty,
                paddingVertical: Dimens.ten,
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
        )}
      </View>
    );
  };

  renderActivityDetailView() {
    return (
      <View style={styles.mainHeadingContainer}>
        {/* <BoxShadow
          inset={true}
          side={"top"}
          setting={{
            width: parseInt(width),
            height: parseInt(height),
            color: "#000",
            border: Dimens.fifteen,
            radius: Dimens.twenty,
            opacity: 0.15,
            x: 0,
            y: -Dimens.ten,
            style: {
              marginVertical: Dimens.zero
            }
          }}
        > */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderLabView()}
        </ScrollView>
        {/* </BoxShadow> */}
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
        {this.renderActivityDetailView()}
      </View>
    );
  }
}

export default ActivityDetailScreen;
