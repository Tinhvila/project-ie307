import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import QuantityControl from './QuantityControl';
import { formatPrice } from '../utils/formatPrice';
import { CartItem as CartItemType } from '../types/cartItem.type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { removeFromCart, updateCartItemQuantity } from '../redux/cartSlice';
import { AuthenticationContext } from '../context/context';
import { useTranslation } from 'react-i18next';
import { useToast } from '../components/toastContext';
import { useNavigation } from '@react-navigation/native';
import fetchProductData from '../api/fetchProductData';
import { ItemDetailsNavigationProp } from '../types/navigation';

interface Props {
  product: CartItemType;
}

export default function CartItemComponent({ product }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { showToast } = useToast();

  const { id } = React.useContext(AuthenticationContext);

  const handleRemoveItem = () => {
    dispatch(removeFromCart({ id, itemId: product.id }));
    setTimeout(() => {
      showToast(t('messages.remove-from-cart'));
    }, 0);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    dispatch(
      updateCartItemQuantity({
        id,
        itemId: product.id,
        quantity: newQuantity,
      })
    );
  };

  const calculateSubtotal = () => {
    return (product.price || 0) * product.quantity;
  };

  const handleCheckCart = async () => {
    const params = { filterId: product.id };
    const dataProduct = await fetchProductData(params);
    if (dataProduct && dataProduct.data.length > 0) {
      const dataParams = dataProduct.data[0];
      navigation.navigate('ItemDetails', { ...dataParams });
    }
  }

  return (
    <TouchableOpacity onPress={handleCheckCart}>
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
              <TouchableOpacity onPress={handleRemoveItem}>
                <Icon name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center mb-2">
              <View>
                {product.price ? (
                  <Text className="font-bold text-red-500">
                    {formatPrice(product.price)}
                  </Text>
                ) : null}
              </View>
            </View>

            <View className="flex-row justify-between items-center">
              <QuantityControl
                quantity={product.quantity}
                onIncrease={() => handleUpdateQuantity(product.quantity + 1)}
                onDecrease={() =>
                  handleUpdateQuantity(
                    product.quantity > 1 ? product.quantity - 1 : 1
                  )
                }
                maxQuantity={10}
              />
              <Text className="font-bold text-base">
                {formatPrice(calculateSubtotal())}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
