import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getAdminListDataApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}users`,
    params: {
      role: 'admin',
    },
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return xhr.data.data;
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
