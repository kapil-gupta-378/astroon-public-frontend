import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getTokenDataApi = async (data) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}ast-token/total-supply`,
    params: data,
  });
  return xhr.data.data;
};

export const getTokenSaleData = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}seed-sale`,
  });
  return xhr.data.data;
};

export const updateTokenSaleDataApi = async (saleType, data) => {
  const xhr = await axios.request({
    method: 'put',
    url: `${APP_URL}seed-sale/${saleType}`,
    data: data,
  });
  return xhr.data;
};

export const postTokenSaleRoundApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}sale-round`,
    data: data,
  });

  return xhr.data;
};

export const postSaleOnStatusApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}sale-on`,
    data: data,
  });

  return xhr.data;
};
export const getSaleOnStatusApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}sale-on`,
  });

  return xhr.data;
};
