import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const blogSlice = createSlice({
  name: 'blog data',
  initialState,
  reducers: {
    setBlogdata: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setBlogdata } = blogSlice.actions;

export default blogSlice.reducer;
