import {
  getClaimHistory,
  getTokenBuyTransaction,
  getTokenDataApi,
} from '../../../services/api/astroon-token';
import { getNFTPurchaseDataApi } from '../../../services/api/nftPreSale';
import { getUserDataApi } from '../../../services/api/user';
import { getCurrentTokenToBeClaimed } from '../../../services/web3/tokenMothods';
import { convertWeiToEther } from '../../utils/currencyMethods';
import {
  setBuyNftHistory,
  setBuyTokenHistory,
  setClaimingTokenNumber,
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
      //  feching  token buy history for remaining claim
      const buyHistory = await getClaimHistory();
      const currentSale = await getTokenDataApi();
      if (buyHistory.data.length !== 0) {
        for (let i = 0; i < buyHistory.data.length; i++) {
          // fetching token than can be claim for user
          if (
            buyHistory.data[i].walletAddress &&
            buyHistory.data[i].saleRound !== 0
          ) {
          }
          const tokenData = await getCurrentTokenToBeClaimed(
            buyHistory.data[i].walletAddress,
            buyHistory.data[i].saleRound,
            currentSale.saleData.saleRound,
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

      dispatch(setUserDataLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setUserDataLoading(false));
    }
  };
};
