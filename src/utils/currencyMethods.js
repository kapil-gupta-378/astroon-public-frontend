import Web3 from 'web3';
import { changeEthToUsd } from '../../services/api/currency';

export const convertWeiToEther = (weiValue) => {
  if (!weiValue) return 0;
  const convertValue = Web3.utils.fromWei(weiValue.toString(), 'ether');
  return Number(convertValue);
};
export const convertEtherToWei = (weiValue) => {
  if (!weiValue) return 0;
  const convertValue = Web3.utils.toWei(weiValue.toString(), 'ether');
  return convertValue;
};
export const convertEtherToUSD = async () => {
  const ethPriceInUsd = await changeEthToUsd();
  return ethPriceInUsd[0].current_price;
};
