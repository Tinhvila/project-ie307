import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatPrice } from '../utils/formatPrice';
import { useNavigation } from '@react-navigation/native';
import { CartStackNavigationProp } from '../types/navigation';
import { useTranslation } from 'react-i18next';

interface Checkout {
  subtotal: number;
  shippingFee?: number;
  vatRate?: number;
}

export default function Checkout({
  subtotal,
  shippingFee = 30000,
  vatRate = 0.08,
}: Checkout) {
  const { t } = useTranslation();
  const vatAmount = subtotal * vatRate;
  const navigation = useNavigation<CartStackNavigationProp>();
  const total = subtotal + shippingFee + vatAmount;

  return (
    <View className="bg-white rounded-t-xl shadow-md p-4">
      <View className="border-b border-gray-200 pb-2 mb-2">
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600">{t('cart.subtotal')}</Text>
          <Text className="font-semibold">{formatPrice(subtotal)}</Text>
        </View>

        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600">{t('cart.shipping')}</Text>
          <Text className="font-semibold">{formatPrice(shippingFee)}</Text>
        </View>

        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600">{t('cart.vat')}</Text>
          <Text className="font-semibold">{formatPrice(vatAmount)}</Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-4">
        <Text className="text-lg font-bold">{t('cart.total')}</Text>
        <Text className="text-lg font-bold text-red-500">
          {formatPrice(total)}
        </Text>
      </View>

      <TouchableOpacity
        className="bg-black rounded-lg py-3 items-center"
        onPress={() => navigation.navigate('Payment')}
      >
        <Text className="text-white text-base font-bold">
          {t('cart.proceedToCheckout')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
