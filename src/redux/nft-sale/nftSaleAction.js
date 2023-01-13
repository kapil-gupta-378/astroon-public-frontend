import { getNFTSaleDataApi } from '../../../services/api/nftPreSale';
import { isNftReaveled } from '../../../services/web3/nftPreSale';
import {
  setIsNftSaleRevealed,
  setNftSaledata,
  setNftSaledataLoading,
} from './nftSaleSlice';

export const fetchNftPreSaleData = () => {
  return async (dispatch) => {
    try {
      dispatch(setNftSaledataLoading(true));
      const data = await getNFTSaleDataApi();
      if (data) dispatch(setNftSaledata(data.data));
      const preSale = await isNftReaveled();
      if (preSale) dispatch(setIsNftSaleRevealed(preSale));
      dispatch(setNftSaledataLoading(false));
    } catch (error) {
      dispatch(setNftSaledataLoading(false));
    }
  };
};
