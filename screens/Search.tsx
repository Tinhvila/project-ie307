import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function Search() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const textInputRef = React.useRef<null | any>();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus(); // Automatically focus the search bar
        }
      }, 100);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handleSearch = async () => {

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className={'flex-1'}>
        <SafeAreaView>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <View className={'mx-2 my-4'}>
              <TextInput
                className={'border-gray-500 border-2 rounded-3xl pl-12 pr-4 py-2'}
                placeholder='Search item, product, categories...'
                ref={textInputRef}
                returnKeyType='search'
                onSubmitEditing={handleSearch}
                enablesReturnKeyAutomatically
              />
              <TouchableOpacity className={'absolute top-2 left-4'} onPress={handleSearch}>
                <AntDesignIcon name='search1' size={20} />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}