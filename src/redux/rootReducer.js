import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './home/homeSlice';
import faqReducer from './faq/faqSlice';
import blogReducer from './blog/blogSlice';
import adminReducer from './admin/adminSlice';
import contentReducer from './content/contentSlice';
export const rootReducer = combineReducers({
  homeReducer,
  faqReducer,
  blogReducer,
  adminReducer,
  contentReducer,
});
