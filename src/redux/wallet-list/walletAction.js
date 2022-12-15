import { getWalletAddressListApi } from '../../../services/api/wallet-management.js';
import {
  setAddressListCount,
  setAddressListLoading,
  setWalletListdata,
  setWalletListdataUpdate,
} from './walletListSlice';
export const fetchAddressListData = (paramsData, moreData = false) => {
  return async (dispatch) => {
    try {
      if (!moreData) {
        dispatch(setAddressListLoading(true));
        const data = await getWalletAddressListApi(paramsData);
        if (data.rows.length !== 0) dispatch(setWalletListdata(data.rows));
        dispatch(setAddressListCount(data.count));
      } else {
        const data = await getWalletAddressListApi(paramsData);
        dispatch(setWalletListdataUpdate(data.rows));
      }
      dispatch(setAddressListLoading(false));
    } catch (error) {
      dispatch(setAddressListLoading(false));
    }
  };
};
