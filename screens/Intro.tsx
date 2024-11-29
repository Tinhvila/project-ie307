import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { AuthenticationStackNavigationProp } from '../types/navigation'

export default function Intro() {
  const navigation = useNavigation<AuthenticationStackNavigationProp>();

  return (
    <ImageBackground
      source={require('../assets/image/background.png')}
      className={'flex-1'}
    >
      <SafeAreaView className={'flex-1 justify-center items-center'}>
        <View className={'items-center'}>
          <Image
            className={'w-52 h-24 object-contain'}
            source={require('../assets/image/logo_2.png')}
          />
          <Text className={'mb-10 text-white text-center font-medium text-2xl'}>Bring yourself a new style {'\n'}with Titan.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className={'bg-white w-52 px-5 py-3 items-center rounded-full'}
          >
            <Text className={'text-3xl text-[#0d3092]'}>Login</Text>
          </TouchableOpacity>
          <Text className={'font-light mt-10 mb-3'}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className={'border-white border-2 w-52 px-5 py-3 items-center rounded-full'}
          >
            <Text className={'text-3xl text-white'}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>

  )
}