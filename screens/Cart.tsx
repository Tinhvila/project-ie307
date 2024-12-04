import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CartItem from '../components/CartItem';
import Checkout from '../components/Checkout';

export default function Cart() {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <ScrollView className="p-2 flex flex-col gap-2 ">
        <CartItem />
        <CartItem />
        <CartItem />
      </ScrollView>
      <Checkout subtotal={1} />
    </SafeAreaView>
  );
}
