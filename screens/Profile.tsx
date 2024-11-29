import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n.config';
import { AuthenticationContext } from '../context/context';

export default function Profile() {
  const { t } = useTranslation();
  const [isPressed, setIsPressed] = useState(false);
  const { setIsAuthenticated } = React.useContext(AuthenticationContext);

  const changeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return (
    <View className="flex flex-1 justify-center items-center bg-white">
      <Text className="text-red-400 text-xl">{t('main.profile')}</Text>

      <Pressable
        onPress={changeLanguage}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        className={`mt-2 rounded-md border-2 border-black
          ${isPressed ? 'bg-black' : 'bg-white'}`}
      >
        <Text
          className={`px-4 py-2 text-base font-medium
            ${isPressed ? 'text-white' : 'text-black'}`}
        >
          Change language
        </Text>
      </Pressable>
      <Pressable onPress={handleLogout}
        className={`mt-2 rounded-md border-2 border-black`}>
        <Text
          className={`px-4 py-2 text-base font-medium
            ${isPressed ? 'text-white' : 'text-black'}`}
        >
          Log Out
        </Text>
      </Pressable>
    </View>
  );
}
