import { getSeedWhiteListAddressApi } from '../../../services/api/markle';
import { setGlobalLoading } from '../global-loading/globalLoadingSlice';
import { setWhiteListSeedUserData } from './whiteListSeedSlice';

export const fetchWhiteListSeedUserDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(setGlobalLoading(true));
      const data = await getSeedWhiteListAddressApi();
      dispatch(setWhiteListSeedUserData(data.rows));
      dispatch(setGlobalLoading(false));
    } catch (error) {
      dispatch(setWhiteListSeedUserData([]));
      dispatch(setGlobalLoading(false));
    }
  };
};
