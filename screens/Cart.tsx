import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React from 'react';
import Checkout from '../components/Checkout';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

import { AuthenticationContext } from '../context/context';
import CartItem from '../components/CartItem';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import OverlayLoading from '../components/OverlayLoading';
import { useToast } from '../components/toastContext';

import { useNavigation } from '@react-navigation/native';

export default function Cart() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = React.useContext(AuthenticationContext);
  const { items: cartItems, loading } = useSelector(
    (state: RootState) => state.cart
  );
  const navigation = useNavigation();
  const { showToast } = useToast();
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (item.price || 0) * item.quantity,
      0
    );
  };

  function handleClearCart() {
    Alert.alert(t('alert.confirm'), t('alert.clear-cart'), [
      {
        text: t('alert.no'),
        onPress: () => console.log('Hủy bỏ'),
      },
      {
        text: t('alert.yes'),
        onPress: () => {
          dispatch(clearCart(id));
          showToast(t('messages.clear-cart'));
        },
      },
    ]);
  }

  return (
    <SafeAreaView className="flex-1">
      <OverlayLoading loading={loading} />
      {cartItems?.length > 0 ? (
        <>
          <TouchableOpacity
            onPress={handleClearCart}
            className={`my-4 rounded-md ml-auto mx-4 w-1/2 border-b border-2 border-black items-center
                   bg-black `}
          >
            <Text
              className={`px-4 py-2  text-base font-medium
                    text-white`}
            >
              {t('cart.clear-cart')}
            </Text>
          </TouchableOpacity>
          <ScrollView className="px-2 flex flex-col gap-2">
            {cartItems.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </ScrollView>
          <Checkout subtotal={calculateSubtotal()} />
        </>
      ) : (
        <View className=" flex flex-col justify-start items-center ">
          <Image
            source={require('../assets/image/8062127.webp')}
            className="w-48 h-48"
          />
          <Text>{t('cart.cart-empty-message')}</Text>
          <View className="px-3 border-b-gray-200 w-[50%]  mt-3">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomeStack');
              }}
              className={`mt-2 rounded-md border-2 border-black items-center
                  bg-black `}
            >
              <Text
                className={`px-4 py-2 text-base font-medium
                   text-white`}
              >
                Back to home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
