/* eslint-disable prettier/prettier */
import {combineReducers} from '@reduxjs/toolkit';

import userSlice from './auth';

const reducers = combineReducers({
  user: userSlice,
});

export default reducers;
