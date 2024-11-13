import { View, Text, Image, TextInput, Alert } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { ContextSignedIn, PasswordDefault, UsernameDefault } from '../context/context';
import { useNavigation } from '@react-navigation/native';
interface loginProp {
  username: string,
  password: string,
}

export default function Login() {
  const [loginInfo, setLoginInfo] = React.useState<loginProp>({
    username: "",
    password: "",
  });

  const UsernameInfo = React.useContext(UsernameDefault);
  const PasswordInfo = React.useContext(PasswordDefault);
  const { isSignedIn, setIsSignedIn } = React.useContext(ContextSignedIn);
  const navigation = useNavigation();

  const handleChange = (name: keyof loginProp, value: string) => {
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (loginInfo.username === UsernameInfo && loginInfo.password === PasswordInfo) {
      setIsSignedIn(true);
      return;
    }

    Alert.alert("Incorrect email or password.", "", [{
      text: 'OK'
    }]);
  };

  return (
    <View className="flex flex-1 justify-center items-center">
      <Image source={require("../assets/logo.png")} className="rounded-full w-36 h-36" />
      <Text className="font-bold text-2xl mt-2">Welcome</Text>
      <View className="relative mt-2">
        <Icon name="mail" size={30} color="#AFAFAF" className="absolute left-2 top-2" />
        <TextInput
          value={loginInfo.username}
          onChangeText={(text) => handleChange("username", text)}
          className="border-2 border-[#AFAFAF] rounded-lg pl-12 py-4 w-72"
          placeholder="Email"
        />
      </View>
      <View className="relative mt-2">
        <Icon name="lock" size={30} color="#AFAFAF" className="absolute left-2 top-2" />
        <TextInput
          secureTextEntry={true}
          value={loginInfo.password}
          onChangeText={(text) => handleChange("password", text)}
          className="border-2 border-[#AFAFAF] rounded-lg pl-12 py-4 w-72"
          placeholder="Password"
        />
      </View>
      <Text className="text-right w-72 mt-2 mb-8 text-[#920a6c]">Forgot password?</Text>

      <TouchableOpacity
        className="bg-orange-500 items-center justify-center w-72 py-5 rounded-lg"
        onPress={handleLogin}
      >
        <Text className="text-white text-lg">LOG IN</Text>
      </TouchableOpacity>

      <Text className="font-bold text-xl mt-4">Or login with</Text>
      <View className="flex-row mt-5 mb-10">
        <Image source={require("../assets/facebook_icon.png")} className="rounded-full w-20 h-20 mx-2" />
        <Image source={require("../assets/google_icon.png")} className="rounded-full w-20 h-20 mx-2" />
      </View>

      <Text className="text-base">
        Don't have an account?
        <Text className="font-bold text-blue-500" onPress={() => navigation.navigate('SignUp')}> Sign up here!</Text>
      </Text>
    </View>
  )
}