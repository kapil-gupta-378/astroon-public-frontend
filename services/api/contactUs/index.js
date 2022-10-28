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
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    params: {
      page: page,
      limit: limit,
    },
  });

  return xhr.data;
};

export const contactUsDataOperationApi = async (data) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}contact-us?${data}`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return xhr.data;
};

export const getcontactUsDataDetailsApi = async (id) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}contact-us/${id}`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return xhr.data;
};

export const replyByUserApi = async (data) => {
  const xhr = await axios.post(`${APP_URL}contact-us/reply`, data);
  return xhr.data;
};
