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

export const getNonceApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}users/get-address-nonce`,
    data,
  });
  return xhr.data;
};
export const varifieSignatureApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}users/verify-signature`,
    data,
  });
  return xhr.data;
};
