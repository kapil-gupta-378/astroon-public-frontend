import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  walletAddress: '',
  networkId: '',
  balance: 0,
  isUserConnected: false,
  userToken: '',
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setNetworkId: (state, action) => {
      state.networkId = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setIsUserConnected: (state, action) => {
      state.isUserConnected = action.payload;
    },
    setToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
});

export const {
  setWalletAddress,
  setNetworkId,
  setBalance,
  setIsUserConnected,
  setToken,
} = walletSlice.actions;
export default walletSlice.reducer;
