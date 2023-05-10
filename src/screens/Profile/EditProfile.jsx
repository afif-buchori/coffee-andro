import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import {NativeBaseProvider, Radio, Stack} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import ButtonSecondary from '../../components/ButtonSecondary';
import {useSelector} from 'react-redux';
import LoaderSpin from '../../components/LoaderSpin';
import {getProfile} from '../../utils/https/auth';
import globalStyle from '../../styles/globalStyle';

const EditProfile = () => {
  const userRedux = useSelector(state => state.user);
  // console.log('DATA REDUX USER', userRedux);
  const controller = useMemo(() => new AbortController(), []);
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [disName, setDisName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const fetching = async () => {
    setLoading(true);
    try {
      const result = await getProfile(userRedux.id, controller);
      console.log('DATA PROFILE', result.data.data);
      setData(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  const onChangeGender = value => {
    setGender(value);
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.screenLoad}>
          <LoaderSpin />
        </View>
      ) : (
        <NativeBaseProvider>
          <ScrollView style={{flex: 1}}>
            <View style={styles.screen}>
              <View>
                {data.image ? (
                  <Image source={{uri: data.image}} style={styles.imageProd} />
                ) : (
                  <Image
                    source={require('../../assets/images/ph-users.png')}
                    style={styles.imageProd}
                  />
                )}
                <Pressable>
                  <Text>P</Text>
                </Pressable>
              </View>
              <View style={{marginBottom: 24, width: '100%'}}>
                <Text style={styles.textLabel}>Display Name :</Text>
                <TextInput
                  style={globalStyle.inputLine}
                  value={disName || data.display_name}
                  onChangeText={text => setDisName(text)}
                  placeholder="Enter your display name"
                  placeholderTextColor={'black'}
                />
              </View>
              <View style={{marginBottom: 24, width: '100%'}}>
                <Text style={styles.textLabel}>First Name :</Text>
                <TextInput
                  style={globalStyle.inputLine}
                  value={firstName || data.first_name}
                  onChangeText={text => setFirstName(text)}
                  placeholder="Enter your first name"
                  placeholderTextColor={'black'}
                />
              </View>
              <View style={{marginBottom: 24, width: '100%'}}>
                <Text style={styles.textLabel}>Last Name :</Text>
                <TextInput
                  style={globalStyle.inputLine}
                  value={lastName || data.last_name}
                  onChangeText={text => setLastName(text)}
                  placeholder="Enter your last name"
                  placeholderTextColor={'black'}
                />
              </View>

              <Radio.Group
                flexDirection="row"
                defaultValue={data.gender}
                value={gender}
                onChange={onChangeGender}
                name="gender"
                // accessibilityLabel="select prize"
              >
                <Stack direction="row" space={6} w="100%" marginBottom={6}>
                  <Text style={styles.textLabel}>Gender :</Text>
                  <Radio value="1" my={1} colorScheme="warning">
                    Male
                  </Radio>
                  <Radio value="2" my={1} colorScheme="warning">
                    Female
                  </Radio>
                </Stack>
              </Radio.Group>

              <View style={{marginBottom: 24, width: '100%'}}>
                <Text style={styles.textLabel}>Email :</Text>
                <TextInput
                  style={globalStyle.inputLine}
                  value={email || data.email}
                  onChangeText={text => setEmail(text)}
                  placeholder="Enter your email address"
                  placeholderTextColor={'black'}
                />
              </View>
              <View style={{marginBottom: 24, width: '100%'}}>
                <Text style={styles.textLabel}>Phone Number :</Text>
                <TextInput
                  style={globalStyle.inputLine}
                  value={phone || data.phone}
                  onChangeText={text => setPhone(text)}
                  placeholder="Enter your phone number"
                  keyboardType="numeric"
                  placeholderTextColor={'black'}
                />
              </View>
              {/* BRITHDATE */}

              <View style={{marginBottom: 24, width: '100%'}}>
                <Text style={styles.textLabel}>Delivery Address :</Text>
                <TextInput
                  style={globalStyle.inputLine}
                  value={address || data.address}
                  onChangeText={text => setAddress(text)}
                  placeholder="Enter your delivery address"
                  placeholderTextColor={'black'}
                />
              </View>
            </View>
          </ScrollView>
        </NativeBaseProvider>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screenLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: 20,
  },
  imageProd: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  textReg: {
    fontFamily: 'Poppins-Regular',
    color: '#6A4029',
  },
  textBold: {
    fontFamily: 'Poppins-Bold',
    color: '#6A4029',
    fontSize: 20,
  },
  imgOrder: {
    width: 59,
    height: 64,
    borderRadius: 20,
  },
  textLabel: {
    fontFamily: 'Poppins-Bold',
    color: '#9F9F9F',
  },
});

export default EditProfile;
