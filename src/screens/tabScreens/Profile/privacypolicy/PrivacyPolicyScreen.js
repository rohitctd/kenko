import React, {PureComponent} from 'react';
import {View, Dimensions, Text, TouchableOpacity} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import FeatherIcon from 'react-native-vector-icons/Feather';

import styles from './styles';
import {Dimens, Colors, shadowOpt} from '../../../../utils/Theme';
import {ScrollView} from 'react-native-gesture-handler';

class PrivacyPolicyScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    internetConnected: false,
  };

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

        <View style={styles.mainHeadingContainer}>
          <BoxShadow inset={true} side={'top'} setting={shadowOpt}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.showSelectedView('orders');
              }}
              style={[styles.headingContainer]}
            >
              <Text
                style={styles.headerTextStyle}
                children={'Privacy Policy'}
              />
            </TouchableOpacity>
          </BoxShadow>

          <ScrollView>
            <View style={styles.orderContainer}>
              <Text
                style={[
                  styles.privacyPolicyTextStyle,
                  {marginTop: Dimens.zero},
                ]}
                numberOfLines={4}
                children={
                  'This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.'
                }
              />
              <Text
                style={styles.privacyPolicyTextStyle}
                numberOfLines={0}
                children={
                  'If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.  The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Kenko unless otherwise defined in this Privacy Policy.Information Collection and Use For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.gree to the'+
                   'collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy. The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Kenko unless otherwise defined in this Privacy Policy.Information Collection and Use For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.gree to the collection and use of information in relation to this policy'
                   +'The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy. The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Kenko unless otherwise defined in this Privacy Policy.Information Collection and Use For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.'
                }
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default PrivacyPolicyScreen;
