import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import ProductItem from '../components/ProductItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function Categories() {
  const { t } = useTranslation();
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Text className="text-xl font-bold text-black px-4 py-3">
        {t('main.categories')}
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-2"
      >
        <View className="flex-row flex-wrap justify-between">
          <View className="w-[50%]">
            <ProductItem props={
              {
                id: '1',
                image: 'https://bizweb.dktcdn.net/thumb/large/100/467/909/products/mo-hinh-do-choi-moc-khoa-pop-mar-1.jpg?v=1722503506510',
                title: 'Classic Labubu',
                description: 'Enhances your beauty with Labubu. Enhances your beauty with Labubu. Enhances your beauty with Labubu.',
                initialPrice: 150,
                discountPrice: 75,
                rating: 3,
              }
            } />
          </View>
          <View className="w-[50%]">
            <ProductItem props={
              {
                id: '1',
                image: 'https://bizweb.dktcdn.net/thumb/large/100/467/909/products/mo-hinh-do-choi-moc-khoa-pop-mar-1.jpg?v=1722503506510',
                title: 'Classic Labubu',
                description: 'Enhances your beauty with Labubu. Enhances your beauty with Labubu. Enhances your beauty with Labubu.',
                initialPrice: 150,
                discountPrice: 75,
                rating: 3,
              }
            } />
          </View>
          <View className="w-[50%]">
            <ProductItem props={
              {
                id: '1',
                image: 'https://bizweb.dktcdn.net/thumb/large/100/467/909/products/mo-hinh-do-choi-moc-khoa-pop-mar-1.jpg?v=1722503506510',
                title: 'Classic Labubu',
                description: 'Enhances your beauty with Labubu. Enhances your beauty with Labubu. Enhances your beauty with Labubu.',
                initialPrice: 150,
                discountPrice: 75,
                rating: 3,
              }
            } />
          </View>
          <View className="w-[50%]">
            <ProductItem props={
              {
                id: '1',
                image: 'https://bizweb.dktcdn.net/thumb/large/100/467/909/products/mo-hinh-do-choi-moc-khoa-pop-mar-1.jpg?v=1722503506510',
                title: 'Classic Labubu',
                description: 'Enhances your beauty with Labubu. Enhances your beauty with Labubu. Enhances your beauty with Labubu.',
                initialPrice: 150,
                discountPrice: 75,
                rating: 3,
              }
            } />
          </View>
          <View className="w-[50%]">
            <ProductItem props={
              {
                id: '1',
                image: 'https://bizweb.dktcdn.net/thumb/large/100/467/909/products/mo-hinh-do-choi-moc-khoa-pop-mar-1.jpg?v=1722503506510',
                title: 'Classic Labubu',
                description: 'Enhances your beauty with Labubu. Enhances your beauty with Labubu. Enhances your beauty with Labubu.',
                initialPrice: 150,
                discountPrice: 75,
                rating: 3,
              }
            } />
          </View>
          <View className="w-[50%]">
            <ProductItem props={
              {
                id: '1',
                image: 'https://bizweb.dktcdn.net/thumb/large/100/467/909/products/mo-hinh-do-choi-moc-khoa-pop-mar-1.jpg?v=1722503506510',
                title: 'Classic Labubu',
                description: 'Enhances your beauty with Labubu. Enhances your beauty with Labubu. Enhances your beauty with Labubu.',
                initialPrice: 150,
                discountPrice: 75,
                rating: 3,
              }
            } />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
