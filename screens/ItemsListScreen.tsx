import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ItemProps } from '../types/types'
import ProductItem from '../components/ProductItem'
import { useTranslation } from 'react-i18next'
import { ItemsListScreenRouteProp } from '../types/navigation'
import { useNavigation } from '@react-navigation/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export default function ItemsListScreen({ route }: { route: ItemsListScreenRouteProp }) {
  const { t } = useTranslation();
  const { title, data } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View className={'flex flex-row items-center'}>
        <TouchableOpacity
          className={'pl-4'}
          onPress={() => navigation.goBack()}
        >
          <AntDesignIcon name={'left'} size={32} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black px-4 py-3">
          {title ? title : 'Item List Screen'}
        </Text>
      </View>
      {/* Display items here with map */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-2">
        <View className="flex-row flex-wrap justify-between">
          <View className="w-[50%]">
            <ProductItem props={
              {
                id: '1',
                image: 'https://bizweb.dktcdn.net/thumb/large/100/467/909/products/mo-hinh-do-choi-moc-khoa-pop-mar-1.jpg?v=1722503506510',
                title: 'Classic Labubu',
                description: 'Enhances your beauty with Labubu. Enhances your beauty with Labubu. Enhances your beauty with Labubu.',
                initialPrice: 150.00,
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
                initialPrice: 150.50,
                discountPrice: 55.55,
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
                initialPrice: 150.50,
                discountPrice: 55.55,
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
                initialPrice: 150.50,
                discountPrice: 55.55,
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
                initialPrice: 150.50,
                discountPrice: 55.55,
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
                initialPrice: 150.50,
                discountPrice: 55.55,
                rating: 3,
              }
            } />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}