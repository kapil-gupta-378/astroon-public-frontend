import { getNftPreSaleData } from '../../../services/web3/nftPreSale';
import { setNftSaledata, setNftSaledataLoading } from './nftSaleSlice';

export const fetchNftPreSaleData = () => {
  return async (dispatch) => {
    try {
      dispatch(setNftSaledataLoading(true));
      const data = await getNftPreSaleData();
      if (data) dispatch(setNftSaledata(data));
      dispatch(setNftSaledataLoading(false));
    } catch (error) {
      dispatch(setNftSaledataLoading(false));
    }
  };
};
