import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nftSaleData: [],
  nftSaleLoading: false,
};

export const nftSaleSlice = createSlice({
  name: 'blog data',
  initialState,
  reducers: {
    setNftSaledata: (state, action) => {
      state.nftSaleData = action.payload;
    },
    setNftSaledataLoading: (state, action) => {
      state.nftSaleLoading = action.payload;
    },
  },
});

export const { setNftSaledata, setNftSaledataLoading } = nftSaleSlice.actions;

export default nftSaleSlice.reducer;
