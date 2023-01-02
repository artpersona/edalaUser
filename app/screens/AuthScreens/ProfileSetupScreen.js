import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CustomHeader, CustomInput} from '../../components';
import {Colors, Themes} from '../../shared/layouts';
import {deviceHeight} from '../../shared/utils/device.utility';
import {useForm} from 'react-hook-form';
import {EMAIL_REGEX} from '../../shared/utils/helpers.utility';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuthContext} from '../../shared/contexts/AuthContext';

function ProfileSetupScreen({route, navigation}) {
  const {email} = route.params;
  const {registerViaEmail} = useAuthContext();
  // States
  const [icon, setIcon] = useState('eye-off-outline');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  // End States
  //  Library Hooks
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  //  End Library Hooks

  // Functions
  const iconChange = () => {
    setHidePassword(hidePassword => !hidePassword);
    setIcon(icon =>
      icon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline',
    );
  };

  const register = data => {
    setLoading(true);

    registerViaEmail(data)
      .then(() => {
        setLoading(false);
        alert('Succesfully Registered!');
      })
      .catch(err => {
        setLoading(false);
        alert('something went wrong: ', err);
      });
  };

  return (
    <>
      <CustomHeader showBackButton={true} title="Sign up" />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.contentContainer}>
            <View style={styles.detailsContainer}>
              <Text style={styles.signupText}>Create your profile</Text>
            </View>
            <View style={styles.formContainer}>
              <CustomInput
                placeholder="Enter your first name"
                style={styles.placeholder__text}
                inputContainerStyle={
                  errors?.firstName
                    ? [styles.inputContainerStyle, {borderColor: 'red'}]
                    : styles.inputContainerStyle
                }
                containerStyle={styles.containerStyle}
                control={control}
                name="firstName"
                errorMessage={errors.firstName?.message}
                rules={{
                  required: {
                    value: true,
                    message: 'First name is required',
                  },
                }}
                errorStyle={styles.errorStyle}
                leftIcon={<Ionicons name="person" size={26} color="black" />}
              />

              <CustomInput
                placeholder="Enter your last name"
                style={styles.placeholder__text}
                inputContainerStyle={
                  errors?.lastName
                    ? [styles.inputContainerStyle, {borderColor: 'red'}]
                    : styles.inputContainerStyle
                }
                containerStyle={styles.containerStyle}
                control={control}
                name="lastName"
                errorMessage={errors.lastName?.message}
                rules={{
                  required: {
                    value: true,
                    message: 'Last name is required',
                  },
                }}
                errorStyle={styles.errorStyle}
                leftIcon={<Ionicons name="person" size={26} color="black" />}
              />
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
                defaultValue={email}
              />

              <CustomInput
                placeholder="PASSWORD"
                style={styles.placeholder__text}
                inputContainerStyle={
                  errors?.password
                    ? [styles.inputContainerStyle, {borderColor: 'red'}]
                    : styles.inputContainerStyle
                }
                secureTextEntry={hidePassword}
                errorMessage={errors.password?.message}
                control={control}
                name="password"
                rules={{
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                }}
                containerStyle={styles.containerStyle}
                errorStyle={styles.errorStyle}
                leftIcon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={26}
                    color="black"
                  />
                }
                rightIcon={
                  <MaterialCommunityIcons
                    name={icon}
                    size={25}
                    color={'black'}
                    onPress={iconChange}
                  />
                }
              />
            </View>

            <Button
              buttonStyle={[
                Themes.buttonPrimary,
                {backgroundColor: Colors.primary, width: '100%'},
              ]}
              title={'Sign Up'}
              titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
              containerStyle={{marginTop: '5%'}}
              onPress={handleSubmit(register)}
              loading={loading}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  errorStyle: {
    fontSize: RFValue(10),
  },
  half: {
    width: '40%',
    borderBottomWidth: 1,
  },
  divider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: deviceHeight * 0.1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default ProfileSetupScreen;
