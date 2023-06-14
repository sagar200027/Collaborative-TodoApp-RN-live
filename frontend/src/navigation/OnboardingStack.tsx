import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

import {OnboardingStackParamList} from '../../types';
const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingStack = () => {
  return (
    <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: 'Sign In',
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'Sign Up',
        }}
      />
    </Stack.Navigator>
  );
};
