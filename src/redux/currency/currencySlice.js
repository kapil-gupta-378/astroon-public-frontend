import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ethUsdPrice: 0,
};

export const currencySlice = createSlice({
  name: 'currency data',
  initialState,
  reducers: {
    setEthPriceInUsd: (state, action) => {
      state.ethUsdPrice = action.payload;
    },
  },
});

export const { setEthPriceInUsd } = currencySlice.actions;

export default currencySlice.reducer;
