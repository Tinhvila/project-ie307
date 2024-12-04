import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { ItemProps } from '../types/types';
import { formatPrice } from '../utils/formatPrice';

interface Props {
  data: ItemProps[];
  priceRange: number[];
  onSetPriceRange: (values: number[]) => void;
}

const PriceSlider: React.FC<Props> = ({
  data,
  priceRange,
  onSetPriceRange,
}) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [values, setValues] = useState<number[]>([minPrice, maxPrice]);

  useEffect(() => {
    if (data.length > 0) {
      const prices = data.map((product) => product.discountPrice);
      setMinPrice(Math.floor(Math.min(...prices)));
      setMaxPrice(Math.ceil(Math.max(...prices)));
    }
  }, [data]);

  useEffect(() => {
    setValues(priceRange.map((value) => Math.round(value)));
  }, [priceRange]);

  const handleValuesChange = (newValues: number[]) => {
    setValues(newValues);
  };

  const handleValuesChangeFinish = (newValues: number[]) => {
    setValues(newValues);
    onSetPriceRange(newValues);
  };

  return (
    <View className="box-border border-gray-300 items-center w-full">
      <View className="flex-row justify-between w-[100%]">
        <Text className="text-[#21243d] text-xs font-semibold">
          {formatPrice(values[0])}
        </Text>
        <Text className="text-[#21243d] text-xs font-semibold">
          {formatPrice(values[1])}
        </Text>
      </View>
      <View className="w-full items-center">
        <MultiSlider
          values={values}
          min={minPrice}
          max={maxPrice}
          step={1000}
          onValuesChange={handleValuesChange}
          onValuesChangeFinish={handleValuesChangeFinish}
          sliderLength={260}
          customMarker={() => (
            <View
              className="w-6 h-6 bg-white border border-gray-300 rounded-full shadow-md"
              style={{
                shadowColor: '#252c61',
                shadowOpacity: 0.15,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 4 },
              }}
            />
          )}
          selectedStyle={{ backgroundColor: 'black' }}
          unselectedStyle={{ backgroundColor: 'rgba(65, 66, 71, 0.08)' }}
          trackStyle={{ height: 4 }}
        />
      </View>
    </View>
  );
};

export default PriceSlider;
