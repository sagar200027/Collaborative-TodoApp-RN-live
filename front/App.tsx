import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';

import Navigation from './src/navigation';
import {client} from './apollo';

export default function App() {

  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <Navigation/>
        {/* <StatusBar /> */}
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
