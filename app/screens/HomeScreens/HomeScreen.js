import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {HomeAction} from '../../components';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../shared/layouts';
import {RFValue} from 'react-native-responsive-fontsize';
import {deviceHeight} from '../../shared/utils/device.utility';
import {useAuthContext} from '../../shared/contexts/AuthContext';
function HomeScreen({navigation}) {
  const {loggedUser} = useAuthContext();
  const navigateToPadala = () => {
    navigation.navigate('PadalaStack');
  };

  const navigateToTracking = () => {
    navigation.navigate('PadaList');
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.greetingText}>
            Hi {`${loggedUser?.firstName} ${loggedUser?.lastName}`}
          </Text>
          <Text style={styles.timeText}>Good Morning</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.actionHeader}>
          What are you looking for today ?
        </Text>
        <View style={styles.actionsContainer}>
          <HomeAction
            icon={
              <Feather name="package" size={RFValue(36)} color={Colors.white} />
            }
            label="Padala"
            onPress={navigateToPadala}
          />
          <HomeAction
            icon={
              <Entypo
                name="magnifying-glass"
                size={RFValue(35)}
                color={Colors.white}
              />
            }
            label="Track Order"
            onPress={navigateToTracking}
          />
          <HomeAction
            icon={
              <Entypo
                name="shopping-cart"
                size={RFValue(33)}
                color={Colors.white}
              />
            }
            label="Pabili"
            onPress={() => alert('Coming Soon')}
          />
        </View>

        <View style={styles.promoContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionName}>Promo's Today</Text>
            <Text style={styles.viewText}>View all</Text>
          </View>

          <View style={styles.promo}>
            <Image
              source={require('../../assets/images/banner.jpg')}
              style={{width: '100%', height: '100%'}}
              resizeMode="stretch"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderText: {
    color: Colors.white,
    fontSize: RFValue(20),
    textAlign: 'center',
  },
  promo: {
    height: deviceHeight * 0.25,
    backgroundColor: Colors.primary,
    marginTop: '5%',
    elevation: 2,
    alignContent: 'center',
    justifyContent: 'center',
  },
  promoContainer: {
    marginTop: '7%',
  },
  viewText: {
    fontSize: RFValue(12),
    color: Colors.grey,
  },
  sectionName: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: 'black',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '7%',
  },
  actionHeader: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
  },
  bottomContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    marginTop: -RFValue(30),
    padding: RFValue(20),
  },
  timeText: {
    fontSize: RFValue(23),
    color: Colors.white,
    fontWeight: 'bold',
  },
  greetingText: {
    fontSize: RFValue(18),
    marginBottom: '3%',
    color: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  upperContainer: {
    backgroundColor: Colors.primary,
    height: deviceHeight * 0.3,
  },
  detailsContainer: {
    marginTop: '10%',
    marginHorizontal: '5%',
  },
});

export default HomeScreen;
