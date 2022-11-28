import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMerkleDataApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}whitelist-user/check`,
  });
  return xhr.data.data;
};
export const getWhiteListAddressApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}whitelist-user/list`,
  });
  return xhr.data.data;
};
export const postWhiteListAddressApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}whitelist-user/create`,
    data: data,
  });
  return xhr.data.data;
};
