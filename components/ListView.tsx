import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ProductItem from './ProductItem';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigationParamList, ItemDetailsScreenRouteProp, ItemsListScreenNavigationProp, ItemsListScreenRouteProp } from '../types/navigation';
import { ItemProps } from '../types/types';

const ListView = ({ title, data }: { title: string, data?: ItemProps[] }) => {
  const navigation = useNavigation<ItemsListScreenNavigationProp>();

  return (
    <View>
      <View className={'mx-4 flex flex-row justify-between items-center'}>
        <Text className={"text-xl font-bold text-orange-500 py-3"}>{title}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ItemsListScreen', {
            title: title,
            data: data
          })}
        >
          <AntDesignIcon name={'appstore1'} size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className={'flex'}>
        <View className={'flex flex-row mx-4'}>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </View>
      </ScrollView>
    </View>
  );
};

export default ListView;