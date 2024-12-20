import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import ProductItem from '../components/ProductItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { ItemProps } from '../types/types';
import fetchProductData from '../api/fetchProductData';
import Icon from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import SkeletonLoader from '../components/SkeletonCategories';
import Rating from '../components/Rating';
import { RatingCount } from '../types/rating.type';
import SliderPrice from '../components/SliderPrice';
import SkeletonProductGrid from '../components/SkeletonProductGrid';
import { useFocusEffect } from '@react-navigation/native';
import OverlayLoading from '../components/OverlayLoading';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const brand = ['Pop Mart', 'The Monsters', 'Vinyl Toys', 'Collaborations'];

export default function Categories({ route }: { route: any }) {
  const { t } = useTranslation();
  const [dataDisplay, setDataDisplay] = useState<ItemProps[]>([]);
  const [data, setData] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const [priceSort, setPriceSort] = useState<string | null>(null);
  const [isFocusPriceSort, setIsFocusPriceSort] = useState(false);
  const [ratingNumber, setRatingNumber] = useState<RatingCount[]>([]);
  const [ratingSelected, setRatingSelected] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([]);

  const tag = [
    { label: t('categories.hot-deals'), value: 1 },
    { label: t('categories.upcoming-event'), value: 2 },
    { label: t('categories.new-arrival'), value: 3 },
  ];

  const priceLabel = [
    { label: t('categories.sort-by-price-ascending'), value: 'asc' },
    { label: t('categories.sort-by-price-descending'), value: 'desc' },
  ];

  const [filteredProducts, setFilteredProducts] = useState<ItemProps[]>([]);
  const [visibleProductCount, setVisibleProductCount] = useState(20);
  const { loading: loadingSync } = useSelector(
    (state: RootState) => state.cart
  );
  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleProductCount),
    [filteredProducts, visibleProductCount]
  );

  useEffect(() => {
    setSelectedTag(route.params?.value || null);
  }, [route.params]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSelectedTag(null);
      };
    }, [])
  );

  const filterBoxTranslation = useRef(
    new Animated.Value(Dimensions.get('window').width)
  ).current;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await fetchProductData();
        setDataDisplay(data);
        setData(data);
        handleSetRatingNumber(data);
        handleInitPriceRange(data);
        setIsFirstLoad(false);
      } catch (error) {
        setIsFirstLoad(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProductsParams = async () => {
      const params = {
        brandSelected: selectedBrand || null,
        priceSort: priceSort || null,
        tag: selectedTag || null,
        ratingFilter: ratingSelected,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };

      setIsFilterChanged(true);

      try {
        const { data } = await fetchProductData(params);
        setTimeout(() => {
          setDataDisplay(data);
          setVisibleProductCount(10);
          setFilteredProducts(data);
          setLoading(false);
          setIsFilterChanged(false);
        }, 200);
      } catch (error) {
        setLoading(false);
        setIsFilterChanged(false);
      }
    };

    fetchProductsParams();
  }, [selectedBrand, priceSort, selectedTag, ratingSelected, priceRange]);

  const toggleFilter = () => {
    setIsFilterVisible((isFilterVisible) => !isFilterVisible);
    Animated.timing(filterBoxTranslation, {
      toValue: isFilterVisible ? Dimensions.get('window').width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (isFirstLoad) {
    return <SkeletonLoader />;
  }

  function resetFilter() {
    setSelectedBrand(null);
    setSelectedTag(null);
    setRatingSelected([]);
    setPriceSort(null);
    handleInitPriceRange(data);
  }

  function handleSetRatingNumber(data: ItemProps[]): void {
    const ratingList: any = [
      { stars: 1, count: 0 },
      { stars: 2, count: 0 },
      { stars: 3, count: 0 },
      { stars: 4, count: 0 },
      { stars: 5, count: 0 },
    ];

    data.forEach((product) => {
      const rating = product.rating;

      if (rating >= 1 && rating <= 5) {
        ratingList[rating - 1].count += 1;
      }
    });

    setRatingNumber(ratingList);
  }

  function handleSetRatingSelected(rating: number): void {
    setRatingSelected((current) =>
      current.includes(rating)
        ? current.filter((r) => r !== rating)
        : [...current, rating]
    );
  }
  function handleInitPriceRange(data: ItemProps[]): void {
    const { minPrice, maxPrice } = data.reduce(
      (acc, product) => ({
        minPrice: Math.min(acc.minPrice, product.discountPrice),
        maxPrice: Math.max(acc.maxPrice, product.discountPrice),
      }),
      { minPrice: Infinity, maxPrice: -Infinity }
    );
    const newInitPriceRange = [Math.floor(minPrice), Math.ceil(maxPrice)];

    setPriceRange(newInitPriceRange);
  }

  function handleSetPriceRange(newValues: number[]): void {
    setPriceRange(newValues);
  }
  return (
    <SafeAreaView className="flex-1">
      <OverlayLoading loading={loadingSync} />
      <View className="flex-row justify-between items-center overflow-x-hidden px-2 py-3">
        <Text className="text-xl font-bold text-black">
          {t('main.categories')}
        </Text>
        <TouchableOpacity onPress={toggleFilter}>
          <Icon name="filter" color="black" size={24} />
        </TouchableOpacity>
      </View>

      {/* Overlay */}
      {isFilterVisible && (
        <TouchableOpacity
          className="absolute inset-0 bg-black/50 z-10"
          onPress={toggleFilter}
          activeOpacity={1}
        />
      )}

      {/* Filter Box */}
      <Animated.View
        style={{
          transform: [{ translateX: filterBoxTranslation }],
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '75%',
          backgroundColor: 'white',
          zIndex: 20,
          shadowColor: '#000',
          shadowOffset: { width: -2, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View className=" ">
          <View className="flex-row px-3 pt-10  pb-2 justify-between bg-gray-200 items-center">
            <Text className="text-lg font-bold">Filters</Text>
            <TouchableOpacity onPress={toggleFilter}>
              <Icon name="close" color="black" size={24} />
            </TouchableOpacity>
          </View>
          <View>
            <View className="px-3 border-b-gray-200 border-b mt-3">
              <Text className="text-normal font-medium mb-3">
                {t('categories.brand')}
              </Text>
              <View className="flex flex-row flex-wrap gap-3 mb-3">
                {brand.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() =>
                      setSelectedBrand(selectedBrand !== item ? item : null)
                    }
                    className={` rounded-sm  flex-row  justify-center items-center p-[9px] 
                ${item === selectedBrand ? 'bg-black' : 'bg-gray-200'}`}
                  >
                    <Text
                      className={`
                  ${item === selectedBrand ? 'text-white' : 'text-black'}`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View className="px-3 border-b-gray-200 border-b mt-3">
              <Text className="text-normal font-medium mb-3">
                {t('categories.price')}
              </Text>

              <SliderPrice
                data={data}
                priceRange={priceRange}
                handleSetPriceRange={handleSetPriceRange}
              />
            </View>
            <View className="px-3 border-b-gray-200 border-b mt-3">
              <Text className="text-normal font-medium mb-3">
                {t('categories.rating')}
              </Text>

              <Rating
                ratingNumber={ratingNumber}
                onSetRatingSelected={handleSetRatingSelected}
                ratingSelected={ratingSelected}
              />
            </View>

            <View className="px-3 border-b-gray-200  mt-3">
              <TouchableOpacity
                onPress={resetFilter}
                className={`mt-2 rounded-md border-2 border-black items-center
           bg-black `}
              >
                <Text
                  className={`px-4 py-2 text-base font-medium
            text-white`}
                >
                  {t('button.reset-filter')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>

      <View className="flex-row flex mb-2 px-2">
        <View className="flex flex-row gap-3 ">
          {tag.map((item, index) => (
            <Pressable
              key={index}
              onPress={() =>
                setSelectedTag(selectedTag !== item.value ? item.value : null)
              }
              className={` rounded-sm  flex-row justify-center border border-gray-200  items-center px-3 py-2 
                ${item.value === selectedTag ? 'bg-black' : 'bg-gray-50 '}`}
            >
              <Text
                className={`  
                  ${item.value === selectedTag ? 'text-white' : 'text-black'}`}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View className="px-3 flex-row justify-end mb-1">
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={priceLabel}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={t('categories.sort-by-price')}
          value={priceSort}
          onFocus={() => setIsFocusPriceSort(true)}
          onBlur={() => setIsFocusPriceSort(false)}
          onChange={(item) => {
            setPriceSort(item.value);
            setIsFocusPriceSort(false);
          }}
        />
      </View>

      {isFilterChanged ? (
        <SkeletonProductGrid />
      ) : visibleProducts.length ? (
        <FlatList
          data={visibleProducts}
          numColumns={2}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={21}
          renderItem={({ item }) => (
            <View className="w-[50%]">
              <ProductItem props={item} />
            </View>
          )}
          onEndReached={() => {
            if (visibleProductCount < filteredProducts.length) {
              setVisibleProductCount((prev) =>
                Math.min(prev + 10, filteredProducts.length)
              );
            }
          }}
        />
      ) : (
        <View className=" flex flex-col justify-start items-center ">
          <Image
            source={require('../assets/image/8062127.webp')}
            className="w-48 h-48"
          />
          <Text>{t('categories.empty-message')}</Text>

          <View className="px-3 border-b-gray-200 w-[50%] mt-3">
            <TouchableOpacity
              onPress={resetFilter}
              className={`mt-2 rounded-md border-2 border-black items-center
           bg-black `}
            >
              <Text
                className={`px-4 py-2 text-base font-medium
            text-white`}
              >
                {t('button.reset-filter')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: '35%',
    height: 30,
    borderColor: 'gray',
    borderBottomWidth: 0.5,
    paddingHorizontal: 4,
    backgroundColor: '#fafafa',
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
