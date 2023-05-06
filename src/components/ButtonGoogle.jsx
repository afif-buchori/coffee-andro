import {TouchableOpacity, Text, Image, View} from 'react-native';
import React from 'react';

const ButtonGoogle = props => {
  return (
    <TouchableOpacity style={styles.btnWhite}>
      <View style={styles.innerBtn}>
        <Image
          style={{width: 28, height: 26}}
          source={require('../assets/icons/icon-google.png')}
        />
        <Text style={styles.btnText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  btnWhite: {
    width: '90%',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  innerBtn: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center',
    color: 'black',
  },
};

export default ButtonGoogle;
