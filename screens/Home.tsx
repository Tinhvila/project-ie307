import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Pressable,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import {
  HomeStackNavigationParamList,
  ItemDetailsNavigationProp,
} from '../types/navigation';
import CustomCarousel from '../components/CustomCarousel';
import ListView from '../components/ListView';
import fetchProductData from '../api/fetchProductData';
import { ItemProps } from '../types/types';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { AuthenticationContext } from '../context/context';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../redux/cartSlice';
import OverlayLoading from '../components/OverlayLoading';
import { useSelector } from 'react-redux';
import { fetchFavorites } from '../redux/favoriteSlice';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const CarouselItem = ({ item }: { item: any }) => {
  return (
    <View>
      <Image
        source={{ uri: item.image }}
        style={{ width: windowWidth, height: 208 }}
      />
    </View>
  );
};

export default function Home() {
  const { t } = useTranslation();
  const { userData } = React.useContext(AuthenticationContext);
  const navigation = useNavigation<
    HomeStackNavigationParamList & ItemDetailsNavigationProp
  >();
  const [profilePress, setProfilePress] = React.useState<boolean>(false);
  const [carouselData, setCarouselData] = React.useState<ItemProps[]>([]);
  const [hotDealData, setHotDealData] = React.useState<ItemProps[]>([]);
  const [eventData, setEventData] = React.useState<ItemProps[]>([]);
  const [newArrivalData, setNewArrivalData] = React.useState<ItemProps[]>([]);
  const [loading, setLoading] = React.useState(true);
  const ITEMS_PER_CAROUSEL = 5;
  const ITEMS_PER_LIST = 8;
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useContext(AuthenticationContext);
  const { loading: loadingSync } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCart(id));
      dispatch(fetchFavorites(id));
    }
  }, []);

  React.useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const { data } = await fetchProductData();
        // Set some carousel data only
        setCarouselData(
          data.filter(() => Math.random() > 0.5).slice(0, ITEMS_PER_CAROUSEL)
        );
        // Slice data to two categories: Hot Deals, New Arrival and Upcoming Event
        // Hot Deals
        setHotDealData(data.filter((item) => item.isHotDeal));
        // New Arrival
        setNewArrivalData(data.filter((item) => item.isNewProduct));
        // Upcoming Event with random
        setEventData(data.filter(() => Math.random() > 0.5));
        setLoading(false);
      } catch (error) {
        console.log('Error fetcing products:', error);
      }
    };

    fetchAllProduct();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1">
        {/* Home Section */}
        <OverlayLoading loading={loadingSync} />
        <View className={'justify-between items-center flex-row '}>
          <Text className="text-xl font-bold text-black px-2 py-3">
            {t('main.home')}
          </Text>
          <Pressable
            className={`mr-2 w-10 h-10 rounded-[100%] items-center justify-center ${profilePress ? 'bg-gray-500' : 'bg-gray-300'
              }`}
            onPressIn={() => setProfilePress(true)}
            onPressOut={() => setProfilePress(false)}
            onPress={() => navigation.navigate('ProfileStack')}
          >
            <Text className={'font-bold text-2xl'}>
              {userData.username.at(0)?.toUpperCase()}
            </Text>
          </Pressable>
        </View>
        {/* Search Section */}
        <View className={'mx-2 my-4'}>
          <AntDesignIcon
            name="search1"
            size={20}
            className={'absolute top-2 left-4'}
          />
          <Text
            className={
              'text-gray-400 border-gray-500 border-2 rounded-3xl pl-12 pr-4 py-2'
            }
            onPress={() => navigation.navigate('SearchStack')}
          >
            {t('search.search-placeholder')}
          </Text>
        </View>
        {/* Item Section */}
        <ScrollView className={'flex-1'}>
          <Text className={'text-2xl font-bold text-orange-500 px-4 py-3'}>
            {t('home.check-out')}
          </Text>
          <View className={'h-64'}>
            <CustomCarousel
              data={carouselData}
              render={({ item }) => <CarouselItem item={item} />}
            />
          </View>
          <ListView
            title={t('home.hot-deals')}
            data={hotDealData}
            limitDisplay={ITEMS_PER_LIST}
            idValue={1}
          />
          <ListView
            title={t('home.upcoming-event')}
            data={eventData}
            limitDisplay={ITEMS_PER_LIST}
            idValue={2}
          />
          <ListView
            title={t('home.new-arrival')}
            data={newArrivalData}
            limitDisplay={ITEMS_PER_LIST}
            idValue={3}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
