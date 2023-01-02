import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import {Colors, Themes} from '../../shared/layouts';
import {RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';
import {usePadalaContext} from '../../shared/contexts/PadalaContext';
import {useAuthContext} from '../../shared/contexts/AuthContext';
function Checkout({shipperData, receiverData, feeCalculations, onPress}) {
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const {createPadalaOrder} = usePadalaContext();
  const {loggedUser} = useAuthContext();

  console.log('loggeduser is: ', loggedUser);
  // Refactor! Create utility for this
  let weightLegend = {
    10: '1-10kg',
    20: '11-20kg',
    30: '21-30kg',
  };

  let typeLegend = {
    document: 'Document',
    food: 'Food and Beverages',
    other: 'Others',
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    const orderData = {
      shipmentData: shipperData,
      recipientData: receiverData,
      deliveryFee: deliveryFee,
      customerId: loggedUser?.id,
    };

    console.log('order data is: ', orderData);

    createPadalaOrder(orderData)
      .then(data => {
        setLoading(false);
        onPress(data);
      })
      .catch(err => {
        setLoading(false);
        alert('Error In Creating Order');
      });
  };

  useEffect(() => {
    console.log(shipperData?.addressData?.coords?.latitude);
    console.log(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${shipperData?.addressData?.coords?.latitude}, ${shipperData?.addressData?.coords?.longitude}&destinations=${receiverData?.addressData?.coords?.latitude}, ${receiverData?.addressData?.coords?.longitude}&mode=driving&units=imperial&key=AIzaSyC1lqskLrwjsWCxvvAoe3kVpRzX3fvbNjE`,
    );
    if (shipperData && receiverData) {
      (async () => {
        await axios
          .get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${shipperData?.addressData?.coords?.latitude}, ${shipperData?.addressData?.coords?.longitude}&destinations=${receiverData?.addressData?.coords?.latitude}, ${receiverData?.addressData?.coords?.longitude}&mode=driving&units=imperial&key=AIzaSyC1lqskLrwjsWCxvvAoe3kVpRzX3fvbNjE`,
          )
          .then(response => {
            console.log(response.data);
            let distance = response.data.rows[0].elements[0].distance.value;
            let distanceInKm = distance / 1000;
            let fee = distanceInKm * 10;
            setDeliveryFee(fee);
          });
      })();
    }
  }, [shipperData, receiverData]);

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Shipper</Text>
        <View style={styles.sectionDetails}>
          <View style={styles.sectionRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={20} color={Colors.white} />
            </View>
            <Text style={styles.sectionValue}>{shipperData?.name}</Text>
          </View>

          <View style={styles.sectionRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="call" size={20} color={Colors.white} />
            </View>
            <Text style={styles.sectionValue}>{shipperData?.contact_num}</Text>
          </View>

          <View style={styles.sectionRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={20} color={Colors.white} />
            </View>
            <Text style={styles.sectionValue}>
              {shipperData?.addressData?.address || 'No address selected'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Recipient</Text>
        <View style={styles.sectionDetails}>
          <View style={styles.sectionRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={20} color={Colors.white} />
            </View>
            <Text style={styles.sectionValue}>{receiverData?.name}</Text>
          </View>

          <View style={styles.sectionRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="call" size={20} color={Colors.white} />
            </View>
            <Text style={styles.sectionValue}>{receiverData?.contact_num}</Text>
          </View>

          <View style={styles.sectionRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={20} color={Colors.white} />
            </View>
            <Text style={styles.sectionValue}>
              {receiverData?.addressData?.address}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Package Information</Text>
        <View style={styles.sectionDetails}>
          <Text style={styles.weightText}>
            {weightLegend[shipperData?.size]}
          </Text>
          <Text style={styles.typeText}>{typeLegend[shipperData?.type]}</Text>
        </View>
      </View>

      {/* type of deliver here */}

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Package Information</Text>
        <View style={styles.sectionDetails}>
          <View style={styles.row}>
            <Text style={styles.breakdownLabel}>Regular</Text>
            <Text style={styles.breakdownValue}>₱{deliveryFee.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.breakdownLabel}>Shipping Assurance</Text>
            <Text style={styles.breakdownValue}>₱2.00</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.breakdownLabel}>Subtotal</Text>
            <Text
              style={[
                styles.breakdownValue,
                {color: Colors.primary, fontWeight: 'bold'},
              ]}>
              ₱{(deliveryFee + 2).toFixed(2)}
            </Text>
          </View>
        </View>
        <Button
          buttonStyle={[
            Themes.buttonPrimary,
            {backgroundColor: Colors.primary, width: '100%'},
          ]}
          title={'Create Order'}
          titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
          containerStyle={{marginTop: '5%'}}
          onPress={handleCreateOrder}
          disabled={deliveryFee === 0}
          loading={loading}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    color: 'black',
  },
  breakdownLabel: {
    fontWeight: 'bold',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%',
  },
  typeText: {
    marginTop: '2%',
    fontSize: RFValue(12),
    color: 'black',
  },
  weightText: {
    fontSize: RFValue(13),
    fontWeight: 'bold',
    color: 'black',
  },
  section: {
    marginBottom: '5%',
  },
  sectionDetails: {
    backgroundColor: 'white',
    borderRadius: RFValue(10),
    padding: RFValue(10),
    borderWidth: 2,
    borderColor: 'whitesmoke',
    marginTop: '5%',
  },
  sectionValue: {
    marginLeft: RFValue(10),
    width: '70%',
    color: 'black',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '3%',
  },
  iconContainer: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: 1000,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Checkout;
