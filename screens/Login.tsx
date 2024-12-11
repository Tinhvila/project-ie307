import { View, Text, Image, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationStackNavigationProp } from '../types/navigation';
import { AuthenticationContext } from '../context/context';
import fetchUser from '../api/fetchUser';
import { comparePassword } from '../utils/hashPassword';

export default function Login() {
  const navigation = useNavigation<AuthenticationStackNavigationProp>();
  const [loginAuthen, setLoginAuthen] = React.useState({
    email: '',
    password: '',
  });
  const [revealPassword, setRevealPassword] = React.useState(false);

  const {
    setId,
    setIsAuthenticated,
    setUserData,
  } = React.useContext(AuthenticationContext);
  // Handle the login state with JSON server later
  const handleLogin = async () => {
    // Check if the field is empty
    if (loginAuthen.email === '' || loginAuthen.password === '') {
      Alert.alert('Detected empty field', 'Please fill all login field');
      return;
    }

    // Get data from json server
    const param = { email: loginAuthen.email };
    const checkData = await fetchUser(param);

    // If authentication is invalid, return an error for user to retype again
    if (!checkData || checkData.length === 0) {
      Alert.alert('Invalid email or password', 'Please try again!');
      return;
    }

    const match = await comparePassword(loginAuthen.password, checkData[0].password)
    if (!match) {
      Alert.alert('Invalid email or password', 'Please try again!');
      return;
    }

    // If authentication is valid, allows the user to sign in
    Alert.alert("Login successfully", "You have logged in successfully.");
    setId(checkData[0].id);
    setUserData({
      username: checkData[0].username,
      firstName: checkData[0].firstName,
      lastName: checkData[0].lastName,
      address: checkData[0].address,
      phoneNumber: checkData[0].phoneNumber,
      email: checkData[0].email,
    });
    setIsAuthenticated(true);
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
            <Text className={'text-2xl font-medium'}>Login</Text>
            <View className={'mt-3 items-center justify-center'}>
              <AntDesignIcon
                name='mail'
                size={24}
                color={'gray'}
                className={'absolute left-2'}
              />
              <TextInput
                className={'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'}
                placeholder='Email'
                value={loginAuthen.email}
                onChangeText={(text) => setLoginAuthen(prev => ({ ...prev, email: text }))}
              />
            </View>
            <View className={'mt-3 items-center justify-center'}>
              <AntDesignIcon
                name='lock'
                size={24}
                color={'gray'}
                className={'absolute left-2'}
              />
              <TextInput
                className={'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'}
                placeholder='Password'
                secureTextEntry={revealPassword ? false : true}
                value={loginAuthen.password}
                onChangeText={(text) => setLoginAuthen(prev => ({ ...prev, password: text }))}
              />
              <FontAwesome5Icon
                name={revealPassword ? 'eye-slash' : 'eye'}
                size={20}
                color={'gray'}
                className={'absolute right-3'}
                onPress={() => setRevealPassword((prev) => !prev)}
              />
            </View>
            <TouchableOpacity>
              <Text className={'text-right w-80 mt-2 text-blue-500'}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={'bg-[#0d3092] mt-5 py-3 px-10 rounded-full'}
              onPress={handleLogin}
            >
              <Text className={'text-white text-xl font-bold'}>SIGN IN</Text>
            </TouchableOpacity>
            <Text className={'text-base mt-5'}>Don't have an account?
              <Text
                className={'text-blue-500 font-bold'}
                onPress={() => {
                  navigation.replace('SignUp')
                }}
              > Sign Up
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  )
}