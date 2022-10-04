import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './home/homeSlice';
import blogReducer from './blog/blogSlice';
export const rootReducer = combineReducers({
  homeReducer,
  blogReducer,
});
