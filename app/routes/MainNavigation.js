import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthRoutes from './AuthRoutes';
import HomeDrawer from './HomeDrawer';
import PadalaStack from './PadalaStack';
import {useAuthContext} from '../shared/contexts/AuthContext';
import {
  SuccessOutcome,
  FailureOutcome,
  PadalaTracking,
  PadaList,
} from '../screens';
const Stack = createStackNavigator();

function MainNavigation() {
  const {loggedUser, initialized} = useAuthContext();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={loggedUser ? 'HomeDrawer' : 'Auth'}>
      {loggedUser ? (
        <>
          <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
          <Stack.Screen name="PadalaStack" component={PadalaStack} />
          <Stack.Screen name="PadalaTrack" component={PadalaTracking} />
          <Stack.Screen name="PadaList" component={PadaList} />
          <Stack.Screen name="SuccessOutcome" component={SuccessOutcome} />
          <Stack.Screen name="FailureOutcome" component={FailureOutcome} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthRoutes} />
      )}
    </Stack.Navigator>
  );
}

export default React.memo(MainNavigation);
