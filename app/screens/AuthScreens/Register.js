import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CustomHeader, CustomInput} from '../../components';
import {Colors, Themes} from '../../shared/layouts';
import {deviceHeight} from '../../shared/utils/device.utility';
import {useForm} from 'react-hook-form';
import {EMAIL_REGEX} from '../../shared/utils/helpers.utility';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
function Register({navigation}) {
  //  Library Hooks
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  //  End Library Hooks

  // Functions

  const navigateToProfiling = data => {
    navigation.navigate('ProfileSetup', {email: data.email});
  };
  return (
    <>
      <CustomHeader showBackButton={true} title="Sign up" />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.contentContainer}>
            <View style={styles.detailsContainer}>
              <Text style={styles.signupText}>Sign up with</Text>
              <Text style={styles.subText}>email and phone number</Text>
            </View>
            <View style={styles.formContainer}>
              <CustomInput
                placeholder="E-MAIL"
                style={styles.placeholder__text}
                inputContainerStyle={
                  errors?.email
                    ? [styles.inputContainerStyle, {borderColor: 'red'}]
                    : styles.inputContainerStyle
                }
                containerStyle={styles.containerStyle}
                control={control}
                name="email"
                errorMessage={errors.email?.message}
                rules={{
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                  pattern: {
                    value: EMAIL_REGEX,
                    message: 'Invalid email format',
                  },
                }}
                errorStyle={styles.errorStyle}
                leftIcon={
                  <Ionicons name="mail-outline" size={26} color="black" />
                }
              />

              <View style={styles.divider}>
                <View style={styles.half} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.half} />
              </View>
              <CustomInput
                placeholder="Phone number"
                style={styles.placeholder__text}
                inputContainerStyle={
                  errors?.password
                    ? [styles.inputContainerStyle, {borderColor: 'red'}]
                    : styles.inputContainerStyle
                }
                errorMessage={errors.password?.message}
                control={control}
                name="password"
                rules={{
                  required: {
                    value: false,
                    message: 'Password is required',
                  },
                }}
                containerStyle={styles.containerStyle}
                errorStyle={styles.errorStyle}
                leftIcon={<FontAwesome name="phone" size={26} color="black" />}
              />
            </View>

            <Button
              buttonStyle={[
                Themes.buttonPrimary,
                {backgroundColor: Colors.primary, width: '100%'},
              ]}
              title={'Register'}
              titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
              containerStyle={{marginTop: '5%'}}
              onPress={handleSubmit(navigateToProfiling)}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  half: {
    width: '40%',
    borderBottomWidth: 1,
  },
  divider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '7%',
  },
  detailsContainer: {
    marginTop: '2%',
    marginBottom: '7%',
    alignItems: 'center',
  },
  formUtils: {
    marginBottom: '2%',
  },
  forgotText: {
    alignSelf: 'flex-end',
  },
  placeholder__text: {
    color: 'black',
    fontSize: RFValue(12),
  },
  subText: {
    fontSize: RFValue(16),
    color: Colors.grey,
    marginTop: '2%',
  },
  signupText: {
    fontSize: RFValue(20),
    color: Colors.primary,
    fontWeight: 'bold',
  },
  containerStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 0,
  },
  inputContainerStyle: {
    backgroundColor: Colors.background,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    paddingVertical: 0,
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
  },

  contentContainer: {
    backgroundColor: Colors.white,
    padding: '5%',
    paddingVertical: '10%',
    elevation: 2,
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: deviceHeight * 0.13,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default Register;
