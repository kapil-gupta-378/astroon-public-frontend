import {
  getClaimHistory,
  getTokenBuyTransaction,
} from '../../../services/api/astroon-token';
import { getUserDataApi } from '../../../services/api/user';
import { getCurrentTokenToBeClaimed } from '../../../services/web3/tokenMothods';
import { convertWeiToEther } from '../../utils/currencyMethods';
import {
  setBuyTokenHistory,
  setClaimingTokenNumber,
  setUserData,
  setUserDataLoading,
} from './userSlice';
export const fetchUserDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(setUserDataLoading(true));
      // fetching user meta data
      const data = await getUserDataApi();
      dispatch(setUserData(data.data));

      //  feching  token buy history for remaining claim
      const buyHistory = await getClaimHistory();
      if (buyHistory.data.length !== 0) {
        for (let i = 0; i < 3; i++) {
          // fetching token than can be claim for user
          if (
            buyHistory.data[i].walletAddress &&
            buyHistory.data[i].saleRound !== 0
          ) {
          }
          const tokenData = await getCurrentTokenToBeClaimed(
            buyHistory.data[0].walletAddress,
            buyHistory.data[0].saleRound,
          );
          // converting to wei to eth
          const tokenDataInEth = convertWeiToEther(tokenData);
          buyHistory.data[i].remainingClaim = tokenDataInEth;
        }
      }

      dispatch(setClaimingTokenNumber(buyHistory.data));

      //  fetching buy history
      const tokenBuyHistory = await getTokenBuyTransaction();
      dispatch(setBuyTokenHistory(tokenBuyHistory.data.rows));

      dispatch(setUserDataLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(
        setUserData({
          bio: '',
          displayName: '',
          email: '',
          customUrl: '',
          assets: [],
        }),
      );

      dispatch(setUserDataLoading(false));
    }
  };
};
