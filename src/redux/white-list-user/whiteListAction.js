import { getWhiteListAddressApi } from '../../../services/api/markle';
import {
  setWhiteListUserData,
  setWhiteListUserDataLoading,
} from './whiteListSlice';

export const fetchWhiteListUserDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(setWhiteListUserDataLoading(true));
      const data = await getWhiteListAddressApi();
      dispatch(setWhiteListUserData(data));
      dispatch(setWhiteListUserDataLoading(false));
    } catch (error) {
      dispatch(setWhiteListUserData([]));
      dispatch(setWhiteListUserDataLoading(false));
    }
  };
};
