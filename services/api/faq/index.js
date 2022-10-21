import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getFaqDataApi = async (page, limit) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}faq`,
    params: {
      page: page,
      limit: limit,
    },
  });

  return xhr.data.data;
};

export const createAdminFAQApi = async (data) => {
  const xhr = await axios.post(`${APP_URL}faq`, data, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr.data;
};

export const getFaqDataUsingIdApi = async (id) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}faq/${id}`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return xhr.data;
};

export const updateFaqDataApi = async (id, data) => {
  const xhr = await axios.request({
    method: 'put',
    url: `${APP_URL}faq/${id}`,
    data,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return xhr.data;
};

export const deleteFaqDataApi = async (id) => {
  const xhr = await axios.request({
    method: 'delete',
    url: `${APP_URL}faq/${id}`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return xhr.data;
};

export const faqDataOperationApi = async (search) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}faq?${search}`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return xhr.data;
};
