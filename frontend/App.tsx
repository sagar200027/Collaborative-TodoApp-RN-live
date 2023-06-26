import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo';
import {MainStack} from './src/navigation/MainStack';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
