import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from '../Onboarding/Onboarding';
import BottomNavigationBar from '../components/BottomNavigationBar';
import EditInfo from '../pages/EditInfo';
import EditComment from '../pages/EditComment';

const Stack = createStackNavigator();


export default function App()
{

  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        presentation: "card"
      }}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        option={{
          headerTransparent: true,
          headerShown: false
        }}
      />
      <Stack.Screen name="App" component={BottomNavigationBar}  option={{
          headerTransparent: true,
          headerShown: false
        }}/>
      <Stack.Screen name="EditInfo" component={EditInfo} />
      <Stack.Screen name="EditComment" component={EditComment} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 10,
    color: '#fff'
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  userName: {
    color: '#fff',
    fontSize: 18
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10
  },
});
