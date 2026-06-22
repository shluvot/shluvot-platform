import { combineReducers } from '@reduxjs/toolkit';
import auth from './authReducer';
import registration from './registrationReducer';
import adminRegistrants from './adminRegistrantsReducer';
import siteContent from './siteContentReducer';
import adminArticles from './adminArticlesReducer';

export const rootReducer = combineReducers({
  auth,
  registration,
  adminRegistrants,
  siteContent,
  adminArticles,
});
