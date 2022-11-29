import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  whiteListSeedUserData: [],
  whiteListSeedUserDataLoading: false,
};

export const WhiteListUserSeedSlice = createSlice({
  name: 'faqData',
  initialState,
  reducers: {
    setWhiteListSeedUserData: (state, action) => {
      state.whiteListSeedUserData = action.payload;
    },
    setWhiteListSeedUserDataLoading: (state, action) => {
      state.whiteListSeedUserDataLoading = action.payload;
    },
  },
});

export const { setWhiteListSeedUserData, setWhiteListSeedUserDataLoading } =
  WhiteListUserSeedSlice.actions;

export default WhiteListUserSeedSlice.reducer;
