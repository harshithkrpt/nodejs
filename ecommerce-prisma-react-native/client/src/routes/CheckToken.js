import React, {useEffect} from 'react';
import {Text} from 'react-native';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';

import {TOKEN_KEY} from '../constants';

const REFRESH_TOKEN_MUTATION = gql`
  mutation($token: String!) {
    refreshToken(token: $token)
  }
`;

export default (props) => {
  const [refresh] = useMutation(REFRESH_TOKEN_MUTATION);
  useEffect(() => {
    const refreshCall = async () => {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) {
        props.history.push('/signup');
        return;
      }
      let response;
      try {
        response = await refresh({
          variables: {token},
        });
      } catch (err) {
        props.history.push('/signup');
        return;
      }

      await AsyncStorage.setItem(TOKEN_KEY, response.data.refreshToken);
      props.history.push('/products');
    };
    refreshCall();
  }, []);
  return <Text>Loading...</Text>;
};
