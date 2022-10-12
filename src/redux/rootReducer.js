import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './home/homeSlice';
import faqReducer from './faq/faqSlice';
import blogReducer from './blog/blogSlice';
import adminReducer from './admin/adminSlice';
export const rootReducer = combineReducers({
  homeReducer,
  faqReducer,
  blogReducer,
  adminReducer,
});
