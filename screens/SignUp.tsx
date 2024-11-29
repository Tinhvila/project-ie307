import { View, Text, Image, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationStackNavigationProp } from '../types/navigation';
import { AuthenticationContext } from '../context/context';

export default function SignUp() {
  const navigation = useNavigation<AuthenticationStackNavigationProp>();
  const [signUpAuthen, setSignUpAuthen] = React.useState({
    username: '',
    email: '',
    password: '',
    retypePassword: '',
  });
  const [revealPassword, setRevealPassword] = React.useState({
    password: false,
    retypePassword: false,
  });

  // If sign up successfully, instead of navigating back to login,
  // directly navigate to the Home page
  const {
    setUsername,
    setEmail,
    setIsAuthenticated
  } = React.useContext(AuthenticationContext);
  const handleSignUp = () => {
    // Handle empty field
    if (signUpAuthen.username === ''
      || signUpAuthen.email === ''
      || signUpAuthen.password === ''
      || signUpAuthen.retypePassword === '') {
      Alert.alert("Detected empty field", 'Please fill all the sign up field.');
      return;
    }

    // Handle valid password and retype password
    if (signUpAuthen.password !== signUpAuthen.retypePassword) {
      Alert.alert("Password mismatch", 'Please enter password in Password and Confirm Password field correctly.');
      return;
    }

    // Call the JSON server to validate here later

    // If validate successfully, direct the user to Home
  };

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className={'flex flex-1 justify-center items-center'}>
          <View className={'items-center'}>
            <Image
              className={'w-52 h-24 object-contain'}
              source={require('../assets/image/logo_2.png')}
            />
            <Text className={'text-2xl font-medium'}>Sign Up</Text>
            <View className={'mt-3'}>
              <AntDesignIcon
                name='user'
                size={24}
                color={'gray'}
                className={'absolute top-2 left-[6px]'}
              />
              <TextInput
                className={'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'}
                placeholder='Username'
                value={signUpAuthen.username}
                onChangeText={(text) => setSignUpAuthen(prev => ({ ...prev, username: text }))}
              />
            </View>
            <View className={'mt-3'}>
              <AntDesignIcon
                name='mail'
                size={24}
                color={'gray'}
                className={'absolute top-2 left-[6px]'}
              />
              <TextInput
                className={'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'}
                placeholder='Email'
                value={signUpAuthen.email}
                onChangeText={(text) => setSignUpAuthen(prev => ({ ...prev, email: text }))}
              />
            </View>
            <View className={'mt-3'}>
              <AntDesignIcon
                name='lock'
                size={24}
                color={'gray'}
                className={'absolute top-2 left-[6px]'}
              />
              <TextInput
                className={'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'}
                placeholder='Password'
                secureTextEntry={revealPassword.password ? false : true}
                value={signUpAuthen.password}
                onChangeText={(text) => setSignUpAuthen(prev => ({ ...prev, password: text }))}
              />
              <FontAwesome5Icon
                name={revealPassword.password ? 'eye-slash' : 'eye'}
                size={20}
                color={'gray'}
                className={'absolute top-3 right-3'}
                onPress={() => setRevealPassword((prev) => ({ ...prev, password: !prev.password }))}
              />
            </View>
            <View className={'mt-3'}>
              <AntDesignIcon
                name='lock'
                size={24}
                color={'gray'}
                className={'absolute top-2 left-[6px]'}
              />
              <TextInput
                className={'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'}
                placeholder='Confirm Password'
                secureTextEntry={revealPassword.retypePassword ? false : true}
                value={signUpAuthen.retypePassword}
                onChangeText={(text) => setSignUpAuthen(prev => ({ ...prev, retypePassword: text }))}
              />
              <FontAwesome5Icon
                name={revealPassword.retypePassword ? 'eye-slash' : 'eye'}
                size={20}
                color={'gray'}
                className={'absolute top-3 right-3'}
                onPress={() => setRevealPassword((prev) => ({ ...prev, retypePassword: !prev.retypePassword }))}
              />
            </View>
            <TouchableOpacity
              onPress={handleSignUp}
              className={'bg-[#0d3092] mt-5 py-3 px-10 rounded-full'}
            >
              <Text className={'text-white text-xl font-bold'}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
            <Text className={'text-base mt-5'}>Already have an account?
              <Text
                className={'text-blue-500 font-bold'}
                onPress={() => {
                  navigation.replace('Login')
                }}
              > Sign In
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  )
}