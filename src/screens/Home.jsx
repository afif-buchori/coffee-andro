import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import ButtonPrimary from '../components/ButtonPrimary';

const Home = () => {
  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require('../assets/images/bg-main.png')}
        style={styles.bgHome}>
        <View style={styles.mainHome}>
          <Text style={styles.homeText}>Coffee for Everyone</Text>
          <ButtonPrimary title="Get Started" />
        </View>
      </ImageBackground>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  bgHome: {
    flex: 1,
    resizeMode: 'cover',
  },
  mainHome: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  homeText: {
    marginTop: 160,
    fontSize: 65,
    fontWeight: 700,
    textAlign: 'center',
    color: 'white',
  },
});

export default Home;
