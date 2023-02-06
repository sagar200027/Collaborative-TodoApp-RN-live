import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDk2MzNiYWFhYzQ4YzYyOTcxYWI2MiIsImlhdCI6MTY3NTI4MzIwNywiZXhwIjoxNjc3ODc1MjA3fQ.m0u7HYAUxdxl6uyQqYj5hN7MPqYsj-Hwb8TxEY_mwyM"
    // AsyncStorage.setItem("token", token)
    const checkUser = async () => {
      if (await isAuthenticated()) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('SignIn');
      }
    }

    checkUser();
  }, []);

  const isAuthenticated = async () => {
    // await AsyncStorage.removeItem('token');
    const token = await AsyncStorage.getItem('token');
    return !!token;
  }

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator />
    </View>
  )
}

export default SplashScreen
