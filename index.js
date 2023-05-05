/* eslint-disable prettier/prettier */
/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import App from './App';
import Home from './src/screens/Home';
import Auth from './src/screens/Auth';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Auth);
