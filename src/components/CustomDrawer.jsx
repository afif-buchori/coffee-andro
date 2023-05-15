import React, {useState} from 'react';

import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logout from './Logout';

const CustomDrawer = props => {
  // const {width} = Dimensions.get('screen');
  const [showModal, setShowModal] = useState(false);
  const userRedux = useSelector(state => state.user);
  // console.log(userRedux);
  return (
    <DrawerContentScrollView {...props}>
      <Logout showModal={showModal} closeModal={() => setShowModal(false)} />
      <View style={styles.containerImage}>
        {userRedux.token && userRedux.image ? (
          <Image source={{uri: userRedux.image}} style={styles.userImg} />
        ) : (
          <Image
            source={require('../assets/images/ph-users.png')}
            style={styles.userImg}
          />
        )}
        {userRedux.token ? (
          <Text style={styles.textName}>{userRedux.phone}</Text>
        ) : (
          <Text style={styles.textName}>Not Login</Text>
        )}
      </View>
      <View style={styles.drawerListWrapper}>
        <DrawerItemList {...props} />
        <Pressable
          onPress={() => setShowModal(true)}
          style={showModal ? styles.btnLogClick : styles.btnLogout}>
          <Text style={showModal ? styles.textLogClick : styles.textLogout}>
            Sign-Out
          </Text>
          <Ionicons
            name="arrow-forward-outline"
            size={24}
            color={showModal ? 'white' : 'black'}
          />
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  containerImage: {
    height: 250,
    width: '100%',
    backgroundColor: '#6A4029',
    position: 'relative',
    top: -4,
    justifyContent: 'center',
    alignItems: 'center',
    // borderTopRightRadius: 30,
    borderBottomRightRadius: 50,
  },
  textEmail: {
    color: 'white',
    fontWeight: '500',
    marginTop: 5,
  },
  textName: {
    marginTop: 15,
    color: 'white',
    fontWeight: '800',
  },
  drawerListWrapper: {
    marginTop: 25,
    justifyContent: 'space-between',
  },
  btnLogout: {
    marginTop: 200,
    marginHorizontal: 11,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  btnLogClick: {
    backgroundColor: '#6A4029',
    marginTop: 200,
    marginHorizontal: 11,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textLogout: {fontFamily: 'Poppins-Bold', fontSize: 13},
  textLogClick: {fontFamily: 'Poppins-Bold', fontSize: 13, color: 'white'},
});
