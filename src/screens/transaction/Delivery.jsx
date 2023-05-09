import {View, ScrollView, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {NativeBaseProvider, Radio} from 'native-base';
import ButtonSecondary from '../../components/ButtonSecondary';

const Delivery = () => {
  return (
    <NativeBaseProvider>
      <ScrollView>
        <View style={styles.screen}>
          <Text style={styles.titleScreen}>Delivery</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.titleContent}>Address details</Text>
            <Pressable>
              <Text style={styles.textPress}>change</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <Text style={styles.textAddress}>Iskandar Streets</Text>
            <View style={styles.lineStyle}></View>
            <Text style={styles.textDesc}>
              Km 5 refinery road oppsite republic road, effurun, Jakarta
            </Text>
            <View style={styles.lineStyle}></View>
            <Text style={styles.textDesc}>082211338805</Text>
          </View>
          <Text style={[styles.titleContent, {marginTop: 16}]}>
            Delivery methods
          </Text>

          <View style={styles.content}>
            <Radio.Group
              defaultValue="1"
              name="delivery"
              // accessibilityLabel="select prize"
            >
              <Radio value="1" my={1} colorScheme="warning">
                Door delivery
              </Radio>
              <View style={[styles.lineStyle, {marginVertical: 12}]}></View>
              <Radio value="2" my={1} colorScheme="warning">
                Pick up at store
              </Radio>
              <View style={[styles.lineStyle, {marginVertical: 12}]}></View>
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
            <Text style={styles.textPrice}>IDR 123405</Text>
          </View>
          <ButtonSecondary title="Confirm and Pay" />
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
  titleScreen: {
    fontSize: 34,
    fontFamily: 'Poppins-ExtraBold',
    color: 'black',
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
  lineStyle: {
    width: '100%',
    borderBottomWidth: 1,
    height: 1,
    borderColor: '#ADADAF',
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
