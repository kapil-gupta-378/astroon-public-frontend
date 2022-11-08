import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getUserDataApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}users/profile/nft`,
  });
  return xhr.data;
};

export const updateUserDataApi = async (data) => {
  const xhr = await axios.request({
    method: 'put',
    url: `${APP_URL}users/profile/update`,
    data,
  });
  return xhr.data;
};

export const updataUserProfileImageApi = async (data) => {
  const xhr = await axios.post(
    `${APP_URL}upload?fileFor=profile&fileType=image`,
    data,
  );
  return xhr.data.data;
};
