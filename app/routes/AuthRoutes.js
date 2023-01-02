import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoginScreen,
  RegisterScreen,
  SelectionScreen,
  ProfileSetupScreen,
} from '../screens';
const Stack = createStackNavigator();

function AuthRoutes() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Stack.Navigator
        initialRouteName="Selection"
        defaultScreenOptions={'Selection'}
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}>
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      </Stack.Navigator>
    </View>
  );
}

export default AuthRoutes;
