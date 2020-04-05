import React, {useState} from 'react';
import {Text, View, Button, Image, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import AsyncStorage from '@react-native-community/async-storage';r
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {ReactNativeFile} from 'apollo-upload-client';

import TextField from '../components/TextField';

const NEW_PRODUCT_MUTATION = gql`
  mutation($name: String!, $price: Float!, $picture: Upload!) {
    createProduct(name: $name, price: $price, picture: $picture) {
      id
    }
  }
`;

const options = {
  title: 'Pick An Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const styles = StyleSheet.create({
  pictureUrl: {
    width: 200,
    height: 200,
  },
});

const NewProduct = (props) => {
  const [values, setValues] = useState({name: '', pictureUrl: null, price: ''});
  const [errors, setErrors] = useState({});
  const [newproduct, {loading}] = useMutation(NEW_PRODUCT_MUTATION);

  const handleInputChange = (key, value) => {
    setValues({...values, [key]: value});
  };

  const handleImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User Cancelled image Picker');
        return;
      } else if (response.error) {
        console.log(response.error);
      } else if (response.customButton) {
        console.log(response.customButton);
      } else {
        console.log(response.uri);
        setValues({...values, pictureUrl: response.uri});
      }
    });
  };

  const handleSubmit = async () => {
    const {name, pictureUrl, price} = values;

    const picture = [
      new ReactNativeFile({
        uri: pictureUrl,
        type: 'image/png',
        name: 'i-am-a-name',
      }),
    ];
    console.log(picture);
    let response;
    try {
      response = await newproduct({
        variables: {
          name,
          price,
          picture,
        },
      });
      console.log(response);
    } catch (e) {
      console.log('Mutaiton:');
      console.log(e);
    }
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
        <TextField
          value={values.price}
          name="price"
          onChangeText={handleInputChange}
        />
        <Button
          title={values.pictureUrl ? 'Change Image' : 'Pick an Image'}
          onPress={handleImagePicker}
        />
        <View style={{marginTop: 10, marginBottom: 10}}>
          {values.pictureUrl ? (
            <Image
              source={{uri: values.pictureUrl}}
              style={styles.pictureUrl}
            />
          ) : null}
        </View>
        <Button disabled={loading} onPress={handleSubmit} title="Add Product" />
      </View>
    </View>
  );
};

export default NewProduct;
