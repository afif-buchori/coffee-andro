/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  PERSIST,
  FLUSH,
  REHYDRATE,
  PAUSE,
  REGISTER,
  PURGE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './slices';

const persistConfig = {
  key: 'coffee-shop',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: defaultMiddleware => {
    return defaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoreActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, REGISTER, PURGE],
      },
    });
  },
});

export const persistor = persistStore(store);
export default store;
