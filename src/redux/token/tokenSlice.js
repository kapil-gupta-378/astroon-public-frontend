import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenData: [],
  seedSale: {},
  privateSale: {},
  publicSale: {},
  tokenDataLoading: false,
  saleOnData: {},
  saleRoundOn: {
    isSeedSaleOn: false,
    isPrivateSaleOn: false,
    isPublicSaleOn: false,
    seedSaleDateInContract: {},
    privateSaleDateInContract: {},
    publicSaleDateInContract: {},
  },
};

export const tokenSlice = createSlice({
  name: 'faqData',
  initialState,
  reducers: {
    setTokendata: (state, action) => {
      state.tokenData = action.payload;
    },
    setPublicSaleDetails: (state, action) => {
      state.publicSale = action.payload;
    },
    setPrivateSaleDetails: (state, action) => {
      state.privateSale = action.payload;
    },
    setSeedSaleDetails: (state, action) => {
      state.seedSale = action.payload;
    },
    setTokenDataLoading: (state, action) => {
      state.tokenDataLoading = action.payload;
    },
    setSaleOnData: (state, action) => {
      state.saleOnData = action.payload;
    },
    setSaleRoundOn: (state, action) => {
      state.saleRoundOn = action.payload;
    },
  },
});

export const {
  setTokendata,
  setTokenDataLoading,
  setPublicSaleDetails,
  setPrivateSaleDetails,
  setSeedSaleDetails,
  setSaleOnData,
  setSaleRoundOn,
} = tokenSlice.actions;

export default tokenSlice.reducer;
