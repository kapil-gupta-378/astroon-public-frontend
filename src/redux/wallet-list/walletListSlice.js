import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addressListData: [],
  addressListLoading: false,
  addressListDataCount: 0,
};

export const addressListSlice = createSlice({
  name: 'admin data',
  initialState,
  reducers: {
    setWalletListdata: (state, action) => {
      state.addressListData = action.payload;
    },
    setAddressListLoading: (state, action) => {
      state.addressListLoading = action.payload;
    },
    setAddressListCount: (state, action) => {
      state.addressListDataCount = action.payload;
    },
    setWalletListdataUpdate: (state, action) => {
      state.addressListData = [...state.addressListData, ...action.payload];
      state.addressListDataCount = state.addressListDataCount - 6;
    },
  },
});

export const {
  setWalletListdata,
  setAddressListLoading,
  setAddressListCount,
  setWalletListdataUpdate,
} = addressListSlice.actions;
export default addressListSlice.reducer;
