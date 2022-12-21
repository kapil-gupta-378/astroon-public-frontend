import { convertEtherToWei } from '../../src/utils/currencyMethods';
import { getMerkleDataApi, getMerkleSeedDataApi } from '../api/markle';
import { getSaleDetails, getUserBuyDetails } from './saleMethod';
import { getContractInstance } from './web3ProviderMethods';

export const buyToken = async (
  buyingQuality,
  OneTokenPrice,
  walletAddress,
  tokenData,
) => {
  const AstTokenContract = await getContractInstance();
  const TokenRateInEthForBuyCount = convertEtherToWei(
    Math.round(
      parseFloat(buyingQuality * Number(OneTokenPrice)) * Math.pow(10, 10),
    ) / Math.pow(10, 10),
  );

  let tokenTransition;

  if (tokenData) {
    let merkleData;
    if (tokenData.saleData.isSeed) {
      merkleData = await getMerkleSeedDataApi();
    } else {
      merkleData = await getMerkleDataApi();
    }
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

export const getCurrentTokenToBeClaimed = async (address, saleRound) => {
  let claimResponse = 0;
  const AstTokenContract = await getContractInstance();
  let saleUserBuyResponse = {};

  if ((address, saleRound)) {
    saleUserBuyResponse = await getUserBuyDetails(address, saleRound);
  }

  const saleDetailsResponse = await getSaleDetails(
    saleUserBuyResponse.saleRound,
  );
  if (
    saleUserBuyResponse.tokens &&
    saleDetailsResponse.vesting &&
    saleUserBuyResponse.lastClaimed &&
    saleUserBuyResponse.tokens === 0
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

export const getRemainingToken = async () => {
  const AstTokenContract = await getContractInstance();
  const remainingToken = AstTokenContract.methods.initialTokens().call();
  return remainingToken;
};
