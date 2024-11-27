import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import StarList from './StarList';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;

const productData = {
  image:
    'https://bizweb.dktcdn.net/thumb/large/100/467/909/products/mo-hinh-do-choi-moc-khoa-pop-mar-1.jpg?v=1722503506510',
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
      className=" bg-white rounded-sm shadow-sm mx-1 my-1 "
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: productData.image }}
        className="w-full rounded-t-sm aspect-square "
      />
      <View className="p-2">
        <Text
          className="text-md text-black font-semibold mb-1"
          numberOfLines={1}
        >
          {productData.title}
        </Text>

        <Text className="text-xl font-bold text-black">
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
