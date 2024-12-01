import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import StarList from '../components/StarList';
import { ItemDetailsScreenRouteProp } from '../types/navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { formatPrice } from '../utils/formatPrice';

export default function ItemDetails({
  route,
}: {
  route: ItemDetailsScreenRouteProp;
}) {
  const { t } = useTranslation();
  const { id, image, title, description, rating, initialPrice, discountPrice } =
    route.params;
  const navigation = useNavigation();
  // Add or remove favorite item
  const [favorite, setFavorite] = React.useState(false);

  // Justify item
  const [countItem, setCountItem] = React.useState(1);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Function to start rapidly increase or decrease count item
  const startCountItemInterval = (type: 'increase' | 'decrease') => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (type === 'increase') setCountItem((prev) => prev + 1);
      else setCountItem((prev) => (prev > 1 ? prev - 1 : prev));
    }, 100);
  };

  // Function to stop the interval increment or decrement
  const stopCountItemInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Navigation Icon dominant color

  const [dominantColor, setDominantColor] = React.useState(null);

  return (
    <ScrollView className="w-full ">
      <View className="w-full ">
        {image && (
          <Image
            src={image}
            alt={`Source: ${image}`}
            className={'bg-contain w-full aspect-square'}
          />
        )}
        <TouchableOpacity
          className={'absolute left-5 top-12 bg-white p-1 rounded-[100%]'}
          onPress={() => navigation.goBack()}
        >
          <AntDesignIcon name={'left'} size={20} />
        </TouchableOpacity>
      </View>
      <View className={' w-full p-2 box-border flex-col gap-2'}>
        <View className={'flex-row justify-between'}>
          <Text className={'font-bold w-[90%] text-2xl'}>{title}</Text>

          <TouchableOpacity
            className="w-fit"
            onPress={() => setFavorite((prev) => !prev)}
          >
            <FontAwesomeIcon
              name={favorite ? 'heart' : 'heart-o'}
              size={24}
              color={favorite ? 'red' : ''}
            />
          </TouchableOpacity>
        </View>
        <View className={'flex flex-row items-center'}>
          <Text
            className={`font-bold text-2xl ${discountPrice ? 'text-green-600' : 'text-black'
              }`}
          >
            {discountPrice ? formatPrice(discountPrice) : formatPrice(initialPrice)}
          </Text>
          {discountPrice && (
            <>
              <Text className={'ml-2 line-through text-gray-500'}>
                {formatPrice(initialPrice)}
              </Text>
              <Text className={'ml-2 color-white bg-red-500 p-2 rounded-md'}>
                {Math.round(100 - (discountPrice / initialPrice) * 100).toFixed(
                  0
                )}
                %
              </Text>
            </>
          )}
        </View>
        <View className={'flex flex-row items-center justify-between my-5'}>
          <View className={'flex flex-row'}>
            <StarList rating={rating ? rating : 0} />
            <Text className={'ml-3 text-gray-700 text-lg'}>
              ({rating ? rating.toFixed(1) : 0})
            </Text>
          </View>
          <View className={'flex-row items-center justify-center'}>
            <TouchableOpacity
              onPress={() =>
                setCountItem((prev) => (prev === 1 ? prev : prev - 1))
              }
              onPressIn={() => startCountItemInterval('decrease')}
              onPressOut={stopCountItemInterval}
              disabled={countItem <= 1 ? true : false}
            >
              <FontAwesomeIcon
                name="minus"
                size={24}
                color={countItem === 1 ? 'gray' : 'black'}
              />
            </TouchableOpacity>
            <Text className={'mx-5 px-5 py-1 border-2 rounded-md text-center'}>
              {countItem}
            </Text>
            <TouchableOpacity
              onPress={() => setCountItem((prev) => prev + 1)}
              onPressIn={() => startCountItemInterval('increase')}
              onPressOut={stopCountItemInterval}
            >
              <FontAwesomeIcon name="plus" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          className={
            'bg-black p-3 rounded-sm items-center flex-row justify-center'
          }
        >
          <FontAwesome5Icon name="shopping-cart" size={24} color={'white'} />
          <Text className={'ml-1 text-white font-bold'}>
            {t('item_detail.buynow_button')}
          </Text>
        </TouchableOpacity>
        <View>
          <Text className={'font-medium text-xl'}>
            {t('item_detail.description')}
          </Text>
          <Text className={'text-justify'}>{description}</Text>
        </View>
        <View
          className={
            'flex flex-row items-center justify-between bg-blue-200 p-3 my-3 rounded-sm'
          }
        >
          <View className={'flex-row justifiy-center items-center'}>
            <FontAwesome5Icon name="location-arrow" size={24} />
            <Text className={'ml-1'}>Deliver to</Text>
          </View>
          <View className={'flex-row justifiy-center items-center'}>
            <FontAwesome5Icon name="truck" size={24} />
            <Text className={'ml-1'}>
              {t('item_detail.delivery_option.free_delivery')}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
