import React from 'react';
import {Text, View, Button} from 'react-native';

export default ({history}) => {
  return (
    <View>
      <Text style={{marginTop: 50}}>Products Page</Text>
      <Button
        title="Create Product"
        onPress={() => history.push('/new-product')}
      />
    </View>
  );
};
