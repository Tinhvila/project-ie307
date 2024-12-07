import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Profile';
import Order from '../screens/Order';
import EditProfile from '../screens/EditProfile';

const Stack = createNativeStackNavigator();
export default function ProfileStackNavigation() {
  return (
    <Stack.Navigator initialRouteName='Profile'>
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
      <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}