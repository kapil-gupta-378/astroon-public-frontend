import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminListData: [],
  adminLoading: false,
  adminListCount: 0,
  isConnected: false,
  walletAddress: '',
  networkId: null,
};

export const adminSlice = createSlice({
  name: 'admin data',
  initialState,
  reducers: {
    setAdmindata: (state, action) => {
      state.adminListData = action.payload;
    },
    setAdmindataLoading: (state, action) => {
      state.adminLoading = action.payload;
    },
    setAdminListCount: (state, action) => {
      state.adminListCount = action.payload;
    },
    setAdmindataUpdate: (state, action) => {
      state.adminListData = [...state.adminListData, ...action.payload];
      state.adminListCount = state.adminListCount - 6;
    },
    setAdminWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setIsNeworkId: (state, action) => {
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
  },
});

export const {
  setAdmindata,
  setAdmindataLoading,
  setAdminListCount,
  setAdmindataUpdate,
  setAdminWalletAddress,
  setIsNeworkId,
  setIsConnected,
  disconnectAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;
