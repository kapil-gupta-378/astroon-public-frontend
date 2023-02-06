import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: { bio: '', displayName: '', email: '', customUrl: '', assets: [] },
  userDataLoading: false,
  claimingToken: [],
  tokenBuyHistory: [],
  nftBuyHistory: [],
  nftRewardData: { total: 0, data: [] },
  nftRewardCount: 0,
  claimedReward: 0,
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
        [action.payload.name]: action.payload.value,
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
    setClaimingTokenNumber: (state, action) => {
      state.claimingToken = action.payload;
    },
    setBuyTokenHistory: (state, action) => {
      state.tokenBuyHistory = action.payload;
    },
    setBuyNftHistory: (state, action) => {
      state.nftBuyHistory = action.payload;
    },
    setNftRewardData: (state, action) => {
      state.nftRewardData = action.payload;
    },
    setNftRewardCount: (state, action) => {
      state.nftRewardCount = action.payload;
    },
    setClaimedReward: (state, action) => {
      state.claimedReward = action.payload;
    },
  },
});

export const {
  setUserData,
  updateUserData,
  setUserDataLoading,
  updateCoverImage,
  updateProfileImage,
  setClaimingTokenNumber,
  setBuyTokenHistory,
  setBuyNftHistory,
  setNftRewardData,
  setNftRewardCount,
  setClaimedReward,
} = userSlice.actions;

export default userSlice.reducer;
