import './global.css';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from './context/context';
import BottomTabNavigationStack from './navigations/BottomTabNavigationStack';
import AuthenticationStack from './navigations/AuthenticationStack';
import ShoppingStack from './navigations/ShoppingStack';
import Plash from './screens/Plash';

export default function App() {
  const {
    username,
    email,
    isAuthenticated,
    setUsername,
    setEmail,
    setIsAuthenticated,
  } = React.useContext(AuthenticationContext);

  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return (
      <NavigationContainer>
        <Plash />
      </NavigationContainer>
    );
  }

  return (
    <AuthenticationContext.Provider
      value={{
        username,
        email,
        isAuthenticated,
        setUsername,
        setEmail,
        setIsAuthenticated,
      }}
    >
      <NavigationContainer>
        {isAuthenticated ? <ShoppingStack /> : <AuthenticationStack />}
      </NavigationContainer>
    </AuthenticationContext.Provider>
  );
}
