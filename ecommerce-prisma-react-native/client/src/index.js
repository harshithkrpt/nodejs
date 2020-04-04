import React from 'react';

// Apollo Client
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-client-preset';
import {ApolloProvider} from '@apollo/react-hooks';

import Routes from './routes';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://10.0.2.2:4000/',
  }),
  cache: new InMemoryCache(),
});

export default () => {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};
