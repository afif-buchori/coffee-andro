/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
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

const DrawerNavigator = () => {
  const {Navigator, Screen} = createDrawerNavigator();
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
};

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen
        name="Detail"
        component={ProductDetails}
        options={({route}) => ({
          title: `Detail: ${route.params.id}`,
        })}
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
