import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import ButtonSecondary from '../../components/ButtonSecondary';
import ButtonPrimary from '../../components/ButtonPrimary';

const Auth = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/bg-auth.png')}
      style={styles.bgAuth}>
      <View style={styles.mainAuth}>
        <View style={{width: '100%'}}>
          <Text style={styles.authTitle}>Welcome!</Text>
          <Text style={styles.authDesc}>
            Get a cup of coffee for free every sunday morning
          </Text>
        </View>
        <View style={styles.btContainer}>
          <ButtonSecondary title="Create New Account" />
          <ButtonPrimary title="Login" />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgAuth: {
    flex: 1,
    resizeMode: 'cover',
  },
  mainAuth: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  authTitle: {
    marginTop: 100,
    fontSize: 65,
    fontWeight: 700,
    textAlign: 'center',
    color: 'white',
  },
  authDesc: {
    maxWidth: '80%',
    marginTop: 12,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
  },
  btContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
});

export default Auth;
