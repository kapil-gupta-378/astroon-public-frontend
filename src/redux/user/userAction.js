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
      if (walletAddress) {
        const tokenData = await getCurrentTokenToBeClaimed(walletAddress);
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
