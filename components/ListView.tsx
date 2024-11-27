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
        <Text className={"text-2xl font-bold text-orange-500 py-3"}>{title}</Text>
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
          <View className={'w-52'}>
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
          <View className={'w-52'}>
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
          <View className={'w-52'}>
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
          <View className={'w-52'}>
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
          <View className={'w-52'}>
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
    </View>
  );
};

export default ListView;