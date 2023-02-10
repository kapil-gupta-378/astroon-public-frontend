import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminListData: [],
  adminLoading: false,
  adminListCount: 0,
};

export const adminListSlice = createSlice({
  name: 'admin list data',
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
      state.adminListCount = state.adminListCount - 10;
    },
  },
});

export const {
  setAdmindata,
  setAdmindataLoading,
  setAdminListCount,
  setAdmindataUpdate,
} = adminListSlice.actions;

export default adminListSlice.reducer;
