import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import StarList from './StarList';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const productData = {
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  title: 'Classic Watch',
  description:
    'Comfortable and stylish everyday wear. Comfortable and stylish everyday wear. Comfortable and stylish everyday wear. Comfortable and stylish everyday wear.',
  price: 50,
  priceBeforeDeal: 75,
  priceOff: '33% OFF',
  stars: 1,
  numberOfReview: 120,
};

const ProductItem: React.FC = () => {
  const [favorite, setFavorite] = React.useState(false);
  const [cart, setCart] = React.useState(false);
  return (
    <TouchableOpacity
      className="w-[48%] bg-white rounded-sm shadow-sm mx-1 my-1"
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: productData.image }}
        className="w-full rounded-t-sm h-32"
      />
      <View className="p-2">
        <Text
          className="text-sm text-black font-semibold mb-1"
          numberOfLines={1}
        >
          {productData.title}
        </Text>

        <Text className="text-xs text-gray-500 mb-1" numberOfLines={2}>
          {productData.description}
        </Text>

        <Text className="text-base font-bold text-black">
          ${productData.price}
        </Text>

        <View className="flex-row items-center space-x-2 mb-1">
          <Text className="text-xs text-gray-400 line-through mr-1">
            ${productData.priceBeforeDeal}
          </Text>
          <Text className="text-xs text-red-500">{productData.priceOff}</Text>
        </View>

        <View className="flex-row items-center">
          <View className="flex-1">
            <StarList rating={productData.stars} />
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="absolute left-0 top-0  rounded-full p-2"
        onPress={() => setFavorite((prev) => !prev)}
      >
        <FontAwesomeIcon
          name={favorite ? 'heart' : 'heart-o'}
          size={24}
          color={favorite ? 'red' : ''}
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
