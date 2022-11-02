import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getContentListDataApi = async (data) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}content-management`,
    params: data,
  });
  return xhr.data.data;
};

export const deleteContentApi = async (id) => {
  const xhr = await axios.request({
    method: 'delete',
    url: `${APP_URL}content-management/${id}`,
  });
  return xhr.data;
};
