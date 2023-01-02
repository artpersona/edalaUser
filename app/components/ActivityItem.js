import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../shared/layouts';
function ActivityItem({
  trackingNumber,
  shipmentData,
  recipientData,
  status,
  onPress,
  created_at,
}) {
  let shipper = JSON.parse(shipmentData);
  let recipient = JSON.parse(recipientData);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View
          style={
            status === 'cancelled'
              ? [styles.statusContainer, {backgroundColor: Colors.red}]
              : status === 'delivered'
              ? [styles.statusContainer, {backgroundColor: Colors.green}]
              : styles.statusContainer
          }>
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <Text style={styles.dateText}>{created_at}</Text>
      </View>
      <View style={styles.overview}>
        <View style={styles.overviewRow}>
          <AntDesign
            name="upcircle"
            color={Colors.primary}
            size={RFValue(20)}
          />
          <Text style={styles.address}>{shipper?.addressData.address}</Text>
        </View>

        <View style={styles.overviewRow}>
          <AntDesign
            name="downcircle"
            color={Colors.primary}
            size={RFValue(20)}
          />
          <Text style={styles.address}>{recipient?.addressData.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  statusText: {
    color: Colors.white,
    textTransform: 'uppercase',
    fontSize: RFValue(8),
  },
  statusContainer: {
    backgroundColor: Colors.primary,
    padding: RFValue(5),
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(5),
  },
  dateText: {
    fontSize: RFValue(11),
    color: Colors.grey,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overview: {
    marginTop: RFValue(10),
  },
  address: {
    fontSize: RFValue(11),
    marginLeft: '3%',
    width: '90%',
  },
  overviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '2%',
  },
  container: {
    marginTop: '5%',
    backgroundColor: Colors.white,
    padding: '5%',
    borderRadius: RFValue(10),
    elevation: 1,
  },
});

export default ActivityItem;
