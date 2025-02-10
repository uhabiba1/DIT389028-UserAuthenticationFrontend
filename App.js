import React from 'react';
import { StyleSheet, View } from 'react-native';

import AuthScreen from './screens/AuthScreen.js';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
