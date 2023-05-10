import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {cartAction} from '../redux/slices/cart';

const CardCartProd = ({data}) => {
  const dispatch = useDispatch();

  const handleQty = info => {
    if (info === 'inc') {
      dispatch(cartAction.increment(data.product_id));
    } else {
      if (data.qty === 1) return;
      dispatch(cartAction.decrement(data.product_id));
    }
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardProd}>
        {data.image ? (
          <Image source={{uri: data.image}} style={styles.imageProd} />
        ) : (
          <Image
            source={require('../assets/images/ph-product.png')}
            style={styles.imageProd}
          />
        )}
        <Text style={styles.textPrice}>
          IDR {data.price.toLocaleString('id-ID')}
        </Text>
      </View>
      <View style={{gap: 16, width: '100%'}}>
        <Text style={styles.titleProd}>{data.prodName}</Text>
        <View style={{flexDirection: 'row', gap: 30}}>
          <TouchableOpacity
            onPress={() => handleQty('dec')}
            style={styles.btnQty}>
            <Text style={styles.titleProd}>-</Text>
          </TouchableOpacity>
          <Text style={styles.titleProd}>{data.qty}</Text>
          <TouchableOpacity
            onPress={() => handleQty('inc')}
            style={styles.btnQty}>
            <Text style={styles.titleProd}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    marginTop: 40,
  },
  cardProd: {
    width: 104,
    height: 104,
    borderRadius: 32,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  imageProd: {
    width: 84,
    height: 84,
    position: 'absolute',
    top: -22,
    borderRadius: 42,
  },
  textPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#6A4029',
  },
  titleProd: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  btnQty: {
    width: 21,
    height: 21,
    backgroundColor: '#FFBA33',
    borderRadius: 12,
    alignItems: 'center',
  },
});

export default CardCartProd;
