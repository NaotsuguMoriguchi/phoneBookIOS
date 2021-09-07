
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { StyleSheet,  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message"

import AppView from './src/modules/AppViewContainer';


export default function App()
{
  // 

  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <AppView />
      </NavigationContainer>
      <FlashMessage position="center" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
