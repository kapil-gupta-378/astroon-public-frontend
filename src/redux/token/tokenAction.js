import {
  getTokenDataApi,
  getTokenSaleData,
} from '../../../services/api/astroon-token';
import {
  setSaleTypeDetails,
  setTokendata,
  setTokenDataLoading,
} from './tokenSlice';

export const fetchTokenDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(setTokenDataLoading(true));
      const SaleTypeDetails = await getTokenDataApi();
      const currentSale = await getTokenSaleData();
      dispatch(setTokendata(SaleTypeDetails));
      dispatch(setSaleTypeDetails(currentSale));
      dispatch(setTokenDataLoading(false));
    } catch (error) {
      dispatch(setTokendata([]));
      dispatch(setTokenDataLoading(false));
    }
  };
};
