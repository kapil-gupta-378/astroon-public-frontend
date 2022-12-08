import { convertEtherToWei } from '../../src/utils/currencyMethods';
import { getMerkleDataApi } from '../api/markle';
import { getContractInstance } from './web3ProviderMethods';

export const buyToken = async (
  buyingQuality,
  OneTokenPrice,
  walletAddress,
  privateSale,
) => {
  const AstTokenContract = await getContractInstance();
  const TokenRateInEthForBuyCount = convertEtherToWei(
    buyingQuality * Number(OneTokenPrice),
  );

  let tokenTransition;

  if (privateSale) {
    const merkleData = await getMerkleDataApi();
    tokenTransition = await AstTokenContract.methods
      .preSaleBuy(merkleData.proof ? merkleData.proof : null)
      .send({
        from: walletAddress,
        value: TokenRateInEthForBuyCount,
      });
  } else {
    tokenTransition = await AstTokenContract.methods.buyTokens().send({
      from: walletAddress,
      value: TokenRateInEthForBuyCount,
    });
  }

  return tokenTransition;
};

export const claimToken = async (walletAddress) => {
  const AstTokenContract = await getContractInstance();
  const tokenTransition = await AstTokenContract.methods.claim(5).send({
    from: walletAddress,
  });
  return tokenTransition;
};
