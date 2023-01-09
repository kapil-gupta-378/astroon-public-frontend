import { getNFTSaleDataApi } from '../../../services/api/nftPreSale';
import { setNftSaledata, setNftSaledataLoading } from './nftSaleSlice';

export const fetchNftPreSaleData = () => {
  return async (dispatch) => {
    try {
      dispatch(setNftSaledataLoading(true));
      const data = await getNFTSaleDataApi();
      if (data) dispatch(setNftSaledata(data.data));
      dispatch(setNftSaledataLoading(false));
    } catch (error) {
      dispatch(setNftSaledataLoading(false));
    }
  };
};
