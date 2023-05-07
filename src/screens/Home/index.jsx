import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import {debounce} from 'lodash';

import {getProducts} from '../../utils/https/product';
import CardProducts from '../../components/CardProducts';

const Home = () => {
  const controller = useMemo(() => new AbortController(), []);
  const [dataProduct, setDataProduct] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [page, setPage] = useState(1);
  const fetching = async () => {
    const params = {limit, page, category, search: searchInput};
    try {
      const result = await getProducts(params, controller);
      console.log(result.data.data);
      setDataProduct(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
  }, [category, searchInput]);

  const handleSearch = debounce(text => {
    setPage(1);
    setSearchInput(text);
  }, 700);
  const handleCategory = info => {
    setPage(1);
    setCategory(info);
  };
  return (
    <NativeBaseProvider>
      <View style={styles.mainScreen}>
        <View style={{paddingHorizontal: '5%', gap: 16, paddingVertical: 8}}>
          <Text style={styles.titleScreen}>A good coffee is a good day</Text>
          <View style={styles.SearchInput}>
            <Image
              source={require('../../assets/icons/icon-search.png')}
              style={{width: 18, height: 18}}
            />
            <TextInput
              style={{fontWeight: 'bold', width: '100%'}}
              placeholder="Search"
              onChangeText={handleSearch}
              placeholderTextColor={'black'}
            />
          </View>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                justifyContent: 'space-between',
              }}>
              <Pressable onPress={() => handleCategory('')}>
                <Text
                  style={
                    category === ''
                      ? styles.categoryActive
                      : styles.categoryText
                  }>
                  All
                </Text>
              </Pressable>
              <Pressable onPress={() => handleCategory(1)}>
                <Text
                  style={
                    category === 1 ? styles.categoryActive : styles.categoryText
                  }>
                  Coffee
                </Text>
              </Pressable>
              <Pressable onPress={() => handleCategory(2)}>
                <Text
                  style={
                    category === 2 ? styles.categoryActive : styles.categoryText
                  }>
                  Non Coffee
                </Text>
              </Pressable>
              <Pressable onPress={() => handleCategory(3)}>
                <Text
                  style={
                    category === 3 ? styles.categoryActive : styles.categoryText
                  }>
                  Foods
                </Text>
              </Pressable>
              <Pressable onPress={() => handleCategory(4)}>
                <Text
                  style={
                    category === 4 ? styles.categoryActive : styles.categoryText
                  }>
                  Adds on
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>

        <ScrollView>
          <View style={styles.cardContainer}>
            {dataProduct.map(product => (
              <CardProducts
                key={product.id}
                prodName={product.prod_name}
                image={product.image}
                price={product.price}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    // paddingVertical: 20,
  },
  titleScreen: {
    fontSize: 34,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  SearchInput: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 20,
    gap: 12,
    borderStyle: 'solid',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  categoryText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  categoryActive: {
    color: '#6A4029',
    fontFamily: 'Poppins-Bold',
    borderBottomWidth: 2,
    borderBottomColor: '#6A4029',
  },
});

export default Home;
