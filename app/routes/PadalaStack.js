import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PadalaScreen, PendingScreen, MapScreen} from '../screens';
const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="PadalaScreen">
      <Stack.Screen name="PadalaScreen" component={PadalaScreen} />
      <Stack.Screen name="PendingScreen" component={PendingScreen} />
    </Stack.Navigator>
  );
}

export default React.memo(MainNavigation);
