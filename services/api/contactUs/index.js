import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getResonForContactApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}reason-for-contacts`,
  });

  return xhr.data;
};

export const insertContactUsFileApi = async (data) => {
  const xhr = await axios.post(
    `${APP_URL}upload?fileFor=contactus&fileType=image`,
    data,
  );
  return xhr.data;
};

export const insertContactUsDetailApi = async (data) => {
  const xhr = await axios.post(`${APP_URL}contact-us`, data);
  return xhr.data;
};

export const getContactUsDataApi = async (page, limit) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}contact-us`,
    params: {
      page: page,
      limit: limit,
    },
  });

  return xhr.data;
};

export const contactUsDataOperationApi = async (params) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}contact-us`,
    params: params,
  });

  return xhr.data;
};

export const getcontactUsDataDetailsApi = async (id) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}contact-us/${id}`,
  });

  return xhr.data;
};

export const replyByUserApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}contact-us/reply`,
    data,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr.data;
};
