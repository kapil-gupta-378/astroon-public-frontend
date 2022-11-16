import { getTokenDataApi } from '../../../services/api/astroon-token';
import { setTokendata, setTokenDataLoading } from './tokenSlice';

export const fetchTokenDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(setTokenDataLoading(true));
      const data = await getTokenDataApi();
      dispatch(setTokendata(data));
      dispatch(setTokenDataLoading(false));
    } catch (error) {
      dispatch(setTokendata([]));
      dispatch(setTokenDataLoading(false));
    }
  };
};
