import { getTokenDataApi } from '../../../services/api/astroon-token';
import { getUserDataApi } from '../../../services/api/user';
import { getCurrentTokenToBeClaimed } from '../../../services/web3/tokenMothods';
import { convertWeiToEther } from '../../utils/currencyMethods';
import {
  setClaimingTokenNumber,
  setUserData,
  setUserDataLoading,
} from './userSlice';
export const fetchUserDataAction = (walletAddress) => {
  return async (dispatch) => {
    try {
      dispatch(setUserDataLoading(true));
      const data = await getUserDataApi();
      const {
        saleData: { saleRound },
      } = await getTokenDataApi();
      if (walletAddress && saleRound !== 0) {
        const tokenData = await getCurrentTokenToBeClaimed(
          walletAddress,
          saleRound,
        );

        const tokenDataInEth = convertWeiToEther(tokenData);
        dispatch(setClaimingTokenNumber(tokenDataInEth));
      }
      dispatch(setUserData(data.data));
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
