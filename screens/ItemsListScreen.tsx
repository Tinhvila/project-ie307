import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ItemProps } from '../types/types'
import ProductItem from '../components/ProductItem'
import { useTranslation } from 'react-i18next'
import { ItemsListScreenRouteProp } from '../types/navigation'


export default function ItemsListScreen({ route }: { route: ItemsListScreenRouteProp }) {
  const { t } = useTranslation();
  const { title, data } = route.params;

  return (
    <SafeAreaView>
      <Text className="text-xl font-bold text-black px-4 py-3">
        {title ? title : 'Item List Screen'}
      </Text>
      {/* Display items here with map */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-2">
        <View className="flex-row flex-wrap justify-between">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}