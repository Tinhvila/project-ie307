import './global.css';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from './context/context';
import AuthenticationStack from './navigations/AuthenticationStack';
import ShoppingStack from './navigations/ShoppingStack';
import Plash from './screens/Plash';

export default function App() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
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
        {/* <ShoppingStack /> */}
        {isAuthenticated ? <ShoppingStack /> : <AuthenticationStack />}
      </NavigationContainer>
    </AuthenticationContext.Provider>
  );
}
