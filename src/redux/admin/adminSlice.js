import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminListData: [],
  adminLoading: false,
  adminListCount: 0,
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
  },
});

export const {
  setAdmindata,
  setAdmindataLoading,
  setAdminListCount,
  setAdmindataUpdate,
} = adminSlice.actions;

export default adminSlice.reducer;
