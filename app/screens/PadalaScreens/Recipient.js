import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CustomInput, CustomPicker} from '../../components';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-elements';
import {Colors, Themes} from '../../shared/layouts';
import {RFValue} from 'react-native-responsive-fontsize';
import {PHONE_REGEX} from '../../shared/utils/helpers.utility';
import MapSelection from './MapSelection';

function Recipient({onPress}) {
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
        <Text style={styles.label}>Recipient Name</Text>
        <CustomInput
          placeholder="Name"
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
        <Text style={styles.label}>Postal Zip</Text>
        <CustomInput
          placeholder="Zip Code"
          style={styles.placeholder__text}
          inputContainerStyle={
            errors?.zipCode
              ? [styles.inputContainerStyle, {borderColor: 'red'}]
              : styles.inputContainerStyle
          }
          containerStyle={styles.containerStyle}
          control={control}
          name="zipCode"
          errorMessage={errors.zipCode?.message}
          rules={{
            required: {
              value: true,
              message: 'Zip code is required',
            },
          }}
          errorStyle={styles.errorStyle}
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.label}>Phone Number</Text>
        <CustomInput
          placeholder="ex. 09123456789"
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
              message: 'Number is required',
            },
            pattern: {
              message: 'Invalid email format',
            },
          }}
          errorStyle={styles.errorStyle}
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.label}>Notes</Text>
        <CustomInput
          placeholder="Notes goes here..."
          style={[styles.placeholder__text, {textAlignVertical: 'top'}]}
          inputContainerStyle={
            errors?.notes
              ? [styles.inputContainerStyle, {borderColor: 'red'}]
              : styles.inputContainerStyle
          }
          containerStyle={styles.containerStyle}
          control={control}
          name="notes"
          errorMessage={errors.notes?.message}
          rules={{
            required: {
              value: false,
            },
          }}
          errorStyle={styles.errorStyle}
          multiline={true}
          numberOfLines={4}
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

export default Recipient;
