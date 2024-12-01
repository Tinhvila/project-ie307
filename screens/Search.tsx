import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';

export default function Search() {
  const { t } = useTranslation();

  const textInputRef = React.useRef<TextInput | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      textInputRef.current?.focus();
    }, [])
  );


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className={'flex-1'}>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <View className={'mx-2 my-4'}>
            <AntDesignIcon name='search1' size={20} className={
              'absolute top-2 left-4'
            } />
            <TextInput
              className={'text-gray-400 border-gray-500 border-2 rounded-3xl pl-12 pr-4 py-2'}
              placeholder='Search item, product, categories...'
              ref={textInputRef}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}