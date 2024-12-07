import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n.config';
import { AuthenticationContext } from '../context/context';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackNavigationProp } from '../types/navigation';

export default function Profile() {
  const { t } = useTranslation();
  const { username, email, setUsername, setEmail, setIsAuthenticated } = React.useContext(AuthenticationContext);
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const changeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    setUsername('');
    setEmail('');
    setIsAuthenticated(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <Text className="text-xl font-bold text-black px-2 py-3">{t('main.profile')}</Text>
      <View className="bg-gray-200 w-full h-40 items-center justify-center">
        <View className={'rounded-full bg-gray-400 w-24 h-24 items-center justify-center'}>
          <Text className={'font-bold text-5xl'}>{username.at(0)?.toUpperCase()}</Text>
        </View>
        <Text className={'text-xl'}>{username}</Text>
        <Text className={'text-base'}>{email}</Text>
      </View>
      <View className={'flex justify-around items-center flex-row mt-1'}>
        <View className={'w-[50%]'}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Order')}
            className={'justify-center items-center bg-gray-300 p-5 m-1'}>
            <AntDesignIcon name="tagso" size={32} />
            <Text className={'mt-1 text-lg'}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={changeLanguage}
            className={'justify-center items-center bg-gray-300 p-5 m-1'}>
            <IoniconsIcon name="language" size={32} />
            <Text className={'mt-1 text-lg'}>Change language</Text>
          </TouchableOpacity>
        </View>
        <View className={'w-[50%]'}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            className={'justify-center items-center bg-gray-300 p-5 m-1'}>
            <AntDesignIcon name="setting" size={32} />
            <Text className={'mt-1 text-lg'}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            className={'justify-center items-center bg-gray-300 p-5 m-1'}>
            <AntDesignIcon name="logout" size={32} />
            <Text className={'mt-1 text-lg'}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
