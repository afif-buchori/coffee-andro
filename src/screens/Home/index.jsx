import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View style={styles.mainScreen}>
      <View style={{paddingHorizontal: '5%', gap: 16}}>
        <Text style={styles.titleScreen}>A good coffee is a good day</Text>
        <View style={styles.SearchInput}>
          <Image
            source={require('../../assets/icons/icon-search.png')}
            style={{width: 18, height: 18}}
          />
          <TextInput
            style={{fontWeight: 'bold', width: '100%'}}
            placeholder="Search"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    paddingVertical: 20,
  },
  titleScreen: {
    fontSize: 34,
    fontWeight: 'bold',
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
  },
});

export default Home;
