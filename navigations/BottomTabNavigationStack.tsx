import Icon from 'react-native-vector-icons/AntDesign'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Categories from '../screens/Categories';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();
export default function BottomTabNavigationStack() {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Icon
                name="home"
                size={size}
                color={focused ? color : 'gray'}
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Categories'}
        component={Categories}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Icon
                name="appstore1"
                size={size}
                color={focused ? color : 'gray'}
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Search'}
        component={Search}
        options={{
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIcon: ({ focused, color }) => (
            <View className={'justify-center items-center w-20 h-20 bg-blue-500 rounded-full'}>
              <Icon
                name="search1"
                color={focused ? 'white' : 'black'}
                size={36}
              />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Cart'}
        component={Cart}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Icon
                name="shoppingcart"
                size={size}
                color={focused ? color : 'gray'}
              />
            );
          },
          tabBarBadge: 0,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Icon
                name="user"
                size={size}
                color={focused ? color : 'gray'}
              />
            );
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}