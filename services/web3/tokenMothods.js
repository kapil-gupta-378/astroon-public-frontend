import { convertEtherToWei } from './currencyMethods';
import { getContractInstance } from './web3ProviderMethods';

export const buyToken = async (buyingQuality, OneTokenPrice, walletAddress) => {
  const AstTokenContract = await getContractInstance();

  const TokenRateInEthForBuyCount = convertEtherToWei(
    buyingQuality * Number(OneTokenPrice),
  );
  const tokenTransition = await AstTokenContract.methods.buyTokens().send({
    from: walletAddress,
    value: TokenRateInEthForBuyCount,
  });
  return tokenTransition;
};
