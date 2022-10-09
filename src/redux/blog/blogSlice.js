import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogData: [],
  blogLoading: false,
  blogCount: 0,
};

export const blogSlice = createSlice({
  name: 'blog data',
  initialState,
  reducers: {
    setBlogdata: (state, action) => {
      state.blogData = action.payload;
    },
    setBlogdataLoading: (state, action) => {
      state.blogLoading = action.payload;
    },
    setBlogdataCount: (state, action) => {
      state.blogCount = action.payload;
    },
  },
});

export const { setBlogdata, setBlogdataLoading, setBlogdataCount } =
  blogSlice.actions;

export default blogSlice.reducer;
