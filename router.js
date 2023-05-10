/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Pressable, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Welcome from './src/screens/Welcome';
import Auth from './src/screens/Auth';
import Signup from './src/screens/Auth/Signup';
import Login from './src/screens/Auth/Login';
import Home from './src/screens/Home';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Forgot from './src/screens/Auth/Forgot';
import ProductDetails from './src/screens/Product/ProductDetails';
import Profile from './src/screens/Profile';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Cart from './src/screens/transaction/Cart';
import Products from './src/screens/Product';
import Delivery from './src/screens/transaction/Delivery';
import Logout from './src/screens/Auth/Logout';
import Payment from './src/screens/transaction/Payment';
import EditProfile from './src/screens/Profile/EditProfile';
import CustomDrawer from './src/components/CustomDrawer';
import SplashScreen from './src/components/SplashCreen';

const DrawerNavigator = () => {
  const navigation = useNavigation();
  const {Navigator, Screen} = createDrawerNavigator();
  return (
    <Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#6A4029',
        drawerActiveTintColor: 'white',
        drawerLabelStyle: {marginLeft: -20},
      }}>
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
          headerTitleStyle: {fontFamily: 'Poppins-Bold'},
          headerTitle: {backgroundColor: 'rgba(255, 255, 255, 0)'},
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          // headerLeft: () => (
          //   <Pressable onPress={() => navigation.toggleDrawer()}>
          //     <View style={{marginLeft: 10}}>
          //       <Ionicons
          //         name="ellipsis-vertical-outline"
          //         size={24}
          //         color="black"
          //       />
          //     </View>
          //   </Pressable>
          // ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <View style={{marginRight: '8%'}}>
                <Ionicons name="cart-outline" size={24} color="black" />
              </View>
            </Pressable>
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
          headerTitleStyle: {fontFamily: 'Poppins-Bold'},
          headerTitle: {backgroundColor: 'rgba(255, 255, 255, 0)'},
          drawerIcon: ({color}) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
          headerTitleStyle: {fontFamily: 'Poppins-Bold'},
          headerTitle: {backgroundColor: 'rgba(255, 255, 255, 0)'},
          drawerIcon: ({color}) => (
            <Ionicons name="cart-outline" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="Products"
        component={Products}
        options={{
          title: 'All Products',
          headerShown: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
          headerTitleStyle: {fontFamily: 'Poppins-Bold'},
          headerTitle: {backgroundColor: 'rgba(255, 255, 255, 0)'},
          drawerIcon: ({color}) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="Logout"
        component={Logout}
        options={{
          title: 'Sign-Out',
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="arrow-forward-outline" size={24} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};

const StackNavigator = () => {
  const navigation = useNavigation();
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edit Profile',
          headerShown: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
        }}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          title: 'All Products',
          headerShown: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
        }}
      />
      <Stack.Screen
        name="Delivery"
        component={Delivery}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: true}}
      />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen
        name="Detail"
        component={ProductDetails}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
          headerTitleStyle: {fontFamily: 'Poppins-Bold'},
          headerTitle: {backgroundColor: 'rgba(255, 255, 255, 0)'},

          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <View style={{marginRight: '10%'}}>
                <Ionicons name="cart-outline" size={24} color="black" />
              </View>
            </Pressable>
          ),
        }}
        // options={({route}) => ({
        //   title: `Detail: ${route.params.id}`,
        //   headerShown: true,
        // })}
      />
    </Stack.Navigator>
  );
};

const Router = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default Router;
