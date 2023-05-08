import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {getProductsDetails} from '../../utils/https/product';
import LoaderScreen from '../../components/LoaderScreen';
import ButtonSecondary from '../../components/ButtonSecondary';

const ProductDetails = () => {
  const route = useRoute();
  const {id} = route.params;
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(true);
  const [dataProd, setDataProd] = useState({});

  const fetching = async () => {
    setLoading(true);
    try {
      const result = await getProductsDetails(id, controller);
      console.log(result);
      setDataProd(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
  }, []);
  console.log(dataProd);
  return (
    <>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <View style={styles.container}>
          {dataProd.image ? (
            <Image source={{uri: dataProd.image}} style={styles.imageProd} />
          ) : (
            <Image
              style={styles.imageProd}
              source={require('../../assets/images/ph-product.png')}
            />
          )}
          <Text style={styles.titleProd}>{dataProd.prod_name}</Text>
          <Text style={styles.textPrice}>
            IDR {dataProd.price.toLocaleString('id-ID')}
          </Text>

          <View style={styles.containerDesc}>
            <Text style={styles.textTitle}>Delivery Info</Text>
            <Text style={{color: 'black'}}>
              Delivered only on monday until friday from 1 pm to 7 pm
            </Text>
          </View>
          <View style={styles.containerDesc}>
            <Text style={styles.textTitle}>Description</Text>
            <Text style={{color: 'black'}}>
              Cold brewing is a method of brewing that combines ground coffee
              and cool water and uses time instead of heat to extract the
              flavor. It is brewed in small batches and steeped for as long as
              48 hours.
            </Text>
          </View>
          <ButtonSecondary title="Add to cart" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  imageProd: {
    width: 241,
    height: 241,
    borderRadius: 200,
    resizeMode: 'cover',
  },
  titleProd: {
    fontSize: 28,
    fontFamily: 'Poppins-ExtraBold',
    color: 'black',
  },
  textPrice: {
    fontSize: 22,
    color: '#6A4029',
    fontFamily: 'Poppins-Bold',
  },
  textTitle: {
    fontFamily: 'Poppins-ExtraBold',
    color: 'black',
  },
  containerDesc: {
    width: '100%',
    paddingTop: 20,
  },
});

export default ProductDetails;
