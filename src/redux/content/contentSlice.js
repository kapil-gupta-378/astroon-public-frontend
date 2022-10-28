import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contentListData: [],
  contentLoading: false,
  contentListCount: 0,
};

export const contentSlice = createSlice({
  name: 'Content Data',
  initialState,
  reducers: {
    setContentData: (state, action) => {
      state.contentListData = action.payload;
    },
    setContentDataLoading: (state, action) => {
      state.contentLoading = action.payload;
    },
    setContentListCount: (state, action) => {
      state.contentListCount = action.payload;
    },
    setContentDataUpdate: (state, action) => {
      state.contentListData = [...state.contentListData, ...action.payload];
      state.contentListCount = state.contentListCount - 6;
    },
  },
});

export const {
  setContentData,
  setContentDataLoading,
  setContentListCount,
  setContentDataUpdate,
} = contentSlice.actions;

export default contentSlice.reducer;
