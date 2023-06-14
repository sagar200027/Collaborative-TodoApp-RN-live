import * as React from 'react';
import ProjectsScreen from '../screens/ProjectsScreen';
import ToDoScreen from '../screens/ToDoScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerParamList, HomeStackParamList} from '../../types';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator<HomeStackParamList>();
// const Drawer = createDrawerNavigator<DrawerParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={ProjectsScreen}
      />
      <Stack.Screen
        name="ToDoScreen"
        options={{headerShown: false}}
        component={ToDoScreen}
      />
    </Stack.Navigator>
  );
};

// export const DrawerStack = () => {
//   return (
//     <Drawer.Navigator initialRouteName="ProjectsScreen">
//       <Drawer.Screen
//         name="ProjectsScreen"
//         options={{headerShown: false}}
//         component={ProjectsScreen}
//       />
//     </Drawer.Navigator>
//   );
// };
