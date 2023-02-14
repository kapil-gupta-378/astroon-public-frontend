import {
  getSaleOnStatusApi,
  getTokenDataApi,
  getTokenSaleData,
} from '../../../services/api/astroon-token';
import { checkSaleRoundIsOn } from '../../../services/web3/saleMethod';
import { setGlobalLoading } from '../global-loading/globalLoadingSlice';
import {
  setPrivateSaleDetails,
  setPublicSaleDetails,
  setSaleOnData,
  setSaleRoundOn,
  setSeedSaleDetails,
  setTokendata,
} from './tokenSlice';

export const fetchTokenDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(setGlobalLoading(true));
      // fetching initial data of sale
      const currentSale = await getTokenDataApi();
      dispatch(setTokendata(currentSale));
      // fetching all type sale pricing details
      const SaleTypeDetails = await getTokenSaleData();
      //  creating public sale data object
      const publicSaleData = SaleTypeDetails.find(
        (saleData) => saleData.saleType === 'Public Sale',
      );
      dispatch(setPublicSaleDetails(publicSaleData));

      //  creating private sale data object
      const privateSaleData = SaleTypeDetails.find(
        (saleData) => saleData.saleType === 'Private Sale',
      );

      //  creating seed sale data object
      dispatch(setPrivateSaleDetails(privateSaleData));
      const seedSaleData = SaleTypeDetails.find(
        (saleData) => saleData.saleType === 'Seed Sale',
      );
      dispatch(setSeedSaleDetails(seedSaleData));

      //fetching which sale is on data
      const saleOnData = await getSaleOnStatusApi();

      // checking is any sale is on
      const isSaleOn = await checkSaleRoundIsOn(currentSale.saleData.saleRound);
      dispatch(setSaleRoundOn(isSaleOn));

      dispatch(setSaleOnData(saleOnData.data));
      dispatch(setGlobalLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setTokendata([]));
      dispatch(setGlobalLoading(false));
    }
  };
};
