import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SearchStackNavigationParamList } from '../types/navigation';
import Search from '../screens/Search';
import ItemsListScreen from '../screens/ItemsListScreen';

const Stack = createNativeStackNavigator<SearchStackNavigationParamList>();
export default function SearchStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Search'} component={Search} options={{ headerShown: false }} />
      <Stack.Screen name={'ItemsListScreen'} component={ItemsListScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}