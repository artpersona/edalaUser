import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  deviceWidth,
  deviceHeight,
  isTablet,
} from '../../shared/utils/device.utility';
import {Colors} from '../../shared/layouts';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
function MapScreen() {
  const mapRef = useRef();
  const googlePlacesRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    (async () => {
      Geolocation.getCurrentPosition(
        location => {
          setInitialLocation({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          });
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

  const jumpBack = () => {
    mapRef?.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  const jumpToInitial = () => {
    setLocation(initialLocation);
  };

  if (!location) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          renderRightButton={() => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: 10,
              }}
              onPress={() => googlePlacesRef.current.clear()}>
              <Ionicons name="close-circle" size={24} color={Colors.red} />
            </TouchableOpacity>
          )}
          styles={{
            container: {
              flex: 0,
              borderBottomColor: 'red',
              borderBottomWidth: 1,
            },
            textInput: {
              fontSize: 14,
            },
          }}
          onPress={(data, details = null) => {
            setLocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          placeholder="Select Location?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          returnKeyType={'search'}
          query={{
            key: 'AIzaSyC1lqskLrwjsWCxvvAoe3kVpRzX3fvbNjE',
            language: 'en',
            radius: 30000,
            location: `${location.latitude}, ${location.longitude}`,
          }}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
        />

        <MapView
          showUserLocation={true}
          ref={mapRef}
          style={{height: deviceHeight, width: deviceWidth}}
          mapType="standard"
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
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
              draggable={true}
              onDragStart={e =>
                console.log('drag start', e.nativeEvent.coordinate)
              }
              onDragEnd={e => {
                console.log('drag end', e.nativeEvent.coordinate);
                setLocation({
                  longitude: e.nativeEvent.coordinate.longitude,
                  latitude: e.nativeEvent.coordinate.latitude,
                });
              }}>
              <View style={{width: 50, height: 50}}>
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

        <View
          style={{
            position: 'absolute',
            bottom: 120,
            right: 20,
            // width: "100%",
          }}>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              borderRadius: 60 / 2,
              backgroundColor: Colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={jumpToInitial}
            activeOpacity={0.4}>
            <MaterialIcons name="my-location" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: Colors.white,
            padding: 20,
          }}>
          <TouchableOpacity
            style={
              location !== null
                ? styles.next__button
                : [styles.next__button, {backgroundColor: '#DADADA'}]
            }
            // onPress={navigateToShop}
            disabled={location === null}>
            <Text style={styles.next__text}>Calibrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // eslint-disable-next-line react-native/no-color-literals
  next__button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: isTablet ? 20 : 35,
    elevation: 2,
    justifyContent: 'center',
    padding: isTablet ? 20 : 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: '100%',
  },
  next__text: {
    color: Colors.white,
    fontSize: RFValue(15),
  },
});

export default MapScreen;
