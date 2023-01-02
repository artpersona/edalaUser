import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../shared/layouts';
function StepperItem({label, active, completed, subtext}) {
  return (
    <View style={styles.container}>
      <Text
        style={
          active
            ? [styles.label, {backgroundColor: Colors.primary}]
            : styles.label
        }>
        {label}
      </Text>
      <Text style={styles.subtext}>{subtext}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: '5%',
  },
  label: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: RFValue(10.5),
    marginTop: '2%',
    color: Colors.grey,
    opacity: 0.7,
  },
});

export default StepperItem;
