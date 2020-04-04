import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  field: {
    borderBottomWidth: 1,
    fontSize: 20,
    marginBottom: 15,
  },
});

const TextField = ({value, onChangeText, name, secureTextEntry}) => {
  return (
    <TextInput
      onChangeText={(text) => {
        onChangeText(name, text);
      }}
      value={value}
      style={styles.field}
      placeholder={name}
      autoCapitalize="none"
      secureTextEntry={!!secureTextEntry}
    />
  );
};

export default TextField;
