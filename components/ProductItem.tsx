import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import StarList from './StarList';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ItemProps } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { ItemDetailsNavigationProp } from '../types/navigation';

const ProductItem: React.FC<{ props: ItemProps }> = ({ props }) => {
  const [favorite, setFavorite] = React.useState(false);
  const [cart, setCart] = React.useState(false);
  const navigation = useNavigation<ItemDetailsNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ItemDetails', {
          ...props
        });
      }}
      className=" bg-white rounded-sm shadow-sm mx-1 my-1 "
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: props.image }}
        className="w-full rounded-t-sm aspect-square "
      />
      <View className="p-2">
        <Text
          className="text-md text-black font-semibold mb-1"
          numberOfLines={1}
        >
          {props.title}
        </Text>

        <Text className="text-xl font-bold text-black">
          ${props.discountPrice ? props.discountPrice.toFixed(2) : props.initialPrice.toFixed(2)}
        </Text>

        <View className="flex-row items-center space-x-2 mb-1">
          <Text className="text-xs text-gray-400 line-through mr-1">
            {props.discountPrice ? `\$${props.initialPrice.toFixed(2)}` : ''}
          </Text>
          <Text className="text-xs text-red-500">{props.discountPrice ? `${Math.round(100 - props.discountPrice / props.initialPrice * 100).toFixed(0)}% OFF` : ''}</Text>
        </View>

        <View className="flex-row items-center">
          <View className="flex-1">
            <StarList rating={props.rating ? props.rating : 0} />
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="absolute left-1 top-1  rounded-full p-2 bg-white"
        onPress={() => setFavorite((prev) => !prev)}
      >
        <FontAwesomeIcon
          name={favorite ? 'heart' : 'heart-o'}
          size={24}
          color={favorite ? 'red' : ''}
        // className="bg-white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute right-0 bottom-0  rounded-full p-2"
        onPress={() => setCart((prev) => !prev)}
      >
        <Ionicons
          name={cart ? 'cart' : 'cart-outline'}
          size={30}
          color={cart ? '#03168f' : ''}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductItem;
