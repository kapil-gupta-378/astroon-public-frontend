import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getWalletAddressListApi = async (data) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}users/wallet-list`,
    params: data,
  });
  return xhr.data.data;
};
