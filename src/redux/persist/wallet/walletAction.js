import { getWalletAstTokenBalance } from '../../../../services/web3/walletMothods';
import { setBalance } from './walletSlice';

export const fetchWalletBalance = (address) => {
  return async (dispatch) => {
    try {
      const walletBalance = await getWalletAstTokenBalance(address);
      dispatch(setBalance(walletBalance));
    } catch (error) {
      console.error(error);
    }
  };
};
