import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenData: [],
  saleTypeDetails: [],
  tokenDataLoading: false,
};

export const tokenSlice = createSlice({
  name: 'faqData',
  initialState,
  reducers: {
    setTokendata: (state, action) => {
      state.tokenData = action.payload;
    },
    setSaleTypeDetails: (state, action) => {
      state.saleTypeDetails = action.payload;
    },
    setTokenDataLoading: (state, action) => {
      state.tokenDataLoading = action.payload;
    },
  },
});

export const { setTokendata, setTokenDataLoading, setSaleTypeDetails } =
  tokenSlice.actions;

export default tokenSlice.reducer;
