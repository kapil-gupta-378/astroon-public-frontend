import { getMerkleDataApi } from '../api/markle';
import { convertEtherToWei } from './currencyMethods';
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
      .preSaleBuy([
        merkleData.merkleProof[merkleData.merkleProof.length - 1].merkleProof,
      ])
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
