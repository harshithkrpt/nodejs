import React, {useState} from 'react';
import {AsyncStorage, Text, View, StyleSheet, Button} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import TextField from '../components/TextField';

const SIGNUP_MUTATION = gql`
  mutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const Signup = (props) => {
  const [values, setValues] = useState({email: '', password: '', name: ''});
  const [errors, setErrors] = useState({});
  const [signup, {loading}] = useMutation(SIGNUP_MUTATION);

  const handleInputChange = (key, value) => {
    setValues({...values, [key]: value});
  };

  const handleSubmit = async () => {
    let res;
    try {
      res = await signup({
        variables: {
          email: values.email,
          password: values.password,
          name: values.name,
        },
      });
      console.log(res);
    } catch (err) {
      setErrors({
        email: 'Already Taken',
      });
      return;
    }
    AsyncStorage.setItem('@ecommerce/tokem', res.data.signup.token);
    props.history.push('/products');
  };

  if (loading) return <Text>Loading</Text>;

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{width: 200}}>
        <TextField
          value={values.name}
          name="name"
          onChangeText={handleInputChange}
        />
        {errors.email && <Text style={{color: 'red'}}>{errors.email}</Text>}
        <TextField
          value={values.email}
          name="email"
          onChangeText={handleInputChange}
        />

        <TextField
          value={values.password}
          name="password"
          onChangeText={handleInputChange}
        />
        <Button
          disabled={loading}
          onPress={handleSubmit}
          title="Create Account"
        />
        <Text style={{textAlign: 'center'}}>Or</Text>
        <Button
          onPress={() => {
            props.history.push('/');
          }}
          title="go to login"
        />
      </View>
    </View>
  );
};

export default Signup;
