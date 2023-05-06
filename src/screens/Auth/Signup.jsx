import {View, Text, ImageBackground, TextInput} from 'react-native';
import React from 'react';
import ButtonGoogle from '../../components/ButtonGoogle';
import ButtonSecondary from '../../components/ButtonSecondary';
import authStyle from '../../styles/authStyle';

const Signup = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/bg-signup.png')}
      style={authStyle.bgAuth}>
      <View style={authStyle.mainAuth}>
        <Text style={authStyle.authTitle}>Sign Up</Text>
        <View style={{width: '100%', paddingHorizontal: '5%', gap: 20}}>
          <TextInput
            style={authStyle.inputAuth}
            placeholder="Enter your email address"
          />
          <TextInput
            style={authStyle.inputAuth}
            placeholder="Enter your password"
          />
          <TextInput
            style={authStyle.inputAuth}
            placeholder="Enter your phone number"
          />
        </View>
        <View style={authStyle.btnContainer}>
          <ButtonSecondary title="Create Account" />
          <ButtonGoogle title="Create with Google" />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Signup;
