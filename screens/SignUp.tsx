import { View, Text, Image, TextInput, Alert } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface SignUpProp {
  username: string,
  email: string,
  password: string,
  retypePassword: string,
}

export default function SignUp() {
  const navigation = useNavigation();

  // Records sign up
  const [signUpInfo, setSignUpInfo] = React.useState<SignUpProp>({
    username: '',
    email: '',
    password: '',
    retypePassword: '',
  });

  const handleChange = (type: keyof SignUpProp, value: string) => {
    setSignUpInfo((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Handles the process if the user enter a valid email
  const validateEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  // Handles the sign up process
  const handleSignUp = () => {
    // Before handles the sign up process to server, first checks the
    // email whether or not is valid
    // Pops up the message if the email field is invalid and return
    if (!validateEmail(signUpInfo.email)) {
      Alert.alert('Please enter a valid email!');
      return;
    }

    // Creates transaction to the server to validate the email
    // If the email already exists, pop up the message to the user
    // and return



    // Checks the password and retype password
    // If both are not match, pop up the message and return

    // After all checking authentication condition, tells the 
    // server to create account and then, pop up the message to the
    // user to confirm the account created successfully, hope the server
    // will response


    // Finally, if account is created successfully, navigate the user back
    // to login screen (with goBack() instead of navigate())
  };


  return (
    <View className="flex-1 justify-center items-center">
      <Image source={require("../assets/logo.png")} className="rounded-full w-36 h-36" />
      <Text className="font-bold text-2xl mt-2">Create New Account</Text>

      <View className="relative mt-2">
        <Icon name="user" size={30} color="#AFAFAF" className="absolute left-2 top-2" />
        <TextInput
          className="border-2 border-[#AFAFAF] rounded-lg pl-12 py-4 w-72"
          placeholder="Enter username"
          value={signUpInfo.username}
          onChangeText={(text) => handleChange('username', text)}
        />
      </View>

      <View className="relative mt-2">
        <Icon name="mail" size={30} color="#AFAFAF" className="absolute left-2 top-2" />
        <TextInput
          inputMode='email'
          className="border-2 border-[#AFAFAF] rounded-lg pl-12 py-4 w-72"
          placeholder="Enter email"
          value={signUpInfo.email}
          onChangeText={(text) => handleChange('email', text)}
        />
      </View>

      <View className="relative mt-2">
        <Icon name="lock" size={30} color="#AFAFAF" className="absolute left-2 top-2" />
        <TextInput
          secureTextEntry={true}
          className="border-2 border-[#AFAFAF] rounded-lg pl-12 py-4 w-72"
          placeholder="Enter password"
          value={signUpInfo.password}
          onChangeText={(text) => handleChange('password', text)}
        />
      </View>

      <View className="relative mt-2">
        <Icon name="lock" size={30} color="#AFAFAF" className="absolute left-2 top-2" />
        <TextInput
          secureTextEntry={true}
          className="border-2 border-[#AFAFAF] rounded-lg pl-12 py-4 w-72"
          placeholder="Confirm Password"
          value={signUpInfo.retypePassword}
          onChangeText={(text) => handleChange('retypePassword', text)}
        />
      </View>

      <TouchableOpacity
        className="bg-orange-500 items-center justify-center w-72 py-5 rounded-lg mt-5"
        onPress={() => handleSignUp()}>
        <Text className="text-white text-lg">CREATE</Text>
      </TouchableOpacity>

      <Text className="text-base mt-4">
        Already have an account?
        <Text className="font-bold text-blue-500" onPress={() => navigation.goBack()}> Login now!</Text>
      </Text>
    </View>
  )
}
