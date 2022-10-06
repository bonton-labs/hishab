import React from 'react';
import SmsAndroid from 'react-native-get-sms-android';
import {StyleSheet, Text, View, Button} from 'react-native';

import {useStore} from '../state/store';

interface smsList {
  id: string;
  body: string;
  date: string;
  read: number;
  address: string;
  date_sent: string;
  service_center: string;
}

const RenderSMS = () => {
  const {sms, setSMS} = useStore((state: any) => state.sms());

  const formatDate = (date: string) => {
    const d = new Date(parseInt(date, 10));
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const listSMS = () => {
    const filter = {
      box: 'inbox',
      indexFrom: 0,
      maxCount: 100,
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail: string) => {
        console.log(`Failed with this error: ${fail}`);
      },
      (count: number, smsList: string) => {
        const parsedSMS: smsList[] = JSON.parse(smsList);

        const formattedSMS = parsedSMS
          .filter(
            (smsFilter: smsList) =>
              smsFilter.address === 'EBL' || smsFilter.address === 'bKash',
          )
          .map(newSms => ({
            ...newSms,
            date: formatDate(newSms.date),
          }));

        setSMS(formattedSMS);
      },
    );
  };

  return (
    <View>
      {sms.length > 0 ? (
        sms.map(
          (
            item: {body: string; address: string; date: string},
            index: number,
          ) => {
            return (
              <View key={index} style={styles.messegeContainer}>
                <Text style={styles.boldText}>
                  SMS {index} : {item.address}
                </Text>
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

export default RenderSMS;
