import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Login from '../comps/Login';

const Auth = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Auth;
