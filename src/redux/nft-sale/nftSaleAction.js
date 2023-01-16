import { getNFTSaleDataApi } from '../../../services/api/nftPreSale';
import {
  getNftPreSaleData,
  isNftReaveled,
} from '../../../services/web3/nftPreSale';
import {
  setIsNftSaleRevealed,
  setNftSaledata,
  setNftSaledataLoading,
  setSaleContractData,
} from './nftSaleSlice';

export const fetchNftPreSaleData = () => {
  return async (dispatch) => {
    try {
      dispatch(setNftSaledataLoading(true));
      // fetching nft pre sale data from back end that admin put by the sale card in admin panel (sale-control tab )
      const data = await getNFTSaleDataApi();
      if (data) dispatch(setNftSaledata(data.data));
      // fetching data from contracrt of is nft reveal or not after buy and end of nft pre sale
      const preSale = await isNftReaveled();
      if (preSale) dispatch(setIsNftSaleRevealed(preSale));
      //feching current nft pre sale or last nft pre sale data fron contract
      const contractData = await getNftPreSaleData();
      if (contractData) dispatch(setSaleContractData(contractData));
      dispatch(setNftSaledataLoading(false));
    } catch (error) {
      dispatch(setNftSaledataLoading(false));
    }
  };
};
