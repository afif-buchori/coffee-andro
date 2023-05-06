import {View, Text, ImageBackground, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import ButtonGoogle from '../../components/ButtonGoogle';
import authStyle from '../../styles/authStyle';
import ButtonPrimary from '../../components/ButtonPrimary';

import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../assets/images/bg-login.png')}
      style={authStyle.bgAuth}>
      <View style={authStyle.mainAuth}>
        <Text style={authStyle.authTitle}>Login</Text>
        <View style={{width: '100%', paddingHorizontal: '5%', gap: 20}}>
          <TextInput
            style={authStyle.inputAuth}
            placeholder="Enter your email address"
          />
          <TextInput
            style={authStyle.inputAuth}
            placeholder="Enter your password"
          />
        </View>
        <View style={authStyle.btnContainer}>
          <ButtonPrimary
            title="Login"
            handleNavigate={() => navigation.navigate('Home')}
          />
          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
            <Text>or Login in with</Text>
            <View style={styles.line}></View>
          </View>
          <ButtonGoogle title="Login with Google" />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%',
    gap: 12,
  },
  line: {
    height: 1,
    width: '28%',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
});

export default Login;
