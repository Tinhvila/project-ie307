import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Categories from '../screens/Categories';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomTabNavigationStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<BottomTabNavigationStackParamList>();

export default function BottomTabNavigationStack() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: t('main.home'),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="home" size={size} color={focused ? color : 'gray'} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarLabel: t('main.categories'),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="appstore1"
              size={size}
              color={focused ? color : 'gray'}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIcon: ({ focused, color }) => (
            <View className="justify-center items-center w-20 h-20 bg-blue-500 rounded-full">
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
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: t('main.cart'),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="shoppingcart"
              size={size}
              color={focused ? color : 'gray'}
            />
          ),
          tabBarBadge: 0,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: t('main.profile'),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="user" size={size} color={focused ? color : 'gray'} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
