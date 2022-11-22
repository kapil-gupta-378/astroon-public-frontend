import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMerkleDataApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}whitelist-user/check`,
  });
  return xhr.data.data;
};
