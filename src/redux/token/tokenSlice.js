import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenData: [],
  tokenDataLoading: false,
};

export const tokenSlice = createSlice({
  name: 'faqData',
  initialState,
  reducers: {
    setTokendata: (state, action) => {
      state.tokenData = action.payload;
    },
    setTokenDataLoading: (state, action) => {
      state.tokenDataLoading = action.payload;
    },
  },
});

export const { setTokendata, setTokenDataLoading } = tokenSlice.actions;

export default tokenSlice.reducer;
