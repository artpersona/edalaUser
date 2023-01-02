import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, Themes} from '../../shared/layouts';
import {deviceWidth, deviceHeight} from '../../shared/utils/device.utility';
import {RFValue} from 'react-native-responsive-fontsize';
import {Button} from 'react-native-elements';
function SelectionScreen({navigation}) {
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/motorcycle.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.wrapper}>
          <View style={styles.detailsContainer}>
            <Text style={styles.welcomeText}>Welcome to eDALA</Text>
            <Text style={styles.subText}>
              Deliver your package around the world without hesitation
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={[
                Themes.buttonPrimary,
                {
                  marginTop: '2%',
                  backgroundColor: Colors.primary,
                },
              ]}
              title={'Login'}
              titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
              onPress={navigateToLogin}
            />

            <Button
              buttonStyle={[
                Themes.buttonPrimary,
                {backgroundColor: Colors.muted, width: '100%'},
              ]}
              title={'Register'}
              titleStyle={[Themes.buttonTextPrimary, {color: Colors.primary}]}
              onPress={navigateToRegister}
              containerStyle={{marginTop: '5%'}}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  subText: {
    color: Colors.grey,
    textAlign: 'center',
    fontSize: RFValue(13),
  },
  welcomeText: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    marginBottom: '3%',
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: Colors.primary,
  },
  image: {
    width: deviceWidth * 1,
    height: deviceHeight * 0.5,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: '15%',
    width: '90%',
  },
});

export default SelectionScreen;
