import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CardProducts = props => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Detail', {id: props.prodId})}
      style={styles.cardContainer}>
      {props.image ? (
        <Image source={{uri: props.image}} style={styles.imageProd} />
      ) : (
        <Image
          source={require('../assets/images/ph-product.png')}
          style={styles.imageProd}
        />
      )}
      <Text style={styles.titleCard}>{props.prodName}</Text>
      <Text style={{color: '#6A4029', fontFamily: 'Poppins-Bold'}}>
        IDR {props.price.toLocaleString('id-ID')}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 220,
    height: 270,
    backgroundColor: 'white',
    borderRadius: 32,
    alignItems: 'center',
    marginTop: 40,
    padding: 16,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  imageProd: {
    position: 'absolute',
    top: -30,
    borderRadius: 16,
    width: 168,
    height: 189,
    backgroundColor: 'red',
    resizeMode: 'cover',
  },
  titleCard: {
    color: 'black',
    fontSize: 20,
    lineHeight: 22,
    fontFamily: 'Poppins-ExtraBold',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 6,
  },
});

export default CardProducts;
