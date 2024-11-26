import { View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProp } from '../types/navigation';
import CustomCarousel from '../components/CustomCarousel';
import ProductItem from '../components/ProductItem';
import ListView from '../components/ListView';

const data = [
  { id: 1, image: 'https://i.imgur.com/CzXTtJV.jpg' },
  { id: 2, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' },
  { id: 3, image: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg' },
  { id: 4, image: 'https://farm4.staticflickr.com/3224/3081748027_0ee3d59fea_z_d.jpg' },
];

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const CarouselItem = ({ item }: { item: any }) => {

  return (
    <View>
      <Image
        source={{ uri: item.image }}
        style={{ width: windowWidth, height: 208 }}
      />
    </View >
  );

};

export default function Home() {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <SafeAreaView className="flex flex-1">
      <Text className="text-xl font-bold text-black px-4 py-3">{t('main.home')}</Text>
      <ScrollView>
        {/* <TouchableOpacity
        className={'p-3 border-black border-2 rounded-lg'}
        onPress={() => {
          navigation.navigate('ItemDetails', {
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
            title: 'Classic Watch',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            rating: 3,
            initialPrice: 399.99,
            discountPrice: 299.99
          });
        }}
      >
        <Text>Navigate to Item Details</Text>
      </TouchableOpacity> */}
        <Text className={'text-xl font-bold text-orange-500 px-4 py-3'}>Check out our latest product!</Text>
        <View className={'h-64'}>
          <CustomCarousel data={data} render={({ item }) => <CarouselItem item={item} />} />
        </View>
        <ListView title={'Hot Deals'} data={[]} />
        <ListView title={'Upcoming Event'} data={[]} />
        <ListView title={'New Arrival'} data={[]} />
      </ScrollView>
    </SafeAreaView>
  );
}
