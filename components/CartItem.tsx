import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import QuantityControl from './QuantityControl';
import { formatPrice } from '../utils/formatPrice';

export default function CartItem() {
  const [quantity, setQuantity] = useState(1);
  const product = {
    id: 1,
    name: 'Elegant Minimalist Leather Jacket in Smooth Black Finish',
    price: 250000,
    discountPrice: 200000,
    image:
      'https://bizweb.dktcdn.net/thumb/large/100/467/909/products/z5694615634546-40ef32812307cfd099c48da0ee262b36.jpg?v=1722670247040',
    remainingStock: 10,
  };
  const handleIncrease = () => {
    if (quantity < product.remainingStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const calculateSubtotal = () => {
    return (product.discountPrice || product.price) * quantity;
  };

  return (
    <View className="bg-white rounded-md shadow-sm m-2 p-4">
      <View className="flex-row">
        <View className="w-1/3 mr-4">
          <Image
            source={{ uri: product.image }}
            className="w-full aspect-square rounded-sm"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="flex-1 pr-4 text-base font-bold line-clamp-2">
              {product.name}
            </Text>
            <TouchableOpacity onPress={() => console.log('Remove product')}>
              <Icon name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center mb-2">
            <View>
              {product.discountPrice ? (
                <>
                  <Text className="text-gray-500 line-through text-sm">
                    {formatPrice(product.price)}
                  </Text>
                  <Text className="text-red-500 font-bold">
                    {formatPrice(product.discountPrice)}
                  </Text>
                </>
              ) : (
                <Text className="font-bold">{formatPrice(product.price)}</Text>
              )}
            </View>
          </View>

          <View className="flex-row justify-between items-center">
            <QuantityControl
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              maxQuantity={product.remainingStock}
            />
            <Text className="font-bold text-base">
              {formatPrice(calculateSubtotal())}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
