import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../shared/layouts';
import {deviceWidth} from '../shared/utils/device.utility';
function HomeAction({icon, label, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.whiteContainer} onPress={onPress}>
        <View style={styles.iconContainer}>{icon}</View>
      </TouchableOpacity>

      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 0.27,
  },
  labelText: {
    fontSize: RFValue(14),
    textAlign: 'center',
    marginTop: '10%',
    fontWeight: 'bold',
  },
  whiteContainer: {
    backgroundColor: Colors.white,
    width: deviceWidth * 0.27,
    height: deviceWidth * 0.27,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderRadius: RFValue(10),
  },
  iconContainer: {
    width: deviceWidth * 0.2,
    height: deviceWidth * 0.2,
    backgroundColor: Colors.primary,
    borderRadius: 10000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeAction;
