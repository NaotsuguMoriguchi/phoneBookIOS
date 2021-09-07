import * as React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import materialTheme from '../../constants/Theme';
import CallLogScreen from '../pages/Calllogs';
import ContactScreen from '../pages/Contact';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const Tab = createBottomTabNavigator();

const BottomNavigationBar = ({ navigation }) =>
{
  return (
    <Tab.Navigator
      screenOptions={{
        style: { height: Platform.OS === 'ios' ? 90 : 50 },
        showIcon: true,
        tabBarInactiveTintColor: 'white',
        tabBarItemStyle: {
          backgroundColor: materialTheme.COLORS.PRIMARY,
        },
        tabBarStyle: [
          {
            "display": "flex"
          },
          null
        ]
      }}
    >
      <Tab.Screen
        name="CallLog"
        component={CallLogScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcon name='access-time' style={{ color: focused ? materialTheme.COLORS.ACTIVE : 'white' }} family="Galio" size={20} />
          ),
          tabBarLabel: ({ focused }) => <Text style={{ fontSize: 15, color: focused ? materialTheme.COLORS.ACTIVE : 'white' }}>Call Logs</Text>
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcon name='contacts' style={{ color: focused ? materialTheme.COLORS.ACTIVE : 'white' }} family="Galio" size={20} />
          ),
          tabBarLabel: ({ focused }) => <Text style={{ fontSize: 15, color: focused ? materialTheme.COLORS.ACTIVE : 'white' }}>Contacts</Text>
        }}
        name="Contact"
        component={ContactScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigationBar;