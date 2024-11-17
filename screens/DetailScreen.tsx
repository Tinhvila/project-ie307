import { Text, ImageProps, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DetailScreenProp {
  image?: ImageProps,
  title?: string,
  description?: string,
  initialPrice?: number,
  salePrice?: number,
  rating?: number,
  reviewCount?: number,
}

export default function DetailScreen({ props }: { props?: DetailScreenProp }) {

  return (
    <SafeAreaView>
      <ScrollView>
        <Image source={props?.image} className={'w-screen h-96'} />
        <Text className={'font-bold text-2xl m-5'}>{props?.title}</Text>
        <Text className={'text-base mx-5'}>{props?.description}</Text>
        {/* Sale price */}
        {
          props?.salePrice
            ?
            <Text className={'font-bold text-xl m-5'}>
              Price: ${props?.salePrice} <Text className={'font-bold text-base m-5 color-gray-500 line-through'}>${props?.initialPrice}</Text>
            </Text>
            :
            <Text className={'font-bold text-xl m-5'}>
              Price: ${props?.initialPrice}
            </Text>
        }
        <Text className={'font-bold text-xl mx-5'}>Rating: {props?.rating} <Icon name='star' size={20} color={'#ff9100'}></Icon></Text>
        <TouchableOpacity className={'rounded bg-blue-700 w-32 px-5 py-3 m-5'}>
          <Text className={'color-white font-medium'}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}