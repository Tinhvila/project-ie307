import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Animated,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
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

const brand = ['Pop Mart', 'The Monsters', 'Vinyl Toys', 'Collaborations'];
const tag = ['Hot Deal', 'Upcoming Events', 'New Arrival'];

const priceLabel = [
  { label: 'Giá tăng dần', value: 'asc' },
  { label: 'Giá giảm dần', value: 'desc' },
];

export default function Categories() {
  const { t } = useTranslation();
  const [allData, setAllData] = useState<ItemProps[]>([]);
  const [displayedData, setDisplayedData] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>('Pop Mart');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [priceSort, setPriceSort] = useState<string | null>('asc');
  const [isFocusPriceSort, setIsFocusPriceSort] = useState(false);
  const [ratingNumber, setRatingNumber] = useState<RatingCount[]>([]);
  const [ratingSelected, setRatingSelected] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([5, 1300]);

  const ITEMS_PER_PAGE = 8;

  const filterBoxTranslation = useRef(
    new Animated.Value(Dimensions.get('window').width)
  ).current;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await fetchProductData();
        setTimeout(() => {
          setAllData(data);
          handleSetRatingNumber(data);
          handleInitPriceRange(data);
          setDisplayedData(data.slice(0, ITEMS_PER_PAGE));
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const loadMoreItems = () => {
    if (loading || !hasMoreData) return;

    const currentLength = displayedData.length;
    const nextItems = allData.slice(
      currentLength,
      currentLength + ITEMS_PER_PAGE
    );

    if (nextItems.length === 0) {
      setHasMoreData(false);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setDisplayedData((prev) => [...prev, ...nextItems]);
      setLoading(false);
    }, 1000);
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isNearBottom) {
      loadMoreItems();
    }
  };

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
    Animated.timing(filterBoxTranslation, {
      toValue: isFilterVisible ? Dimensions.get('window').width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (loading && displayedData.length === 0) {
    return <SkeletonLoader />;
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

    setPriceRange([Math.floor(minPrice), Math.ceil(maxPrice)]);
  }

  function handleSetPriceRange(newValues: number[]): void {
    setPriceRange(newValues);
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between items-center overflow-x-hidden px-3 py-3">
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
              <Text className="text-normal font-medium mb-3">Brand</Text>
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
              <Text className="text-normal font-medium mb-3">Price</Text>

              <SliderPrice
                data={allData}
                priceRange={priceRange}
                onSetPriceRange={handleSetPriceRange}
              />
            </View>
            <View className="px-3 border-b-gray-200 border-b mt-3">
              <Text className="text-normal font-medium mb-3">Rating</Text>

              <Rating
                ratingNumber={ratingNumber}
                onSetRatingSelected={handleSetRatingSelected}
                ratingSelected={ratingSelected}
              />
            </View>
          </View>
        </View>
      </Animated.View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="flex-row flex mb-2 px-3"
      >
        <View className="flex flex-row gap-3 ">
          {tag.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTag(selectedTag !== item ? item : null)}
              className={` rounded-sm  flex-row justify-center border border-gray-200 items-center px-3 py-2 
                ${item === selectedTag ? 'bg-black' : 'bg-gray-50 '}`}
            >
              <Text
                className={`pb-2
                  ${item === selectedTag ? 'text-white' : 'text-black'}`}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View className="px-3 flex-row justify-end">
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={priceLabel}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={priceSort}
          onFocus={() => setIsFocusPriceSort(true)}
          onBlur={() => setIsFocusPriceSort(false)}
          onChange={(item) => {
            setPriceSort(item.value);
            setIsFocusPriceSort(false);
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-2"
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <View className="flex-row flex-wrap justify-between">
          {displayedData.map((item, index) => (
            <View className="w-[50%]" key={index}>
              <ProductItem props={item} />
            </View>
          ))}

          {loading && (
            <View className="w-full items-center py-4">
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          )}

          {!hasMoreData && (
            <View className="w-full items-center py-4">
              <Text className="text-gray-500">No more items to load</Text>
            </View>
          )}
        </View>
      </ScrollView>
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
