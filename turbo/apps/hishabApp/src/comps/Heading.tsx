import React from 'react';
import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';

const Heading = () => {
  return (
    <View>
      <Text style={styles.text}>Hishab</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: '50%',
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Heading;
