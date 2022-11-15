import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: { bio: '', displayName: '', email: '', customUrl: '', assets: [] },
  userDataLoading: false,
};

export const userSlice = createSlice({
  name: 'user data',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateUserData: (state, action) => {
      state.userData = {
        ...state.userData,
        [action.payload.target.name]: action.payload.target.value,
      };
    },
    setUserDataLoading: (state, action) => {
      state.userDataLoading = action.payload;
    },
    updateCoverImage: (state, action) => {
      state.userData.coverImage = action.payload;
    },
    updateProfileImage: (state, action) => {
      state.userData.profileImage = action.payload;
    },
  },
});

export const {
  setUserData,
  updateUserData,
  setUserDataLoading,
  updateCoverImage,
  updateProfileImage,
} = userSlice.actions;

export default userSlice.reducer;
