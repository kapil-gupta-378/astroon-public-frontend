import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: false,
  walletAddress: '',
  networkId: null,
  adminToken: '',
};

export const adminSlice = createSlice({
  name: 'admin data',
  initialState,
  reducers: {
    setAdminWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setIsNetworkId: (state, action) => {
      state.networkId = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    disconnectAdmin: (state) => {
      state.isConnected = false;
      state.networkId = '';
      state.walletAddress = '';
    },
    setAdminToken: (state, payload) => {
      state.adminToken = payload;
    },
  },
});

export const {
  setAdminWalletAddress,
  setIsNetworkId,
  setIsConnected,
  disconnectAdmin,
  setAdminToken,
} = adminSlice.actions;

export default adminSlice.reducer;
