import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function EditProfile() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className={'flex-1'}>
      <View className={'flex-row items-center'}>
        <TouchableOpacity
          className={'ml-3'}
          onPress={() => navigation.goBack()}
        >
          <AntDesignIcon name={'left'} size={20} />
        </TouchableOpacity>
        <Text className={'text-xl font-bold text-black px-2 py-3'}>Edit Profile</Text>
      </View>
      <View>
      </View>
    </SafeAreaView>
  )
}