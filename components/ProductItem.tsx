import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useContext } from 'react';
import StarList from './StarList';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ItemProps } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { ItemDetailsNavigationProp } from '../types/navigation';
import { formatPrice } from '../utils/formatPrice';
import { AuthenticationContext } from '../context/context';
import { CartItem as CartItemType } from '../types/cartItem.type';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useToast } from '../components/toastContext';

import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from '../redux/cartSlice';
import { useTranslation } from 'react-i18next';
import { FavoriteItem } from '../types/favoriteItem.type';
import { addToFavorites, removeFromFavorites } from '../redux/favoriteSlice';

const ProductItem: React.FC<{ props: ItemProps }> = ({ props }) => {
  const { t } = useTranslation();
  const navigation = useNavigation<ItemDetailsNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useContext(AuthenticationContext);
  const { items: cartItems, loading } = useSelector(
    (state: RootState) => state.cart
  );
  const { items: favoriteItems } = useSelector(
    (state: RootState) => state.favorite
  );
  const isInCart = cartItems.some((item) => item.id === props.id);
  const isInFavorite = favoriteItems.some((item) => item.id === props.id);
  // const isInFavorite = true;

  const { showToast } = useToast();
  const handleAddToCart = async () => {
    const cartItem: CartItemType = {
      id: props.id,
      name: props.title,
      price: props.discountPrice || props.initialPrice,
      image: props.image,
      quantity: 1,
    };

    dispatch(addToCart({ id, item: cartItem }));

    setTimeout(() => {
      showToast(t('messages.add-to-cart'));
    }, 0);
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ id, itemId: props.id }));
    setTimeout(() => {
      showToast(t('messages.remove-from-cart'));
    }, 0);
  };

  const handleAddToFavorite = async () => {
    const favoriteItem: FavoriteItem = {
      id: props.id,
      name: props.title,
      price: props.discountPrice || props.initialPrice,
      image: props.image,
    };

    dispatch(addToFavorites({ id, item: favoriteItem }));

    setTimeout(() => {
      showToast(t('messages.add-to-favorite'));
    }, 0);
  };

  const handleRemoveFromFavorite = () => {
    dispatch(removeFromFavorites({ id, itemId: props.id }));
    setTimeout(() => {
      showToast(t('messages.remove-from-favorite'));
    }, 0);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ItemDetails', {
          ...props,
        });
      }}
      className="bg-white rounded-sm shadow-sm mx-1 my-1"
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: props.image }}
        className="w-full rounded-t-sm aspect-square"
      />
      <View className="p-2">
        <Text className="text-md line-clamp-1 text-black font-semibold mb-1">
          {props.title}
        </Text>

        <Text className="text-xl font-bold text-black">
          {props.discountPrice && formatPrice(props.discountPrice)}
        </Text>

        <View className="flex-row items-center space-x-2 mb-1">
          <Text className="text-xs text-gray-400 line-through mr-1">
            {props.discountPrice && formatPrice(props.initialPrice)}
          </Text>
          <Text className="text-xs text-red-500">
            {props.discountPrice
              ? `${Math.round(
                  100 - (props.discountPrice / props.initialPrice) * 100
                ).toFixed(0)}% OFF`
              : ''}
          </Text>
        </View>

        <View className="flex-row items-center">
          <View className="flex-1">
            <StarList
              rating={props.rating ? props.rating : 0}
              className="w-3 h-3"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="absolute left-1 top-1 rounded-full p-2 bg-white"
        onPress={isInFavorite ? handleRemoveFromFavorite : handleAddToFavorite}
      >
        <FontAwesomeIcon
          name={isInFavorite ? 'heart' : 'heart-o'}
          size={24}
          color={isInFavorite ? 'red' : ''}
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute right-0 bottom-0 rounded-full p-2"
        onPress={isInCart ? handleRemoveFromCart : handleAddToCart}
      >
        <Ionicons
          name={isInCart ? 'cart' : 'cart-outline'}
          size={30}
          color={isInCart ? '#03168f' : ''}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductItem;
