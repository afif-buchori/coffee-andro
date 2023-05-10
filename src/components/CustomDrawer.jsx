import React from 'react';

import {View, Image, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawer = props => {
  // const {width} = Dimensions.get('screen');
  const userRedux = useSelector(state => state.user);
  // console.log(userRedux);
  return (
    <DrawerContentScrollView {...props}>
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
  },
});
