import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getAdminListDataApi = async (data) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}users`,
    params: data,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr.data.data;
};

export const deleteAdminApi = async (id) => {
  const xhr = await axios.request({
    method: 'delete',
    url: `${APP_URL}users/${id}`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr.data;
};
export const adminAuditApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}admin-audit`,
    data: data,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr;
};

export const fetchAdminApi = async (id) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}users/${id}`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr.data.data;
};

export const updateAdminDataApi = async (id, data) => {
  const xhr = await axios.request({
    method: 'put',
    url: `${APP_URL}users/${id}`,
    data,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr.data;
};
export const updateAdminProfileApi = async (data) => {
  const xhr = await axios.post(
    `${APP_URL}upload?fileFor=profile&fileType=image`,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  );
  return xhr.data.data;
};
export const createAdminAccountApi = async (data) => {
  const xhr = await axios.post(`${APP_URL}users/admin/account-create`, data, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr.data;
};

export const createAdminAuditApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}admin-audit`,
    data,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr.data;
};
