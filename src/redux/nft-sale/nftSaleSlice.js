import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nftSaleData: [],
  nftSaleLoading: false,
  isNftSaleRevealed: false,
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
    setIsNftSaleRevealed: (state, action) => {
      state.isNftSaleRevealed = action.payload;
    },
  },
});

export const { setNftSaledata, setNftSaledataLoading, setIsNftSaleRevealed } =
  nftSaleSlice.actions;

export default nftSaleSlice.reducer;
