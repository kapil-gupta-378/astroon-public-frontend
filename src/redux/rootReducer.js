import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './home/homeSlice';
import faqReducer from './faq/faqSlice';
import blogReducer from './blog/blogSlice';
import adminReducer from './admin/adminSlice';
import contentReducer from './content/contentSlice';
import userReducer from './user/userSlice';
import globalLoadingReducer from './global-loading/globalLoadingSlice';
import walletReducer from './persist/wallet/walletSlice';
import tokenReducer from './token/tokenSlice';
import currencyReducer from './currency/currencySlice';
import whiteListUserReducer from './white-list-user/whiteListSlice';
export const rootReducer = combineReducers({
  homeReducer,
  faqReducer,
  blogReducer,
  adminReducer,
  contentReducer,
  userReducer,
  walletReducer,
  globalLoadingReducer,
  tokenReducer,
  currencyReducer,
  whiteListUserReducer,
});
