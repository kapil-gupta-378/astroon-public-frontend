import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nftSaleData: [],
  nftSaleLoading: false,
  isNftSaleRevealed: false,
  saleContractData: [],
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
    setSaleContractData: (state, action) => {
      state.saleContractData = action.payload;
    },
  },
});

export const {
  setNftSaledata,
  setNftSaledataLoading,
  setIsNftSaleRevealed,
  setSaleContractData,
} = nftSaleSlice.actions;

export default nftSaleSlice.reducer;
