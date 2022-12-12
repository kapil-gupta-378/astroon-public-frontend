import {
  getTokenDataApi,
  getTokenSaleData,
} from '../../../services/api/astroon-token';
import {
  setPrivateSaleDetails,
  setPublicSaleDetails,
  setSeedSaleDetails,
  setTokendata,
  setTokenDataLoading,
} from './tokenSlice';

export const fetchTokenDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(setTokenDataLoading(true));
      const currentSale = await getTokenDataApi();
      dispatch(setTokendata(currentSale));
      const SaleTypeDetails = await getTokenSaleData();

      const publicSaleData = SaleTypeDetails.find(
        (saleData) => saleData.saleType === 'Public Sale',
      );
      dispatch(setPublicSaleDetails(publicSaleData));

      const privateSaleData = SaleTypeDetails.find(
        (saleData) => saleData.saleType === 'Private Sale',
      );
      dispatch(setPrivateSaleDetails(privateSaleData));

      const seedSaleData = SaleTypeDetails.find(
        (saleData) => saleData.saleType === 'Seed Sale',
      );
      dispatch(setSeedSaleDetails(seedSaleData));
      dispatch(setTokenDataLoading(false));
    } catch (error) {
      dispatch(setTokendata([]));
      dispatch(setTokenDataLoading(false));
    }
  };
};
