import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: true,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHome: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setHome } = homeSlice.actions;

export default homeSlice.reducer;
