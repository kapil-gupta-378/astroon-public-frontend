import {
  getSaleOnStatusApi,
  getTokenDataApi,
  getTokenSaleData,
} from '../../../services/api/astroon-token';
import {
  checkSaleRoundIsOn,
  getSaleDetails,
} from '../../../services/web3/saleMethod';
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

      dispatch(setSaleOnData(saleOnData.data));

      // fetching initial data of sale
      const currentSale = await getTokenDataApi();
      dispatch(setTokendata(currentSale));

      const isSeedSaleOn = await checkSaleRoundIsOn(
        currentSale.saleData.seedId,
      );
      const isPrivateSaleOn = await checkSaleRoundIsOn(
        currentSale.saleData.privateId,
      );
      const isPublicSaleOn = await checkSaleRoundIsOn(
        currentSale.saleData.publicId,
      );
      const seedSaleDateInContract = await getSaleDetails(
        currentSale.saleData.seedId,
      );
      const privateSaleDateInContract = await getSaleDetails(
        currentSale.saleData.privateId,
      );
      const publicSaleDateInContract = await getSaleDetails(
        currentSale.saleData.publicId,
      );

      dispatch(
        setSaleRoundOn({
          isSeedSaleOn: isSeedSaleOn,
          isPrivateSaleOn: isPrivateSaleOn,
          isPublicSaleOn: isPublicSaleOn,
          seedSaleDateInContract: seedSaleDateInContract,
          privateSaleDateInContract: privateSaleDateInContract,
          publicSaleDateInContract: publicSaleDateInContract,
        }),
      );
      dispatch(setGlobalLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setTokendata([]));
      dispatch(setGlobalLoading(false));
    }
  };
};
