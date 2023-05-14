import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import {NativeBaseProvider, Radio, Stack, isEmptyObj} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import ButtonSecondary from '../../components/ButtonSecondary';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import LoaderSpin from '../../components/LoaderSpin';
import {getProfile, updateProfile} from '../../utils/https/auth';
import globalStyle from '../../styles/globalStyle';
import ToastFetching from '../../components/ToastFetching';
import BtnLoadingSec from '../../components/BtnLoadingSec';
import ButtonPrimary from '../../components/ButtonPrimary';
import {useNavigation} from '@react-navigation/native';

import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfile = () => {
  const navigation = useNavigation();
  const userRedux = useSelector(state => state.user);
  // console.log('DATA REDUX USER', userRedux);
  const controller = useMemo(() => new AbortController(), []);
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isToast, setToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({});
  const [isSuccess, setSuccess] = useState(false);

  const [disName, setDisName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState('');

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    // console.log(currentDate);
  };

  const fetching = async () => {
    setLoading(true);
    try {
      const result = await getProfile(userRedux.id, controller);
      // console.log('DATA PROFILE', result.data.data);
      setData(result.data.data);
      setDate(new Date(result.data.data.birth_date));
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

  // console.log('TOKEN', userRedux.token);
  // console.log(data.profile_picture);
  // console.log(date);

  const handleEditProfile = async () => {
    const userData = {};
    if (disName !== '') userData.display_name = disName;
    if (firstName !== '') userData.first_name = firstName;
    if (lastName !== '') userData.last_name = lastName;
    if (gender !== '') userData.gender = gender;
    if (email !== '') userData.email = email;
    if (phone !== '') userData.phone = phone;
    if (address !== '') userData.address = address;
    // console.log(userData);
    if (isEmptyObj(userData)) {
      setToastInfo({msg: 'Nothing changed in your profile', display: 'error'});
      setToast(true);
      return;
    }
    setFetchLoading(true);
    try {
      const result = await updateProfile(userRedux.token, userData, controller);
      console.log('HASIL UPDATE', result);
      if (result.status === 200) {
        setToastInfo({msg: 'Update Success', display: 'success'});
        setToast(true);
        setSuccess(true);
        setFetchLoading(false);
      }
    } catch (error) {
      console.log(error);
      setFetchLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.screenLoad}>
          <LoaderSpin />
        </View>
      ) : (
        <NativeBaseProvider>
          <ToastFetching
            isShow={isToast}
            onClose={() => setToast(false)}
            info={toastInfo}
          />
          <ScrollView style={{flex: 1}}>
            <View style={styles.screen}>
              <View style={{marginBottom: 16}}>
                {data.profile_picture ? (
                  <Image
                    source={{uri: data.profile_picture}}
                    style={styles.imageProd}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/ph-users.png')}
                    style={styles.imageProd}
                  />
                )}
                <Pressable style={styles.btnEdit}>
                  <FontAwesomeIcon name="pencil" size={18} color="white" />
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
                value={data.gender || gender}
                onChange={onChangeGender}
                name="gender"
                // accessibilityLabel="select prize"
              >
                <Stack direction="row" space={6} w="100%" marginBottom={6}>
                  <Text style={styles.textLabel}>Gender :</Text>
                  <Radio value="male" my={1} colorScheme="warning">
                    Male
                  </Radio>
                  <Radio value="female" my={1} colorScheme="warning">
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
                <Text style={styles.textLabel}>Birth Date :</Text>
                <Pressable
                  onPress={() => setShowPicker(true)}
                  style={styles.dateStyle}>
                  <Text style={styles.textDate}>
                    {date.toLocaleDateString()}
                  </Text>
                  <FontAwesomeIcon name="calendar" size={22} color="#9F9F9F" />
                </Pressable>
                {showPicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>

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
              <View style={{marginHorizontal: 20, width: '100%'}}>
                {fetchLoading ? (
                  <BtnLoadingSec />
                ) : isSuccess ? (
                  <ButtonPrimary
                    title="Back Profile"
                    handlePress={() => navigation.navigate('Profile')}
                  />
                ) : (
                  <ButtonSecondary
                    title="Save Change"
                    handlePress={handleEditProfile}
                  />
                )}
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
  btnEdit: {
    width: 36,
    height: 36,
    borderRadius: 17,
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 4,
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
  dateStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
  },
  textDate: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
});

export default EditProfile;
