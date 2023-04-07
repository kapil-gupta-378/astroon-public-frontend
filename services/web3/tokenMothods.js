import { convertEtherToWei } from '../../src/utils/currencyMethods';
import { getMerkleDataApi, getMerkleSeedDataApi } from '../api/markle';
import { getContractInstance } from './web3ProviderMethods';

export const buyToken = async (
  selectedSaleName,
  buyingQuality,
  OneTokenPrice,
  walletAddress,
) => {
  const AstTokenContract = await getContractInstance('ILO CONTRACT');

  const TokenRateInEthForBuyCount = convertEtherToWei(
    Math.round(
      parseFloat(buyingQuality * Number(OneTokenPrice)) * Math.pow(10, 10),
    ) / Math.pow(10, 10),
  );

  let tokenTransition;

  if (selectedSaleName === 'private' || selectedSaleName === 'seed') {
    let merkleData;
    let saleType;
    if (selectedSaleName === 'seed') {
      merkleData = await getMerkleSeedDataApi();
      saleType = process.env.NEXT_PUBLIC_SEED_SALE_ID;
    } else {
      merkleData = await getMerkleDataApi();
      saleType = process.env.NEXT_PUBLIC_PRIVATE_SALE_ID;
    }
    tokenTransition = await AstTokenContract.methods
      .preSaleBuy(saleType, merkleData.proof)
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
  const AstTokenContract = await getContractInstance('ILO CONTRACT');
  const tokenTransition = await AstTokenContract.methods.claim(saleRound).send({
    from: walletAddress,
  });
  return tokenTransition;
};

export const getCurrentTokenToBeClaimed = async (address, saleRound) => {
  try {
    let claimResponse = 0;
    const AstTokenContract = await getContractInstance('ILO CONTRACT');

    claimResponse = await AstTokenContract.methods
      .getReward(saleRound, address)
      .call();
    return claimResponse;
  } catch (error) {
    return 0;
  }
};

export const getRemainingToken = async () => {
  const AstTokenContract = await getContractInstance('ILO CONTRACT');
  const remainingToken = AstTokenContract.methods.initialTokens().call();
  return remainingToken;
};
