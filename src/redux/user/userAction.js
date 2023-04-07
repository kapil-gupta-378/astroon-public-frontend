import {
  getClaimHistory,
  getTokenBuyTransaction,
} from '../../../services/api/astroon-token';
import {
  getNFTPurchaseDataApi,
  // getNFTRewardApi,
  // getNFTRewardClaimApi,
} from '../../../services/api/nftPreSale';
import { getUserDataApi } from '../../../services/api/user';
// import { checkReward } from '../../../services/web3/nftReward';
import { getCurrentTokenToBeClaimed } from '../../../services/web3/tokenMothods';
import { convertWeiToEther } from '../../utils/currencyMethods';
import {
  setBuyNftHistory,
  setBuyTokenHistory,
  // setClaimedReward,
  setClaimingTokenNumber,
  // setNftRewardCount,
  // setNftRewardData,
  setUserData,
  setUserDataLoading,
} from './userSlice';
export const fetchUserDataAction = (walletAddress) => {
  return async (dispatch) => {
    try {
      dispatch(setUserDataLoading(true));
      // fetching user meta data
      const data = await getUserDataApi();
      dispatch(setUserData(data.data));
      //  fetching  token buy history for remaining claim
      const buyHistory = await getClaimHistory();
      if (buyHistory.data.length !== 0) {
        for (let i = 0; i < buyHistory.data.length; i++) {
          // fetching token than can be claim for user
          if (
            buyHistory.data[i].walletAddress &&
            buyHistory.data[i].saleRound !== 0 &&
            buyHistory.data[i].saleType !== 'Public sale'
          ) {
          }
          const tokenData = await getCurrentTokenToBeClaimed(
            buyHistory.data[i].walletAddress,
            buyHistory.data[i].saleRound,
          );
          //converting to wei to eth
          const tokenDataInEth = convertWeiToEther(tokenData);
          buyHistory.data[i].remainingClaim = tokenDataInEth;
        }
      }

      dispatch(setClaimingTokenNumber(buyHistory.data));

      //  fetching buy history
      const tokenBuyHistory = await getTokenBuyTransaction();
      dispatch(setBuyTokenHistory(tokenBuyHistory.data.rows));

      if (walletAddress) {
        const lastMysteryBoxPurChase = await getNFTPurchaseDataApi(
          walletAddress,
        );
        dispatch(setBuyNftHistory(lastMysteryBoxPurChase.data));
      }

      // // fetching nft reward per day data from BE api
      // const nftReward = await getNFTRewardApi();
      // dispatch(setNftRewardData(nftReward));
      // // fetching reward count from reward contract method
      // if (walletAddress) {
      //   const rewardCount = await checkReward(walletAddress);
      //   dispatch(setNftRewardCount(rewardCount));
      // }
      // // fetching total AST claimed by user that earned by after buying NFT from presale (backend API)

      // const res = await getNFTRewardClaimApi();
      // if (res.total) dispatch(setClaimedReward(res.total));
      dispatch(setUserDataLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setUserDataLoading(false));
    }
  };
};
