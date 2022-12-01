import { getSeedWhiteListAddressApi } from '../../../services/api/markle';
import {
  setWhiteListSeedUserData,
  setWhiteListSeedUserDataLoading,
} from './whiteListSeedSlice';

export const fetchWhiteListSeedUserDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(setWhiteListSeedUserDataLoading(true));
      const data = await getSeedWhiteListAddressApi();
      dispatch(setWhiteListSeedUserData(data.rows));
      dispatch(setWhiteListSeedUserDataLoading(false));
    } catch (error) {
      dispatch(setWhiteListSeedUserData([]));
      dispatch(setWhiteListSeedUserDataLoading(false));
    }
  };
};
