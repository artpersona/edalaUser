import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {LocationPicker} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../shared/layouts';
function MapSelection({onLocationSelect, addressData}) {
  const [isVisible, setIsVisible] = useState(false);
  const onPress = data => {
    setIsVisible(false);
    onLocationSelect(data);
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.mapPicker}
        onPress={() => setIsVisible(true)}>
        <Text style={styles.locationText}>
          {addressData?.address ? addressData?.address : 'Select Location'}
        </Text>
      </TouchableOpacity>

      <LocationPicker
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onLocationSelect={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  locationText: {
    color: 'black',
    fontSize: RFValue(13),
    marginLeft: '3%',
  },
  mapPicker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.input,
    paddingVertical: 0,
    borderRadius: RFValue(10),
    marginBottom: RFValue(15),
    justifyContent: 'center',
  },
});
export default MapSelection;
