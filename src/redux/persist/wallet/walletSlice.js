import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  walletAddress: '',
  networkId: '',
  balance: '',
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
  },
});

export const { setWalletAddress, setNetworkId, setBalance } =
  walletSlice.actions;
export default walletSlice.reducer;
