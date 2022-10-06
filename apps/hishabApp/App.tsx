/**
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import SmsAndroid from 'react-native-get-sms-android';

interface smsList {}

const App = () => {
  const [sms, setSms] = useState([]);

  const listSMS = () => {
    const filter = {
      box: 'inbox',
      indexFrom: 0,
      maxCount: 10,
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail: string) => {
        console.log('Failed with this error: ' + fail);
      },
      (count: any, smsList: any) => {
        const parsedSMS = JSON.parse(smsList);
        setSms(parsedSMS);
      },
    );

    console.log('SMS: ', sms);
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          {sms.length > 0 ? (
            sms.map(
              (
                item: {body: string; address: string; date: string},
                index: number,
              ) => {
                return (
                  <View key={index} style={styles.messegeContainer}>
                    <Text style={styles.boldText}>SMS {index}</Text>
                    <Text>{item.body}</Text>
                    <Text>{item.address}</Text>
                    <Text>{item.date}</Text>
                  </View>
                );
              },
            )
          ) : (
            <Text>No SMS</Text>
          )}
          <Button title="Request SMS Permission" onPress={listSMS} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  messegeContainer: {
    backgroundColor: 'bisque',
    margin: 10,
    padding: 10,
  },
});

export default App;
