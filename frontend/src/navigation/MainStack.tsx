import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import SplashScreen from '../screens/SplashScreen';

import {MainStackParamList} from '../../types';
import {OnboardingStack} from './OnboardingStack';
import { HomeStack } from './HomeStack';
import ProjectsScreen from '../screens/ProjectsScreen';
const Stack = createStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OnboardingStack"
        component={OnboardingStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
