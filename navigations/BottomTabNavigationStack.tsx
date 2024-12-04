import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Categories from '../screens/Categories';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomTabNavigationStackParamList } from '../types/navigation';
import HomeStackNavigation from './HomeStackNavigation';

const Tab = createBottomTabNavigator<BottomTabNavigationStackParamList>();

export default function BottomTabNavigationStack() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator initialRouteName="HomeStack">
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigation}
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
            <View className={`justify-center items-center w-16 h-16 rounded-full top-0 ${focused ? 'bg-blue-400' : 'bg-gray-300'}`}>
              <Icon
                name="search1"
                color={focused ? 'white' : 'black'}
                size={24}
              />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={t('main.cart')}
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
          headerShown: true,
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

const styles = StyleSheet.create({
  searchIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48, // Adjusted size for a more consistent look
    height: 48, // Adjusted size for a more consistent look
    borderRadius: 24, // Circular shape for the wrapper
    top: 0,
    borderWidth: 2, // Optional: add border for better visibility of the icon
  },
  searchIconWrapperFocused: {
    backgroundColor: '#3b82f6', // bg-blue-400
  },
});