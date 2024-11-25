import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from './context/context';
import React from 'react';
import BottomTabNavigationStack from './navigations/BottomTabNavigationStack';
import AuthenticationStack from './navigations/AuthenticationStack';
import ShoppingStack from './navigations/ShoppingStack';

export default function App() {
  const {
    username,
    email,
    isAuthenticated,
    setUsername,
    setEmail,
    setIsAuthenticated } = React.useContext(AuthenticationContext);

  return (
    <AuthenticationContext.Provider value={{ username, email, isAuthenticated, setUsername, setEmail, setIsAuthenticated }}>
      <NavigationContainer>
        {isAuthenticated ?
          <ShoppingStack />
          :
          <AuthenticationStack />
        }
      </NavigationContainer>
    </AuthenticationContext.Provider>
  );
}

