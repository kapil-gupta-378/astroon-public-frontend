import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const createUserApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}users`,
    data,
  });

  return xhr.data;
};
