import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomHeader, CustomInput, CustomPicker} from '../../components';
import {Colors, Themes} from '../../shared/layouts';
import {deviceHeight} from '../../shared/utils/device.utility';
import {
  indicatorStyle,
  indicatorLabel,
} from '../../shared/utils/pabili.utility';
import StepIndicator from 'react-native-step-indicator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PagerView from 'react-native-pager-view';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Shipment from './Shipment';
import Recipient from './Recipient';
import Checkout from './Checkout';

function PadalaScreen({navigation}) {
  // Lirary hook
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  // Ref
  const pagerRef = useRef(null);
  // States
  const [currentStep, setCurrentStep] = useState(0);
  const [shipmentData, setShipmentData] = useState(null);
  const [recieverData, setRecieverData] = useState(null);

  const handlePageScroll = ({nativeEvent}) => {
    setCurrentStep(nativeEvent.position);
  };

  const handleShipmentPress = data => {
    setShipmentData(data);
    setCurrentStep(1);
    pagerRef.current.setPage(1);
  };

  const handleRecieverPress = data => {
    setRecieverData(data);
    setCurrentStep(2);
    pagerRef.current.setPage(2);
  };

  const handleCheckoutPress = data => {
    navigation.navigate('PendingScreen', {padala: data});
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={'Create Order'} showBackButton={true} />
      <View style={styles.innerContainer}>
        <View style={{marginHorizontal: RFValue(-26)}}>
          <StepIndicator
            customStyles={indicatorStyle}
            currentPosition={currentStep}
            labels={indicatorLabel}
            stepCount={3}
            renderStepIndicator={({position, stepStatus}) => {
              console.log('position', position);
              console.log('stepstatus', stepStatus);
              return (
                <AntDesign
                  name={
                    stepStatus === 'finished' ? 'checkcircleo' : 'infocirlceo'
                  }
                  size={RFValue(13)}
                  color={stepStatus === 'finished' ? Colors.white : 'white'}
                />
              );
            }}
          />
        </View>

        <PagerView
          style={styles.pagerView}
          onPageSelected={handlePageScroll}
          ref={pagerRef}
          scrollEnabled={false}>
          <ScrollView
            key="1"
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <Shipment onPress={handleShipmentPress} />
          </ScrollView>
          <ScrollView
            key="2"
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <Recipient onPress={handleRecieverPress} />
          </ScrollView>
          <ScrollView
            key="3"
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <Checkout
              shipperData={shipmentData}
              receiverData={recieverData}
              onPress={handleCheckoutPress}
            />
          </ScrollView>
        </PagerView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  pickerStyle: {
    backgroundColor: Colors.input,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 0,
    paddingVertical: 0,
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
    fontSize: RFValue(13),
    color: 'black',
  },
  label: {
    fontSize: RFValue(13),
    marginBottom: '3%',
    color: 'black',
  },
  containerStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 0,
  },
  inputContainerStyle: {
    backgroundColor: Colors.input,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 0,
    paddingVertical: 0,
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
  },
  placeholder__text: {
    color: Colors.primary,
    fontSize: RFValue(12),
  },
  pagerView: {
    flex: 1,
    marginTop: '5%',
  },
  innerContainer: {
    width: '90%',
    height: '100%',
    backgroundColor: Colors.white,
    elevation: 1,
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: RFValue(10),
    padding: RFValue(20),
  },
  container: {
    color: Colors.background,
    height: deviceHeight * 0.85,
  },
});

export default PadalaScreen;
