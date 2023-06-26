import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {useMutation, gql} from '@apollo/client';

const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    signUp(input: {email: $email, password: $password, name: $name}) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  // mutation[0] : A function to trigger the mutation
  // mutation[1] : result object
  //    { data,error, loading }
  const [signUp, {data, error, loading}] = useMutation(SIGN_UP_MUTATION);

  useEffect(() => {
    if (error) {
      Alert.alert('Error signing up. Try again');
      console.log('error', error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      // save token
      AsyncStorage.setItem('token', data.signUp.token).then(() => {
        // redirect home
        navigation.navigate('HomeStack');
      });
    }
  }, [data]);

  const onSubmit = () => {
    console.log(name, email, password);

    signUp({variables: {email, name, password}});
  };

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingVertical: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>Sign Up</Text>
      </View>
      <View style={{padding: 20}}>
        <TextInput
          placeholder="name"
          value={name}
          onChangeText={setName}
          style={{
            color: 'grey',
            fontSize: 18,
            width: '100%',
            marginVertical: 25,
          }}
        />

        <TextInput
          placeholder="vadim@notjust.dev"
          value={email}
          onChangeText={setEmail}
          style={{
            color: 'grey',
            fontSize: 18,
            width: '100%',
            marginVertical: 25,
          }}
        />

        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            color: 'grey',
            fontSize: 18,
            width: '100%',
            marginVertical: 25,
          }}
        />

        <Pressable
          onPress={onSubmit}
          style={{
            backgroundColor: '#e33062',
            height: 50,
            borderRadius: 5,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          {loading && <ActivityIndicator />}
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Sign up
          </Text>
        </Pressable>

        <Pressable
          disabled={loading}
          onPress={() => {
            navigation.navigate('SignIn');
          }}
          style={{
            height: 50,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: '#e33062',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Already Have an account? Sign in
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default SignUpScreen;
