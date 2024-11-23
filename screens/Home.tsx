import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <Text className="text-red-500">{t('main.home')}</Text>
    </SafeAreaView>
  );
}
