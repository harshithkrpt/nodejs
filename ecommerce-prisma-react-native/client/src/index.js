import React from 'react';

// Apollo Client
import {ApolloClient, InMemoryCache} from 'apollo-client-preset';
import {ApolloProvider} from '@apollo/react-hooks';
import {createUploadLink} from 'apollo-upload-client';

import Routes from './routes';

const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://192.168.43.133:4000/',
    // uri: 'http://192.168.0.1:4000',
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
