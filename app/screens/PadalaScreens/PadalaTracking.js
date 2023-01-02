import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CustomHeader, StepperItem} from '../../components';
import {Colors} from '../../shared/layouts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFValue} from 'react-native-responsive-fontsize';
import StepIndicator from 'react-native-step-indicator';
import {deviceHeight} from '../../shared/utils/device.utility';
import {Button} from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';
function PadalaTracking({route, navigation}) {
  const {padala} = route.params;
  let tempData = {...padala};
  tempData.shipmentData = JSON.parse(tempData.shipmentData);
  tempData.recipientData = JSON.parse(tempData.recipientData);

  const [padalaItem, setPadalaItem] = useState(tempData);
  const [currentStep, setCurrentStep] = useState(0);

  const labels = [
    {
      title: 'Order Placed',
      subtitle: `Order placed on ${moment(padalaItem.createdAt).format(
        'MMMM Do YYYY',
      )}`,
    },
    {title: 'Shipment Picked Up', subtitle: 'Parcel picked up by courier'},
    {title: 'In Transit', subtitle: 'Parcel is in transit to destination'},
    {title: 'Delivered', subtitle: 'Parcel received by: John Doe'},
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Colors.primary,
    stepStrokeUnFinishedColor: Colors.lightGrey,
    separatorFinishedColor: Colors.primary,
    separatorUnFinishedColor: Colors.lightGrey,
    stepIndicatorFinishedColor: Colors.primary,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 11,
    currentStepIndicatorLabelFontSize: 11,
    stepIndicatorLabelCurrentColor: Colors.primary,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: Colors.lightGrey,
    labelAlign: 'flex-start',
  };

  useEffect(() => {
    if (padala.id) {
      let watcher = setInterval(() => {
        axios
          .post('http://192.168.1.11:8000/api/fetchPadala', {
            padalaId: padala.id,
          })
          .then(res => {
            let data = res.data.padala;
            data.shipmentData = JSON.parse(data.shipmentData);
            data.recipientData = JSON.parse(data.recipientData);
            setPadalaItem(data);

            updateCurrentStatus(data.status);
          })
          .catch(err => {
            console.log(err.response.data);
          });
      }, 5000);

      return () => {
        clearInterval(watcher);
      };
    }
  }, [padala?.id]);

  const updateCurrentStatus = status => {
    switch (status) {
      case 'for-pickup':
        setCurrentStep(0);
        break;
      case 'picked-up':
        setCurrentStep(1);
        break;
      case 'in-transit':
        setCurrentStep(2);
        break;
      case 'delivered':
        setCurrentStep(4);
        break;
      default:
        setCurrentStep(0);
        break;
    }
  };

  return (
    <>
      <CustomHeader
        title={`Shipment Status: ${padalaItem?.trackingNumber}`}
        showBackButton={true}
      />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.riderDetails}>
            <View style={styles.riderInfo}>
              <Text style={styles.riderName}>John Doe</Text>
              <MaterialCommunityIcons
                name="motorbike"
                size={RFValue(22)}
                color={Colors.primary}
              />
            </View>
            <View style={styles.overview}>
              <View style={styles.overviewRow}>
                <AntDesign
                  name="upcircle"
                  color={Colors.primary}
                  size={RFValue(20)}
                />
                <Text style={styles.address}>
                  {padalaItem?.shipmentData?.addressData?.address}
                </Text>
              </View>

              <View style={styles.overviewRow}>
                <AntDesign
                  name="downcircle"
                  color={Colors.primary}
                  size={RFValue(20)}
                />
                <Text style={styles.address}>
                  {padalaItem?.recipientData?.addressData?.address}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentStep}
              labels={labels}
              direction="vertical"
              stepCount={4}
              renderLabel={({position, stepStatus, label, currentPosition}) => {
                console.log('position is: ', position);
                return (
                  <StepperItem label={label.title} subtext={label.subtitle} />
                );
              }}
            />
          </View>

          <Button
            buttonStyle={styles.button}
            title={'Track Rider'}
            titleStyle={[styles.labelStyle, {color: Colors.white}]}
            containerStyle={{
              width: '100%',
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: RFValue(13),
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: '5%',
    marginTop: '20%',
  },
  statusContainer: {
    backgroundColor: Colors.white,
    minHeight: deviceHeight * 0.4,
    marginTop: '5%',
    backgroundColor: Colors.white,
    padding: '5%',
    borderRadius: RFValue(10),
    elevation: 1,
  },
  overview: {
    marginTop: RFValue(10),
  },
  address: {
    fontSize: RFValue(11),
    marginLeft: '3%',
  },
  overviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '2%',
  },
  riderName: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  riderDetails: {
    marginTop: '5%',
    backgroundColor: Colors.white,
    padding: '5%',
    borderRadius: RFValue(10),
    elevation: 1,
  },
  riderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: '4%',
    borderStyle: 'dashed',
    borderBottomColor: Colors.primary,
  },
  wrapper: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default PadalaTracking;
