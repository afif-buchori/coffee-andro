import {View, ScrollView, Text, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {NativeBaseProvider, Radio} from 'native-base';
import ButtonSecondary from '../../components/ButtonSecondary';
import globalStyle from '../../styles/globalStyle';
import {useDispatch} from 'react-redux';
import {cartAction} from '../../redux/slices/cart';
import {useNavigation, useRoute} from '@react-navigation/native';

const Delivery = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  // console.log(route.params.total);
  const [deliveryMethod, setDeliveryMethod] = useState(3);

  const onChangeDelivery = value => {
    setDeliveryMethod(value);
  };
  const handleConfirm = () => {
    dispatch(cartAction.deliveryMethod(deliveryMethod));
    navigation.navigate('Payment', {subtotal: route.params.total});
  };
  return (
    <NativeBaseProvider>
      <ScrollView>
        <View style={styles.screen}>
          <Text style={globalStyle.titleScreen}>Delivery</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.titleContent}>Address details</Text>
            <Pressable>
              <Text style={styles.textPress}>change</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <Text style={styles.textAddress}>Iskandar Streets</Text>
            <View style={globalStyle.lineStyle}></View>
            <Text style={styles.textDesc}>
              Km 5 refinery road oppsite republic road, effurun, Jakarta
            </Text>
            <View style={globalStyle.lineStyle}></View>
            <Text style={styles.textDesc}>082211338805</Text>
          </View>
          <Text style={[styles.titleContent, {marginTop: 16}]}>
            Delivery methods
          </Text>

          <View style={styles.content}>
            <Radio.Group
              // defaultValue="3"
              value={deliveryMethod}
              onChange={onChangeDelivery}
              name="delivery"
              // accessibilityLabel="select prize"
            >
              <Radio value="1" my={1} colorScheme="warning">
                Door delivery
              </Radio>
              <View
                style={[globalStyle.lineStyle, {marginVertical: 12}]}></View>
              <Radio value="2" my={1} colorScheme="warning">
                Pick up at store
              </Radio>
              <View
                style={[globalStyle.lineStyle, {marginVertical: 12}]}></View>
              <Radio value="3" my={1} colorScheme="warning">
                Dine in
              </Radio>
            </Radio.Group>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 16,
            }}>
            <Text style={styles.textTotal}>Total</Text>
            <Text style={styles.textPrice}>
              IDR {route.params.total.toLocaleString('id-ID')}
            </Text>
          </View>
          <ButtonSecondary
            title="Confirm and Pay"
            handlePress={handleConfirm}
          />
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    paddingHorizontal: '10%',
    paddingVertical: 16,
    gap: 10,
  },
  titleContent: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 17,
  },
  textPress: {
    color: '#6A4029',
    fontFamily: 'Poppins-Regular',
  },
  textAddress: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  textDesc: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 6,
  },
  textTotal: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 18,
  },
  textPrice: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
});

export default Delivery;
