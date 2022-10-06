/**
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import Main from './src/comps/Main';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Main />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
