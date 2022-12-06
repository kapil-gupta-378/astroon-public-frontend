import { convertEtherToUSD } from '../../utils/currencyMethods';
import { setEthPriceInUsd } from './currencySlice';

export const fetchCurrencyData = () => {
  return async (dispatch) => {
    try {
      const data = await convertEtherToUSD();
      if (data) dispatch(setEthPriceInUsd(data));
    } catch (error) {}
  };
};
