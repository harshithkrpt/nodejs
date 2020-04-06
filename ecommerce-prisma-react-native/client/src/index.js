import React from 'react';

// Apollo Client
import {ApolloClient, InMemoryCache} from 'apollo-client-preset';
import {ApolloProvider} from '@apollo/react-hooks';
import {createUploadLink} from 'apollo-upload-client';
import {setContext} from 'apollo-link-context';
import AsyncStorage from '@react-native-community/async-storage';

import Routes from './routes';
import {TOKEN_KEY} from './constants';

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(
    createUploadLink({
      uri: 'http://192.168.43.133:4000/',
    }),
  ),
  cache: new InMemoryCache(),
});

export default () => {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};
