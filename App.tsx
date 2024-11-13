import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { ContextSignedIn } from './context/context';
import Home from './screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favourites from './screens/Favourites';
import Categories from './screens/Categories'
import Profile from './screens/Profile';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, View, Text } from 'react-native';
import './global.css'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const value = { isSignedIn, setIsSignedIn };

  return (
    <NavigationContainer>
      <ContextSignedIn.Provider value={value}>
        {isSignedIn
          ? (
            <>
              <Tab.Navigator>
                <Tab.Screen
                  name="Home"
                  component={Home}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                      <Icon name="home" size={30} color={focused ? color : "#000000"} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Categories"
                  component={Categories}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                      <Icon name="appstore1" size={30} color={focused ? color : "#000000"} />
                    ),
                  }} />
                <Tab.Screen
                  name="Favourites"
                  component={Favourites}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                      <View style={iconStyles.iconContainer}>
                        <Icon name="heart" size={30} color={focused ? color : "#000000"} />
                        <View style={iconStyles.iconNotification}>
                          <Text style={iconStyles.iconText}>3</Text>
                        </View>
                      </View>
                    ),
                  }}
                />
                <Tab.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                      <Icon name="user" size={30} color={focused ? color : "#000000"} />
                    ),
                  }} />
              </Tab.Navigator>
            </>
          )
          : (
            <>
              <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
              </Stack.Navigator>
            </>
          )}
      </ContextSignedIn.Provider>
    </NavigationContainer>
  );
}

const iconStyles = StyleSheet.create({
  iconContainer: {
    position: "relative",
  },
  iconNotification: {
    position: "absolute",
    backgroundColor: "#ff0000",
    borderRadius: 200,
    width: 18,
    height: 18,
    alignItems: "center",
    left: 20,
    bottom: 15,
  },
  iconText: {
    color: "white",
  }
});

