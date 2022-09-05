import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './home/homeSlice';
export const rootReducer = combineReducers({
  homeReducer,
});
