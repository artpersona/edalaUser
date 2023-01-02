import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CustomInput, CustomPicker} from '../../components';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-elements';
import {Colors, Themes} from '../../shared/layouts';
import {RFValue} from 'react-native-responsive-fontsize';
import {PHONE_REGEX} from '../../shared/utils/helpers.utility';
import MapSelection from './MapSelection';
import {useAuthContext} from '../../shared/contexts/AuthContext';
function Shipment({onPress}) {
  const {loggedUser} = useAuthContext();
  const [addressData, setAddressData] = useState(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    if (addressData) {
      onPress({...data, addressData});
    } else {
      alert('Please select address');
    }
  };

  const onLocationSelect = data => {
    setAddressData(data);
  };

  return (
    <>
      <View style={styles.formRow}>
        <Text style={styles.label}>Sender Name</Text>
        <CustomInput
          placeholder="Shipper Name"
          style={styles.placeholder__text}
          inputContainerStyle={
            errors?.name
              ? [styles.inputContainerStyle, {borderColor: 'red'}]
              : styles.inputContainerStyle
          }
          containerStyle={styles.containerStyle}
          control={control}
          name="name"
          errorMessage={errors.name?.message}
          rules={{
            required: {
              value: true,
              message: 'Name is required',
            },
          }}
          errorStyle={styles.errorStyle}
          defaultValue={`${loggedUser?.firstName} ${loggedUser?.lastName}`}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Address</Text>
        <MapSelection
          onLocationSelect={onLocationSelect}
          addressData={addressData}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Shipper Phone Number</Text>
        <CustomInput
          placeholder="ex. 09123123123"
          style={styles.placeholder__text}
          inputContainerStyle={
            errors?.contact_num
              ? [styles.inputContainerStyle, {borderColor: 'red'}]
              : styles.inputContainerStyle
          }
          containerStyle={styles.containerStyle}
          control={control}
          name="contact_num"
          errorMessage={errors.contact_num?.message}
          rules={{
            required: {
              value: true,
              message: 'Contact Number is required',
            },
            pattern: {
              value: PHONE_REGEX,
              message: 'Invalid phone format',
            },
          }}
          errorStyle={styles.errorStyle}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Item Type</Text>

        <CustomPicker
          control={control}
          name="type"
          rules={{
            required: {
              value: true,
              message: 'Type is required',
            },
          }}
          errorStyle={styles.errorStyle}
          items={[
            {label: 'Select Type', value: null},
            {label: 'Document', value: 'document'},
            {label: 'Food and Beverages', value: 'food'},
            {label: 'Others', value: 'other'},
          ]}
          style={styles.pickerStyle}
          error={errors?.type}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Package Size</Text>

        <CustomPicker
          control={control}
          name="size"
          errorMessage={errors?.message?.type}
          rules={{
            required: {
              value: true,
              message: 'Size is required',
            },
          }}
          errorStyle={styles.errorStyle}
          items={[
            {label: 'Select Size', value: null},
            {label: '1-10kg', value: '10'},
            {label: '11-20kg', value: '20'},
            {label: '21-30kg', value: '30'},
          ]}
          style={styles.pickerStyle}
          error={errors?.size}
        />
      </View>

      <Button
        buttonStyle={[
          Themes.buttonPrimary,
          {backgroundColor: Colors.primary, width: '100%'},
        ]}
        title={'Continue'}
        titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
        containerStyle={{marginTop: '5%'}}
        onPress={handleSubmit(onSubmit)}
        // loading={loading}
      />
    </>
  );
}

const styles = StyleSheet.create({
  pickerStyle: {
    backgroundColor: Colors.input,
    paddingVertical: 0,
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
    fontSize: RFValue(11),
    color: 'black',
    borderWidth: 1,
    borderColor: Colors.lightGrey,
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
    paddingVertical: 0,
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  placeholder__text: {
    color: 'black',
    fontSize: RFValue(12),
  },
});

export default Shipment;
