import {
  View,
  ScrollView,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import ButtonWhite from '../../components/ButtonWhite';
import ButtonSecondary from '../../components/ButtonSecondary';
import {useSelector} from 'react-redux';
import LoaderSpin from '../../components/LoaderSpin';
import {getProfile} from '../../utils/https/auth';
import {getHistory} from '../../utils/https/transaction';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const CardOrder = ({data}) => {
  return (
    <View>
      {data.image ? (
        <Image source={{uri: data.image}} style={styles.imgOrder} />
      ) : (
        <Image
          source={require('../../assets/images/ph-product.png')}
          style={styles.imgOrder}
        />
      )}
    </View>
  );
};

const Profile = () => {
  const userRedux = useSelector(state => state.user);
  // console.log('DATA REDUX USER', userRedux);
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);
  const [data, setData] = useState({});
  const [dataOrder, setDataOrder] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetching = async () => {
    setLoading(true);
    try {
      const result = await getProfile(userRedux.id, controller);
      console.log('DATA PROFILE', result.data.data);
      setData(result.data.data);
      const getHistoryOrder = await getHistory(userRedux.token, controller);
      console.log('HISTORY ORDER', getHistoryOrder.data.data);
      setDataOrder(getHistoryOrder.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubFocus = navigation.addListener('focus', () => {
      fetching();
    });
    fetching();
    return unsubFocus;
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.screenLoad}>
          <LoaderSpin />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.screen}>
            <View style={{alignItems: 'center', paddingHorizontal: '10%'}}>
              <View style={{position: 'relative', marginBottom: 12}}>
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
              <Text style={styles.textBold}>{data.display_name}</Text>
              <Text style={styles.textReg}>{data.email}</Text>
              <Text style={[styles.textReg, {marginBottom: 20}]}>
                {data.address || '*address not set*'}
              </Text>
            </View>
            <View style={styles.orderComponent}>
              <View style={styles.orderHistoryTitlte}>
                <Text style={styles.textBold}>Order History</Text>
                <Pressable onPress={() => navigation.navigate('History')}>
                  <Text style={styles.textReg}>See more</Text>
                </Pressable>
              </View>
              <ScrollView horizontal={true}>
                <View style={styles.orderCardContainer}>
                  {dataOrder.length >= 1 ? (
                    dataOrder.map((item, idx) => (
                      <CardOrder key={idx} data={item} />
                    ))
                  ) : (
                    <Text style={styles.textBold}>
                      {'>>>      - No Order History -     <<<'}
                    </Text>
                  )}
                </View>
              </ScrollView>
            </View>
            <View style={styles.actionContainer}>
              <ButtonWhite title="Edit Password" />
              <ButtonWhite title="FAQ" />
              <ButtonWhite title="Help" />
              <View style={{width: '100%'}}>
                <ButtonSecondary
                  title="Edit Profile"
                  handlePress={() => navigation.navigate('EditProfile')}
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
    // width: '100%',
    alignItems: 'center',
    // paddingHorizontal: '10%',
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
  orderHistoryTitlte: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: 8,
  },
  orderComponent: {
    width: '100%',
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderColor: '#BABABA30',
    marginBottom: 22,
  },
  orderCardContainer: {
    gap: 24,
    flexDirection: 'row',
    paddingHorizontal: 36,
    paddingTop: 8,
    paddingBottom: 16,
  },
  actionContainer: {
    width: '100%',
    gap: 16,
    paddingHorizontal: '10%',
  },
});

export default Profile;
