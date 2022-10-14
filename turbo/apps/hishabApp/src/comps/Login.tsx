import React from 'react';
import {primaryColor} from '../utils/colors';
import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';

import Heading from './Heading';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    console.log('login');
  };
  return (
    <View style={styles.container}>
      <Heading />
      <Text>Log into your account</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>LOGIN</Text>
      </Pressable>
      <Pressable style={styles.buttonInverted} onPress={handleLogin}>
        <Text style={styles.textGreen}>FORGOT PASSWORD</Text>
      </Pressable>

      <View>
        <Text>
          Don't have an account? Click
          <Pressable>
            <Text>here</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    padding: 10,
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
  },
  button: {
    padding: 10,
    backgroundColor: primaryColor,
  },
  buttonInverted: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: primaryColor,
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  textGreen: {
    fontSize: 20,
    color: primaryColor,
    textAlign: 'center',
  },
});

export default Login;
