import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getNFTPurchaseDataApi = async (address) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}nft-purchase/history`,
    params: {
      walletAddress: address,
    },
  });
  return xhr.data.data;
};

export const portNFTPurchaseData = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}nft-purchase`,
    data: data,
  });
  return xhr.data;
};

export const portNFTSaleDataApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}nft-sale`,
    data: data,
  });
  return xhr.data;
};
export const updateNFTSaleDataApi = async (data) => {
  const xhr = await axios.request({
    method: 'put',
    url: `${APP_URL}nft-sale/1`,
    data: data,
  });
  return xhr.data;
};

export const getNFTSaleDataApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}nft-sale/1`,
  });
  return xhr.data;
};
export const getNFTCategoryData = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}nft-purchase/category/tokenId`,
  });
  return xhr.data;
};

export const postNftPreSaleCsvApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}nft-purchase/metaData`,
    data: data,
  });
  return xhr.data;
};

export const getNFTRewardApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}nft-reward`,
  });
  return xhr.data;
};
