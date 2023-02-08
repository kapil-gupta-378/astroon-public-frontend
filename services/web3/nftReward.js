import { getContractInstance } from './web3ProviderMethods';

export const claimReward = async (address) => {
  const astNFTRewardContract = await getContractInstance('NFT REWARD CONTRACT');

  const response = astNFTRewardContract.methods.claim().send({ from: address });
  return response;
};

export const checkReward = async (address) => {
  const astNFTRewardContract = await getContractInstance('NFT REWARD CONTRACT');
  const response = astNFTRewardContract.methods.checkReward(address).call();
  return response;
};

export const setNFTPreCon_To_RewardCon = async (contractAddress, address) => {
  const astNFTRewardContract = await getContractInstance('NFT REWARD CONTRACT');

  const response = astNFTRewardContract.methods
    .updateASTNFTaddress(contractAddress)
    .send({ from: address });
  return response;
};

export const setRewardMonthData = async (data, address) => {
  const astNFTRewardContract = await getContractInstance('NFT REWARD CONTRACT');

  const response = astNFTRewardContract.methods
    .updateLimits(data)
    .send({ from: address });
  return response;
};
