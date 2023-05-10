import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {getProductsDetails} from '../../utils/https/product';
import LoaderScreen from '../../components/LoaderScreen';
import ButtonSecondary from '../../components/ButtonSecondary';
import {useDispatch} from 'react-redux';
import {cartAction} from '../../redux/slices/cart';
import ToastFetching from '../../components/ToastFetching';

const ProductDetails = () => {
  const route = useRoute();
  const {id} = route.params;
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(true);
  const [isToast, setToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({});
  const [dataProd, setDataProd] = useState({});
  const [size, setSize] = useState(0);

  const fetching = async () => {
    setLoading(true);
    try {
      const result = await getProductsDetails(id, controller);
      // console.log(result);
      setDataProd(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
  }, []);
  // console.log(dataProd);

  const handleAddToCart = () => {
    const cart = {
      product_id: id,
      prodName: dataProd.prod_name,
      image: dataProd.image || '',
      size_id: size || 1,
      qty: 1,
      price: dataProd.price,
    };
    setToastInfo({
      msg: `Adding ${dataProd.prod_name}`,
      display: 'success',
    });
    setToast(true);
    dispatch(cartAction.addtoCart(cart));
  };
  return (
    <>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <ScrollView>
          <ToastFetching
            isShow={isToast}
            onClose={() => setToast(false)}
            info={toastInfo}
          />
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
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20}}>
              Choose Size
            </Text>
            <View style={{flexDirection: 'row', gap: 20}}>
              <Pressable
                onPress={() => setSize(1)}
                style={size === 1 ? styles.selectedSize : styles.selectSize}>
                <Text style={size === 1 ? styles.sizedTitle : styles.sizeTitle}>
                  R
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSize(2)}
                style={size === 2 ? styles.selectedSize : styles.selectSize}>
                <Text style={size === 2 ? styles.sizedTitle : styles.sizeTitle}>
                  L
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSize(3)}
                style={size === 3 ? styles.selectedSize : styles.selectSize}>
                <Text style={size === 3 ? styles.sizedTitle : styles.sizeTitle}>
                  XL
                </Text>
              </Pressable>
            </View>
            <View style={{marginTop: 20, width: '100%'}}>
              <ButtonSecondary
                title="Add to cart"
                handlePress={handleAddToCart}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: 16,
  },
  imageProd: {
    width: 200,
    height: 200,
    borderRadius: 200,
    resizeMode: 'cover',
  },
  titleProd: {
    fontSize: 28,
    fontFamily: 'Poppins-ExtraBold',
    color: 'black',
    textAlign: 'center',
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
  selectSize: {
    width: 50,
    height: 50,
    paddingTop: 4,
    borderRadius: 25,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFBA33',
  },
  selectedSize: {
    width: 50,
    height: 50,
    paddingTop: 4,
    borderRadius: 25,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A4029',
  },
  sizeTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-ExtraBold',
    color: 'black',
  },
  sizedTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-ExtraBold',
    color: '#FFBA33',
  },
});

export default ProductDetails;
