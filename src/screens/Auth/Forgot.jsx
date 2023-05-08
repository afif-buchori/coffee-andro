import {View, Text, ImageBackground, TextInput} from 'react-native';
import React, {useMemo, useState} from 'react';
import ButtonSecondary from '../../components/ButtonSecondary';
import authStyle from '../../styles/authStyle';
import LoaderScreen from '../../components/LoaderScreen';
import BtnLoadingSec from '../../components/BtnLoadingSec';
import {forgotEmail} from '../../utils/https/auth';

const Forgot = () => {
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState('');

  const handleSendLink = async () => {
    setLoading(true);
    console.log(email);
    try {
      const result = await forgotEmail(email, controller);
      console.log(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <ImageBackground
      source={require('../../assets/images/bg-forgot.png')}
      style={authStyle.bgAuth}>
      <View style={authStyle.mainAuth}>
        <Text style={authStyle.authTitle}>Sign Up</Text>
        <View style={{width: '100%', paddingHorizontal: '5%', gap: 20}}>
          <TextInput
            style={authStyle.inputAuth}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Enter your email address"
            placeholderTextColor={'white'}
          />
        </View>
        <View style={authStyle.btnContainer}>
          <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
            Haven’t received any link?
          </Text>
          {isLoading ? (
            <BtnLoadingSec />
          ) : (
            <ButtonSecondary title="Send Link" handlePress={handleSendLink} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Forgot;
