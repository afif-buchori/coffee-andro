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

const CreateProduct = () => {
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

  const [name, setName] = useState('');
  const [category, setCategory] = useState(0);
  const [price, setPrice] = useState('');

  const onChangeCategory = value => {
    setCategory(value);
  };

  const handleSubmit = () => {
    const form = {
      prod_name: name,
      category,
      price,
    };
    if (name === '' || category === 0 || price === '') {
      setToastInfo({msg: 'Input Empty', display: 'error'});
      setToast(true);
      return;
    }
    console.log(form);
  };

  return (
    <NativeBaseProvider>
      <ToastFetching
        isShow={isToast}
        onClose={() => setToast(false)}
        info={toastInfo}
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles.screen}>
          <View style={{marginBottom: 46}}>
            {/* {data.profile_picture ? (
              <Image
                source={{uri: data.profile_picture}}
                style={styles.imageProd}
              />
            ) : ( */}
            <Image
              source={require('../../assets/images/ph-product.png')}
              style={styles.imageProd}
            />
            {/* )} */}
            <Pressable style={styles.btnEdit}>
              <FontAwesomeIcon name="pencil" size={24} color="white" />
            </Pressable>
          </View>
          <View style={{marginBottom: 24, width: '100%'}}>
            <Text style={styles.textLabel}>Product Name :</Text>
            <TextInput
              style={globalStyle.inputLine}
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Enter product name"
              placeholderTextColor={'black'}
            />
          </View>

          <Radio.Group
            value={category}
            onChange={onChangeCategory}
            name="category"
            // accessibilityLabel="select prize"
          >
            <Text style={styles.textLabel}>Category :</Text>
            <Stack
              direction="row"
              space={2}
              w="100%"
              justifyContent="space-between"
              alignItems="flex-start"
              marginTop={2}
              marginBottom={6}>
              <Radio value={1} my={1} colorScheme="warning">
                Coffee
              </Radio>
              <Radio value={2} my={1} colorScheme="warning">
                Non Coffee
              </Radio>
              <Radio value={3} my={1} colorScheme="warning">
                Foods
              </Radio>
            </Stack>
          </Radio.Group>

          <View style={{marginBottom: 24, width: '100%'}}>
            <Text style={styles.textLabel}>Price :</Text>
            <TextInput
              style={globalStyle.inputLine}
              value={price}
              onChangeText={text => setPrice(text)}
              placeholder="Enter price"
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
              <ButtonSecondary title="Save Change" handlePress={handleSubmit} />
            )}
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
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
    width: 180,
    height: 180,
    borderRadius: 20,
  },
  btnEdit: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -20,
    right: -20,
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

export default CreateProduct;