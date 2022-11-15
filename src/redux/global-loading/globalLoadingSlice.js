import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  globalLoading: false,
};

export const globalLoadingSlice = createSlice({
  name: 'faqData',
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
