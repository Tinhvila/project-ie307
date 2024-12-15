import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { formatPrice } from '../utils/formatPrice';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { RadioButton } from 'react-native-paper';
import { AuthenticationContext } from '../context/context';
import axios from 'axios';
import { FETCH_USER_API } from '../api/fetchIp';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
const apiBaseUrl = FETCH_USER_API;
const Payment = () => {
  const navigation = useNavigation();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { id, userData } = React.useContext(AuthenticationContext);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [name, setName] = useState(
    userData.firstName + ' ' + userData.lastName
  );
  const [phone, setPhone] = useState(userData.phoneNumber);
  const [address, setAddress] = useState(userData.address);

  // Credit Card State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (item.price || 0) * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const shippingFee = 30000;
  const vatRate = 0.08;
  const vatAmount = subtotal * vatRate;
  const total = subtotal + shippingFee + vatAmount;

  // Validation Functions
  const validateCardNumber = (number: string) => {
    // Remove spaces and dashes
    const cleanNumber = number.replace(/[\s-]/g, '');
    // Basic validation: 13-19 digits
    return /^\d{13,19}$/.test(cleanNumber);
  };

  const validateExpiryDate = (date: string) => {
    // MM/YY format
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(date)) return false;

    const [month, year] = date.split('/').map(Number);
    const currentDate = new Date();
    const expiry = new Date(2000 + year, month - 1);

    return expiry > currentDate;
  };

  const validateCVV = (cvvCode: string) => {
    // 3-4 digit CVV
    return /^\d{3,4}$/.test(cvvCode);
  };

  const handlePlaceOrder = async () => {
    // Validation checks
    if (!name || !phone || !address || !paymentMethod) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Credit card validation (if applicable)
    if (paymentMethod === 'credit') {
      if (!validateCardNumber(cardNumber)) {
        Alert.alert('Error', 'Invalid card number');
        return;
      }
      if (!validateExpiryDate(expiryDate)) {
        Alert.alert('Error', 'Invalid expiry date');
        return;
      }
      if (!validateCVV(cvv)) {
        Alert.alert('Error', 'Invalid CVV');
        return;
      }
    }

    // Prepare order object
    const newOrder = {
      items: cartItems,
      total,
      paymentMethod,
      shippingDetails: {
        name,
        phone,
        address,
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...(paymentMethod === 'credit' && {
        creditCardDetails: {
          cardName,
          cardNumberMasked: cardNumber
            .slice(-4)
            .padStart(cardNumber.length, '*'),
        },
      }),
    };

    try {
      const userResponse = await axios.get(`${apiBaseUrl}/${id}`);

      const userData = userResponse.data;

      const updatedOrders = [...(userData.order || []), newOrder];

      await axios.patch(`${apiBaseUrl}/${id}`, {
        order: updatedOrders,
        cart: [],
      });

      //navigation.goBack();
      dispatch(clearCart(id));
      navigation.dispatch(
        CommonActions.reset({
          index: 1, // Set index to point to the second route (Order screen in ProfileStack)
          routes: [
            { name: 'CartStack', params: { screen: 'Cart' } }, // Reset CartStack to Cart
            { name: 'ProfileStack', params: { screen: 'Order' } }, // Navigate to Order
          ],
        })
      );
      // 4. Show success message and navigate
      Alert.alert('Order Placed', 'Your order has been successfully placed!', [
        {
          text: 'OK',
          // onPress: () => {
          //   navigation.dispatch(
          //     CommonActions.reset({
          //       routes: [
          //         { name: 'ProfileStack' },
          //         { name: 'Order' }, // Specify the screen you want to navigate to
          //       ],
          //     })
          //   );
          //   // navigation.navigate('Order');
          // },
        },
      ]);

      // 3. Clear local cart state
    } catch (error) {
      console.error('Order placement error:', error);
      Alert.alert('Error', 'Failed to place order. Please try again.', [
        { text: 'OK' },
      ]);
    }
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');

    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');

    setCardNumber(formatted);
  };

  const formatExpiryDate = (text: string) => {
    let formatted = text.replace(/\D/g, '');

    if (formatted.length > 2) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
    }

    setExpiryDate(formatted);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 py-6">
        <Text className="text-2xl font-bold mb-6">Payment</Text>

        {/* Shipping Information - Previous code remains the same */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-4">
            Shipping Information
          </Text>
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-lg px-4 py-2 mb-3"
          />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            className="border border-gray-300 rounded-lg px-4 py-2 mb-3"
          />
          <TextInput
            placeholder="Shipping Address"
            value={address}
            onChangeText={setAddress}
            multiline
            className="border border-gray-300 rounded-lg px-4 py-2 h-20"
          />
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-4">Payment Method</Text>
          <View className="flex-row items-center mb-3">
            <View className="rounded-full border-2 border-gray-100 mr-4">
              <RadioButton
                value="cod"
                status={paymentMethod === 'cod' ? 'checked' : 'unchecked'}
                onPress={() => setPaymentMethod('cod')}
              />
            </View>
            <Text>Cash on Delivery (COD)</Text>
          </View>
          <View className="flex-row items-center">
            <View className="rounded-full border-2 border-gray-100 mr-4">
              <RadioButton
                value="credit"
                status={paymentMethod === 'credit' ? 'checked' : 'unchecked'}
                onPress={() => setPaymentMethod('credit')}
              />
            </View>
            <Text>Credit Card</Text>
          </View>
        </View>

        {paymentMethod === 'credit' && (
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4">
              Credit Card Details
            </Text>
            <TextInput
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={formatCardNumber}
              keyboardType="number-pad"
              maxLength={19}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-3"
            />
            <TextInput
              placeholder="Name on Card"
              value={cardName}
              onChangeText={setCardName}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-3"
            />
            <View className="flex-row justify-between">
              <TextInput
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={formatExpiryDate}
                keyboardType="number-pad"
                maxLength={5}
                className="border border-gray-300 rounded-lg px-4 py-2 mb-3 w-[48%]"
              />
              <TextInput
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
                className="border border-gray-300 rounded-lg px-4 py-2 mb-3 w-[48%]"
              />
            </View>
          </View>
        )}

        <View className="bg-gray-100 rounded-lg p-4">
          <Text className="text-lg font-semibold mb-4">Order Summary</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Subtotal</Text>
            <Text className="font-semibold">{formatPrice(subtotal)}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Shipping Fee</Text>
            <Text className="font-semibold">{formatPrice(shippingFee)}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">VAT (8%)</Text>
            <Text className="font-semibold">{formatPrice(vatAmount)}</Text>
          </View>
          <View className="border-t border-gray-300 pt-2 mt-2 flex-row justify-between">
            <Text className="text-lg font-bold">Total</Text>
            <Text className="text-lg font-bold text-red-500">
              {formatPrice(total)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-black rounded-lg py-4 items-center mt-6"
          onPress={handlePlaceOrder}
        >
          <Text className="text-white text-base font-bold">Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
