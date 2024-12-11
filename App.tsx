import './global.css';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from './context/context';
import AuthenticationStack from './navigations/AuthenticationStack';
import ShoppingStack from './navigations/ShoppingStack';
import Plash from './screens/Plash';

export default function App() {
  const [id, setId] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [userData, setUserData] = React.useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  });

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
        id,
        userData,
        isAuthenticated,
        setIsAuthenticated,
        setId,
        setUserData,
      }}
    >
      <NavigationContainer>
        {/* <ShoppingStack /> */}
        {isAuthenticated ? <ShoppingStack /> : <AuthenticationStack />}
      </NavigationContainer>
    </AuthenticationContext.Provider>
  );
}
