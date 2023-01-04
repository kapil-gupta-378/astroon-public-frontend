import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getNFTPurchaseDataApi = async (address) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}nft-purchase/count`,
    params: {
      walletAddress: address,
    },
  });
  return xhr.data.data.quantity;
};

export const portNFTPurchaseData = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}nft-purchase`,
    data: data,
  });
  return xhr.data;
};
