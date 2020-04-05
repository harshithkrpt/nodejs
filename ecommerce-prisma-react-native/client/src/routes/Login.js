import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import TextField from '../components/TextField';
import {TOKEN_KEY} from '../constants';

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      payload {
        token
      }
      error {
        field
        msg
      }
    }
  }
`;

const Login = (props) => {
  const [values, setValues] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [login, {loading}] = useMutation(LOGIN_MUTATION);

  const handleInputChange = (key, value) => {
    setValues({...values, [key]: value});
  };

  const handleSubmit = async () => {
    const res = await login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });

    const {payload, error} = res.data.login;
    if (payload) {
      AsyncStorage.setItem(TOKEN_KEY, payload.token);
      props.history.push('/products');
    } else {
      setErrors({[error.field]: error.msg});
    }
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{width: 200}}>
        {errors.email && <Text style={{color: 'red'}}>{errors.email}</Text>}
        <TextField
          value={values.email}
          name="email"
          onChangeText={handleInputChange}
        />
        {errors.password && (
          <Text style={{color: 'red'}}>{errors.password}</Text>
        )}
        <TextField
          value={values.password}
          name="password"
          onChangeText={handleInputChange}
          secureTextEntry
        />
        <Button disabled={loading} onPress={handleSubmit} title="Login" />
        <Text style={{textAlign: 'center'}}>Or</Text>
        <Button
          onPress={() => {
            props.history.push('/signup');
          }}
          title="create account"
        />
      </View>
    </View>
  );
};

export default Login;
