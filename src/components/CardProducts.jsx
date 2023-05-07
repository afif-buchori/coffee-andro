import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const CardProducts = props => {
  return (
    <View style={styles.cardContainer}>
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
        {props.price}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '46%',
    height: 240,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 40,
    padding: 16,
    paddingBottom: 8,
  },
  imageProd: {
    position: 'absolute',
    top: -20,
    borderRadius: 16,
    width: '100%',
    height: 140,
    backgroundColor: 'red',
    resizeMode: 'cover',
  },
  titleCard: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Poppins-ExtraBold',
    textAlign: 'center',
    marginTop: 'auto',
  },
});

export default CardProducts;
