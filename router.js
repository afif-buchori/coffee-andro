/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Welcome from './src/screens/Welcome';
import Auth from './src/screens/Auth';
import Signup from './src/screens/Auth/Signup';
import Login from './src/screens/Auth/Login';
import Home from './src/screens/Home';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const StackNavigator = () => {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Welcome" component={Welcome} />
      <Screen name="Auth" component={Auth} />
      <Screen name="Signup" component={Signup} />
      <Screen name="Login" component={Login} />
      <Screen name="Home" component={Home} />
    </Navigator>
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
