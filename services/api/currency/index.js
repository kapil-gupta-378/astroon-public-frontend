import axios from 'axios';
const ethUsdPriceUrl = process.env.NEXT_PUBLIC_ETH_PRICE_IN_USD;
export const changeEthToUsd = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${ethUsdPriceUrl}`,
  });

  return xhr.data;
};
