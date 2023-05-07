import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import ButtonGoogle from '../../components/ButtonGoogle';
import authStyle from '../../styles/authStyle';
import ButtonPrimary from '../../components/ButtonPrimary';

import {useNavigation} from '@react-navigation/native';
import {fetchLogin} from '../../utils/https/auth';
import {useDispatch} from 'react-redux';
import {userAction} from '../../redux/slices/auth';

const Login = () => {
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const navigation = useNavigation();
  const [formEmail, setFormEmail] = useState('');
  const [formPass, setFormPass] = useState('');

  const handleSubmit = async () => {
    console.log(formEmail, formPass);
    const form = {email: formEmail, password: formPass};
    try {
      const result = await fetchLogin(form, controller);
      console.log(result);
      dispatch(userAction.authLogin(result.data));
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg-login.png')}
      style={authStyle.bgAuth}>
      <View style={authStyle.mainAuth}>
        <Text style={authStyle.authTitle}>Login</Text>
        <View style={{width: '100%', paddingHorizontal: '5%', gap: 20}}>
          <TextInput
            style={authStyle.inputAuth}
            value={formEmail}
            onChangeText={text => setFormEmail(text)}
            placeholder="Enter your email address"
            placeholderTextColor={'white'}
          />
          <TextInput
            style={authStyle.inputAuth}
            value={formPass}
            onChangeText={text => setFormPass(text)}
            placeholder="Enter your password"
            placeholderTextColor={'white'}
          />
          <Pressable>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>
        </View>
        <View style={authStyle.btnContainer}>
          <ButtonPrimary title="Login" handleNavigate={handleSubmit} />
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
  forgotText: {
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
    color: 'white',
    marginTop: 10,
  },
  line: {
    height: 1,
    width: '28%',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
});

export default Login;
