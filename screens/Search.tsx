import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthenticationContext } from '../context/context';
import fetchUser, { patchUser } from '../api/fetchUser';
import fetchProductData from '../api/fetchProductData';
import { SearchStackNavigationProp } from '../types/navigation';
import { SearchHistory } from '../types/types';
import { useDebounce } from 'use-debounce';


export default function Search() {
  const { t } = useTranslation();
  const navigation = useNavigation<SearchStackNavigationProp>();
  const textInputRef = React.useRef<null | any>();
  const { id: userId } = React.useContext(AuthenticationContext);
  const [searchText, setSearchText] = React.useState('');
  const [loadSearch, setLoadSearch] = React.useState(true);
  const [searchData, setSearchData] = React.useState<SearchHistory[]>([]);
  const [historyData, setHistoryData] = React.useState<SearchHistory[]>([]);

  const [debouncedSearchText] = useDebounce(searchText, 500);

  const normalizeString = (str: string) => {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus(); // Automatically focus the search bar
        }
      }, 100);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  // History Data
  const loadHistoryData = async () => {
    const params = { id: userId };
    const historyDataResult = await fetchUser(params);
    if (historyDataResult && historyDataResult.length > 0) {
      const historyData = historyDataResult[0].searchHistory;

      if (searchText !== '') {
        // When searchText has a value, filter history data
        const filteredHistoryData = historyData?.filter((value) =>
          value.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setHistoryData(filteredHistoryData || []);
      } else {
        // When searchText is empty, use the full history data
        setHistoryData(historyData || []);
      }
    }
  };

  React.useEffect(() => {
    const filterSearch = async () => {
      const filteredSearchText = normalizeString(debouncedSearchText.toLowerCase());
      const params = { filterTitle: filteredSearchText };
      const resultData = await fetchProductData(params);
      console.log(filteredSearchText);
      // Search Data
      if (resultData.data && resultData.data.length > 0) {
        let searchData = [] as SearchHistory[];
        resultData.data.forEach((element) => {
          const normalizeedTitle = normalizeString(element.title.toLowerCase());

          if (normalizeedTitle.includes(filteredSearchText)) {
            searchData.push({ title: element.title, id: element.id });
          }
        });
        setSearchData(searchData ? searchData : []);
      }
      else {
        setSearchData([]);
      }
    };

    loadHistoryData();
    filterSearch();
    if (debouncedSearchText) {
      filterSearch();
    }
  }, [debouncedSearchText]); // Runs whenever searchText changes

  // Handle the filter search
  const handleFilterSearch = async () => {
    // Patch the search history to the history
    const params = { id: userId };
    // Get the history data from the user first
    const userData = await fetchUser(params);
    if (userData && userData.length > 0) {
      const currentSearchHistory = userData[0].searchHistory || [];

      // Check if searchText exists in the titles of searchHistory using some()
      const updatedSearchHistory = currentSearchHistory.some((entry) => entry.title === searchText)
        ? currentSearchHistory
        : [...currentSearchHistory, { title: searchText }];

      // Patch the updated search history
      const result = await patchUser(String(userId), {
        searchHistory: updatedSearchHistory,
      });
      navigation.navigate('ItemsListScreen', { value: searchText });
    }
  }

  // Handle the value search
  const handleValueSearch = async (value: string, id?: string) => {
    // Patch the search history to the history
    const params = { id: userId };
    // Get the history data from the user first
    const userData = await fetchUser(params);
    if (userData && userData.length > 0) {
      const currentSearchHistory = userData[0].searchHistory || [];

      const updatedSearchHistory = currentSearchHistory.some(
        (entry) => entry.title === value || entry.id === id
      )
        ? currentSearchHistory
        : [...currentSearchHistory, { title: value, id }];

      const result = await patchUser(String(userId), {
        searchHistory: updatedSearchHistory,
      });
    }
    navigation.navigate('ItemsListScreen', { value, id });
  }

  const handleDeleteHistory = async (value: string) => {
    const params = { id: userId };

    const userData = await fetchUser(params);
    if (userData && userData.length > 0) {
      const updatedSearchHistory = userData[0].searchHistory?.filter((element) => element.title !== value);
      const result = await patchUser(String(userId), {
        searchHistory: updatedSearchHistory,
      });
    }

    await loadHistoryData();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className={'flex-1'}>
        <SafeAreaView>
          <View className={'bg-slate-200 justify-center py-5 px-3'}>
            <TextInput
              className={'border-gray-500 border-2 rounded-3xl pl-12 pr-4 py-2'}
              placeholder='Search item, product, categories...'
              ref={textInputRef}
              returnKeyType='search'
              onSubmitEditing={handleFilterSearch}
              enablesReturnKeyAutomatically
              value={searchText}
              onChangeText={(text) => { setSearchText(text) }}
            />
            <TouchableOpacity className={'absolute left-8'} onPress={handleFilterSearch}>
              <AntDesignIcon name='search1' size={20} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {historyData.slice(0, 20).slice().reverse().map((value, index) => (
              <TouchableOpacity
                onPress={() => handleValueSearch(value.title, value.id)}
                key={index}
                className={'flex-row items-center gap-3 p-5 border-b-black border-b'}
              >
                <MaterialIcons name={'history'} size={24} />
                <Text className={'text-xl line-clamp-1 pr-5'}>{value.title}</Text>
                <TouchableOpacity
                  onPress={() => handleDeleteHistory(value.title)}
                  className={'absolute right-0 bg-gray-100 p-2'}>
                  <MaterialIcons name={'close'} size={24} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
            }
            {searchText !== '' && searchData.slice(0, 10).map((value, index) =>
            (<TouchableOpacity
              onPress={() => handleValueSearch(value.title, value.id)}
              key={index}
              className={'flex-row items-center gap-3 p-5 border-b-black border-b'}>
              <MaterialIcons name={'search'} size={24} />
              <Text className={'text-xl line-clamp-1 pr-5'}>{value.title}</Text>
            </TouchableOpacity>))
            }
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback >
  )
}