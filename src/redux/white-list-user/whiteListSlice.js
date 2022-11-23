import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  whiteListUserData: [],
  whiteListUserDataLoading: false,
};

export const WhiteListUserSlice = createSlice({
  name: 'faqData',
  initialState,
  reducers: {
    setWhiteListUserData: (state, action) => {
      state.whiteListUserData = action.payload;
    },
    setWhiteListUserDataLoading: (state, action) => {
      state.whiteListUserDataLoading = action.payload;
    },
  },
});

export const { setWhiteListUserData, setWhiteListUserDataLoading } =
  WhiteListUserSlice.actions;

export default WhiteListUserSlice.reducer;
