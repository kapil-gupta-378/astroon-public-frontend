import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getGalleryUserDataApi = async () => {
  const xhr = await axios.get(`${APP_URL}gallery-management/list`);
  return xhr.data;
};

export const getGalleryAdminDataApi = async (page, limit) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}gallery-management`,
    params: {
      page: page,
      limit: limit,
    },
  });
  return xhr.data;
};

export const uploadGalleryApi = async (data) => {
  const xhr = await axios.post(
    `${APP_URL}upload?fileFor=galleryManagement&fileType=gallery`,
    data,
  );
  return xhr.data;
};

export const insertGalleryDataApi = async (data) => {
  const xhr = await axios.post(`${APP_URL}gallery-management`, data);
  return xhr.data;
};

export const deleteGalleryDataApi = async (id) => {
  const xhr = await axios.delete(`${APP_URL}gallery-management/${id}`);
  return xhr.data;
};

export const galleryOperationDataApi = async (operation) => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}gallery-management?${operation}`,
  });
  return xhr.data;
};
