import { combineReducers } from '@reduxjs/toolkit';
import auth from './authReducer';
import registration from './registrationReducer';
import adminRegistrants from './adminRegistrantsReducer';

export const rootReducer = combineReducers({
  auth,
  registration,
  adminRegistrants,
});
