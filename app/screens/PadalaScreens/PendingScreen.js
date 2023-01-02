import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {CustomHeader, CustomModal, Loading} from '../../components';
import LottieView from 'lottie-react-native';
import {deviceHeight, deviceWidth} from '../../shared/utils/device.utility';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Themes} from '../../shared/layouts';
import {Button} from 'react-native-elements';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {usePadalaContext} from '../../shared/contexts/PadalaContext';
function PendingScreen({route, navigation}) {
  const {padala} = route.params;
  const mapRef = useRef();
  const {cancelPadala} = usePadalaContext();

  const [location, setLocation] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      Geolocation.getCurrentPosition(
        location => {
          setLocation({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          });
        },
        error => alert(error.message),
        Platform.OS === 'android'
          ? {}
          : {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
      );
    })();
  }, []);

  useEffect(() => {
    if (location) {
      jumpBack();
    }
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SuccessOutcome', {padala});
    }, 6000);
  }, []);

  const jumpBack = () => {
    mapRef?.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  const toggleCancelModal = () => {
    setCancelModal(!cancelModal);
  };

  const handleCancel = () => {
    setLoading(true);
    setCancelModal(false);
    cancelPadala(padala)
      .then(() => {
        setLoading(false);
        navigation.navigate('FailureOutcome');
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <CustomHeader
        title={`PADALA: ${padala?.trackingNumber}`}
        showBackButton={true}
      />
      <View style={styles.container}>
        <MapView
          showUserLocation={true}
          ref={mapRef}
          style={{height: deviceHeight * 0.6, width: deviceWidth}}
          mapType="standard"
          initialRegion={{
            latitude: location?.latitude ? location.latitude : 38.8951,
            longitude: location?.longitude ? location.longitude : -77.0364,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onPress={event => {
            setLocation({
              latitude: event.nativeEvent.coordinate.latitude,
              longitude: event.nativeEvent.coordinate.longitude,
            });
          }}
          provider={PROVIDER_GOOGLE}>
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Origin"
              description="Origin"
              identifier="origin"
              draggable={false}>
              <View style={{width: RFValue(70), height: RFValue(70)}}>
                <LottieView
                  source={require('../../assets/animations/searching.json')}
                  autoPlay
                  loop
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                />
              </View>
            </Marker>
          )}
        </MapView>

        <View style={styles.bottomContainer}>
          <Image
            source={require('../../assets/images/mapIcon.png')}
            style={styles.mapIcon}
          />
          <View style={styles.detailsText}>
            <Text style={styles.headerText}>Finding Courier</Text>
            <Text style={styles.labelText}>
              Courier will pick up your package soon.
            </Text>
          </View>

          <Button
            buttonStyle={[
              Themes.buttonPrimary,
              {backgroundColor: Colors.red, width: '100%'},
            ]}
            title={'Cancel'}
            titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
            containerStyle={{
              position: 'absolute',
              bottom: RFValue(40),
              width: '100%',
              alignSelf: 'center',
            }}
            onPress={toggleCancelModal}
            loading={cancelLoading}
          />
        </View>
      </View>

      <CustomModal
        isVisible={cancelModal}
        title="Cancel PADALA"
        showCancelButton={true}
        onCancel={() => setCancelModal(false)}
        onConfirm={handleCancel}
        closeVisible={false}>
        <Text style={styles.confirmText}>
          Are you sure you want to cancel this transaction ?
        </Text>
      </CustomModal>

      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  confirmText: {
    fontSize: RFValue(12),
    textAlign: 'center',
    marginTop: '5%',
    color: Colors.grey,
    opacity: 0.8,
  },
  detailsText: {
    marginVertical: RFValue(15),
  },
  labelText: {
    textAlign: 'center',
    marginTop: RFValue(15),
  },
  headerText: {
    fontSize: RFValue(18),
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  mapIcon: {
    alignSelf: 'center',
    marginTop: RFValue(20),
  },
  bottomContainer: {
    width: '100%',
    height: deviceHeight * 0.5,
    backgroundColor: 'white',
    elevation: 1,
    borderTopRightRadius: RFValue(50),
    borderTopLeftRadius: RFValue(50),
    padding: '5%',
    bottom: 0,
    position: 'absolute',
  },
  animation: {
    width: deviceWidth * 0.6,
    height: deviceWidth * 0.6,
    alignSelf: 'center',
    marginBottom: RFValue(20),
    marginTop: RFValue(10),
  },
  container: {
    flex: 1,
  },
});

export default PendingScreen;
