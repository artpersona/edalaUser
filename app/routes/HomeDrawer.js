import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen, MapScreen} from '../screens';
import {CustomDrawer, CustomHeader} from '../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAuthContext} from '../shared/contexts/AuthContext';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../shared/layouts';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  //   const {loggedUser} = useAuthContext();

  const [isConnected, setIsConnected] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  //   For Internet Connectivity Checking
  //   useEffect(() => {
  //     const unsubscribe = NetInfo.addEventListener(state => {
  //       setLoading(state.isConnected);
  //       setIsConnected(state.isConnected);
  //       setIsModalVisible(!state.isConnected);
  //     });

  //     // Unsubscribe
  //     return () => unsubscribe();
  //   }, []);
  return (
    <>
      <CustomHeader theme="primary" showNotif={true} />
      <Drawer.Navigator
        options={{
          unmountInactiveRoutes: true,
        }}
        useLegacyImplementation={true}
        drawerPosition={'left'}
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          animationEnabled: true,
          headerShown: false,
          // header: props => <CustomHeader />,
          swipeEnabled: false,
        }}
        detachInactiveScreens={true}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerLabel: 'Home',
            drawerIcon: ({}) => (
              <MaterialCommunityIcons
                name="home-outline"
                size={26}
                color={Colors.primary}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}
// const styles = StyleSheet.create({
//   modalHeader: {
//     fontSize: RFValue(17),
//     fontFamily: 'Poppins-SemiBold',
//     color: Colors.red,
//     textAlign: 'center',
//   },
//   subText: {
//     color: Colors.grey,
//     fontSize: RFValue(11),
//     marginTop: '3%',
//     fontFamily: 'Poppins-Regular',
//     textAlign: 'center',
//   },
// });
export default MyDrawer;
