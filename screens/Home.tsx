import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProp } from '../types/navigation';


export default function Home() {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <Text className="text-red-500">{t('main.home')}</Text>
      <TouchableOpacity
        className={'p-3 border-black border-2 rounded-lg'}
        onPress={() => {
          navigation.navigate('ItemDetails', {
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
            title: 'Classic Watch',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            rating: 3,
            initialPrice: 399.99,
            discountPrice: 299.99
          });
        }}
      >
        <Text>Navigate to Item Details</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
