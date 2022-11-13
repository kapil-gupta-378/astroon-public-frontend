import Web3 from 'web3';

export const convertWeiToEther = (weiValue) => {
  const convertValue = Web3.utils.fromWei(weiValue.toString(), 'ether');
  return convertValue;
};
export const convertEtherToWei = (weiValue) => {
  const convertValue = Web3.utils.toWei(weiValue.toString(), 'ether');
  return convertValue;
};
