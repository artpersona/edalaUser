import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../shared/layouts';
import LottieView from 'lottie-react-native';
import {deviceHeight, deviceWidth} from '../../shared/utils/device.utility';
import {CustomHeader} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {Button} from 'react-native-elements';

function SuccessOutcome({route, navigation}) {
  const {padala} = route.params;
  const navigateToHome = () => {
    navigation.navigate('PadalaTrack', {padala});
  };
  return (
    <>
      <CustomHeader title={`Padala: ${padala.trackingNumber}`} />

      <View style={styles.container}>
        <View style={styles.centeredContent}>
          <View style={styles.imageContainer}>
            <LottieView
              source={require('../../assets/animations/success.json')}
              autoPlay
              loop={false}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.headerTitle}>Order Successfully Placed</Text>
            <Text style={styles.description}>
              A rider will pick up your package and deliver it to the recipient
            </Text>
          </View>

          <Button
            buttonStyle={styles.logoutButton}
            title={'Track Order'}
            titleStyle={[styles.labelStyle, {color: Colors.white}]}
            containerStyle={{
              marginTop: '10%',
            }}
            onPress={navigateToHome}
            // loading={loading}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: RFValue(12),
  },
  logoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: '6%',
  },
  centeredContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  detailsContainer: {
    backgroundColor: Colors.white,
    width: '80%',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '10%',
    borderRadius: RFValue(20),
    borderWidth: 0.3,
    borderColor: Colors.lightGrey,
  },
  description: {
    color: Colors.grey,
    fontSize: RFValue(11),
    marginTop: RFValue(15),
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: RFValue(17),
    fontWeight: 'bold',
    color: Colors.green,
    textAlign: 'center',
  },

  centeredContent: {
    marginTop: deviceHeight * 0.1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  imageContainer: {
    width: deviceWidth * 0.55,
    height: deviceHeight * 0.3,
    alignSelf: 'center',
  },
});

export default SuccessOutcome;
