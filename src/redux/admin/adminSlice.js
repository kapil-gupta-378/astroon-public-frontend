import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminListData: [],
  adminLoading: false,
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
  },
});

export const { setAdmindata, setAdmindataLoading } = adminSlice.actions;

export default adminSlice.reducer;
