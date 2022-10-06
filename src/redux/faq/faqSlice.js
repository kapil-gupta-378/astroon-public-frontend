import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const faqSlice = createSlice({
  name: 'faqData',
  initialState,
  reducers: {
    setFaqdata: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setFaqdata } = faqSlice.actions;

export default faqSlice.reducer;
