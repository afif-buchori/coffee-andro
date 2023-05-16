import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {NativeBaseProvider, Box, Menu} from 'native-base';
import {debounce} from 'lodash';

import {addPromos, getProducts} from '../../utils/https/product';
import LoaderSpin from '../../components/LoaderSpin';
import CardListProduct from '../../components/CardListProduct';
import {useRoute} from '@react-navigation/native';

import {useNavigation} from '@react-navigation/native';
import globalStyle from '../../styles/globalStyle';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ButtonSecondary from '../../components/ButtonSecondary';

const CreatePromo = () => {
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [isPick, setPick] = useState(false);

  const [prodPick, setProdPick] = useState({});
  const [discount, setDiscount] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [expDate, setExpDate] = useState('');
  const [descript, setDescript] = useState('');

  const searching = async text => {
    setLoading(true);
    setPick(false);
    const params = {
      limit: 8,
      page: '',
      category: '',
      search: text,
      sort: '',
    };
    try {
      const result = await getProducts(params, controller);
      // console.log(result.data.meta);
      setDataProduct(result.data.data);
      setNoData(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setNoData(true);
        setLoading(false);
      }
    }
  };

  const handleSearch = debounce(text => {
    searching(text);
  }, 700);

  const handlePick = item => {
    // console.log(item);
    setProdPick(item);
    setPick(true);
  };

  const handleSubmit = async () => {
    try {
      const result = await addPromos(form, controller);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainScreen}>
        {isPick ? (
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                position: 'relative',
                width: '100%',
                alignItems: 'center',
                marginBottom: 24,
              }}>
              <Image
                source={
                  prodPick.image
                    ? {uri: prodPick.image}
                    : require('../../assets/images/ph-product.png')
                }
                style={styles.imageProd}
              />
              <Pressable onPress={() => setPick(false)} style={styles.btnEdit}>
                <IonIcon name="close-circle" size={40} color="#6A4029" />
              </Pressable>
            </View>
            <Text style={styles.textName}>{prodPick.prod_name}</Text>
            <Text style={styles.textPrice}>
              IDR {prodPick.price.toLocaleString('id-ID')}
            </Text>
            <View style={{marginBottom: 24, width: '100%'}}>
              <Text style={styles.textLabel}>Discount :</Text>
              <TextInput
                style={globalStyle.inputLine}
                placeholder="Enter discount"
                value={discount}
                onChangeText={text => setDiscount(text)}
                placeholderTextColor={'black'}
                keyboardType="number-pad"
              />
            </View>
            <View style={{marginBottom: 24, width: '100%'}}>
              <Text style={styles.textLabel}>Coupon Code :</Text>
              <TextInput
                style={globalStyle.inputLine}
                placeholder="Enter coupon code"
                value={couponCode}
                onChangeText={text => setCouponCode(text)}
                placeholderTextColor={'black'}
              />
            </View>
            <View style={{marginBottom: 24, width: '100%'}}>
              <Text style={styles.textLabel}>Expired Date :</Text>
              <TextInput
                style={globalStyle.inputLine}
                placeholder="Enter expired Date"
                value={expDate}
                onChangeText={text => setExpDate(text)}
                placeholderTextColor={'black'}
              />
            </View>
            <View style={{marginBottom: 24, width: '100%'}}>
              <Text style={styles.textLabel}>Description :</Text>
              <TextInput
                style={globalStyle.inputLine}
                placeholder="Enter Description"
                value={descript}
                onChangeText={text => setDescript(text)}
                placeholderTextColor={'black'}
              />
            </View>
            <ButtonSecondary title="Create Promo" />
          </View>
        ) : (
          <>
            <View style={{marginBottom: 24, width: '100%'}}>
              <Text style={styles.textLabel}>Product Name :</Text>
              <TextInput
                style={globalStyle.inputLine}
                placeholder="Search Product"
                onChangeText={handleSearch}
                placeholderTextColor={'black'}
              />
            </View>

            {dataProduct.length >= 1 && (
              <Text style={globalStyle.textBold}>Select Product</Text>
            )}

            <View style={styles.listContainer}>
              {isLoading ? (
                <LoaderSpin />
              ) : noData ? (
                <Text style={styles.notFound}>Data Not Found</Text>
              ) : (
                dataProduct.map(item => (
                  <Pressable
                    onPress={() => handlePick(item)}
                    key={item.id}
                    style={styles.cardContainer}>
                    <Text style={styles.textCard}>{item.prod_name}</Text>
                  </Pressable>
                ))
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  content: {
    justifyContent: 'center',
  },
  textLabel: {
    fontFamily: 'Poppins-Bold',
    color: '#9F9F9F',
  },
  notFound: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#6A4029',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 60,
  },
  listContainer: {
    marginTop: 18,
    gap: 16,
  },
  cardContainer: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 16,
  },
  textCard: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  btnEdit: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  imageProd: {
    width: 240,
    height: 240,
    borderRadius: 36,
  },
  textName: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 24,
  },
  textPrice: {
    fontFamily: 'Poppins-Bold',
    color: '#6A4029',
    fontSize: 20,
    marginBottom: 20,
  },
});

export default CreatePromo;
