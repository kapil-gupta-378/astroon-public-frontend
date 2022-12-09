import { convertEtherToWei } from '../../src/utils/currencyMethods';
import { getMerkleDataApi } from '../api/markle';
import { getSaleDetails, getUserBuyDetails } from './saleMethod';
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

export const claimToken = async (walletAddress, saleRound) => {
  const AstTokenContract = await getContractInstance();
  const tokenTransition = await AstTokenContract.methods.claim(saleRound).send({
    from: walletAddress,
  });
  return tokenTransition;
};

export const getCurrentTokenToBeClaimed = async (address) => {
  const AstTokenContract = await getContractInstance();

  let saleUserBuyResponse = {};
  if (address) {
    saleUserBuyResponse = await getUserBuyDetails(address);
  }
  let claimResponse;
  const saleDetailsResponse = await getSaleDetails();
  if (
    saleUserBuyResponse.tokens &&
    saleDetailsResponse.vesting &&
    saleUserBuyResponse.lastClaimed
  ) {
    claimResponse = await AstTokenContract.methods
      .calculateReleaseToken(
        saleUserBuyResponse.tokens,
        saleDetailsResponse.vesting,
        saleUserBuyResponse.lastClaimed,
      )
      .call({ from: address });
  }

  return claimResponse;
};
