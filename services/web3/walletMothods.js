import { convertWeiToEther } from './currencyMethods';
import { getContractInstance } from './web3ProviderMethods';

export const getWalletAstTokenBalance = async (wallet_address) => {
  const AstTokenContract = await getContractInstance(true);
  const response = await AstTokenContract.methods
    .balanceOf(wallet_address)
    .call();
  const balanceInEth = convertWeiToEther(response);
  return balanceInEth;
};
