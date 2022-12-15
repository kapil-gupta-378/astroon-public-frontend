import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getNFTDataApi = async (page, limit) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}nft`,
    params: {
      page: page,
      limit: limit,
    },
  });
  return xhr.data;
};

export const validateOpenseaURLApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}nft/single-opensea`,
    data,
  });
  return xhr.data;
};

export const insertNFTDataApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}nft`,
    data,
  });
  return xhr.data;
};

export const deleteNFTDataApi = async (id) => {
  const xhr = await axios.request({
    method: 'delete',
    url: `${APP_URL}nft/${id}`,
  });
  return xhr.data;
};

export const nftOperationDataApi = async (operation) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}nft?${operation}`,
  });
  return xhr.data;
};
