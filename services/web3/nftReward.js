import { getContractInstance } from './web3ProviderMethods';

export const claimReward = async (address) => {
  const astTokenMainContract = await getContractInstance('NFT REWARD CONTRACT');

  const response = astTokenMainContract.methods.claim().send({ from: address });
  return response;
};

export const checkReward = async (address) => {
  const astTokenMainContract = await getContractInstance('NFT REWARD CONTRACT');

  const response = astTokenMainContract.methods.checkReward(address).call();
  return response;
};

export const setNFTPreCon_To_RewardCon = async (contractAddress, address) => {
  const astTokenMainContract = await getContractInstance('NFT REWARD CONTRACT');

  const response = astTokenMainContract.methods
    .updateASTNFTaddress(contractAddress)
    .send({ from: address });
  return response;
};
