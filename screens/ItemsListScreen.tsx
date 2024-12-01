import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ItemProps } from '../types/types'
import ProductItem from '../components/ProductItem'
import { useTranslation } from 'react-i18next'
import { ItemsListScreenRouteProp } from '../types/navigation'
import { useNavigation } from '@react-navigation/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export default function ItemsListScreen({ route }: { route: ItemsListScreenRouteProp }) {
  const { t } = useTranslation();
  const ITEMS_PER_PAGE = 8;
  const { title, data } = route.params;
  const navigation = useNavigation();
  const [allData, setAllData] = React.useState<ItemProps[]>(data);
  const [loading, setLoading] = React.useState(false);
  const [displayedData, setDisplayedData] = React.useState<ItemProps[]>(data.slice(0, ITEMS_PER_PAGE));
  const [hasMoreData, setHasMoreData] = React.useState(true);

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
    }, 500);
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isNearBottom) {
      loadMoreItems();
    }
  };

  return (
    <SafeAreaView>
      <View className={'flex flex-row items-center'}>
        <TouchableOpacity
          className={'pl-4'}
          onPress={() => navigation.goBack()}
        >
          <AntDesignIcon name={'left'} size={32} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black px-4 py-3">
          {title ? title : 'Item List Screen'}
        </Text>
      </View>
      {/* Display items here with map */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-2"
        onScroll={handleScroll}>
        <View className="flex-row flex-wrap justify-between">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}