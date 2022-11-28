import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getGalleryForUserFileApi = async () => {
  const xhr = await axios.get(`${APP_URL}gallery-management/list`);
  return xhr.data;
};

export const getGalleryForAdminFileApi = async () => {
  const xhr = await axios.get(`${APP_URL}gallery-management`);
  return xhr.data;
};

export const uploadGalleryApi = async (data) => {
  const xhr = await axios.post(
    `${APP_URL}upload?fileFor=galleryManagement&fileType=gallery`,
    data,
  );
  return xhr.data;
};

export const insertGalleryForFileApi = async (data) => {
  const xhr = await axios.post(`${APP_URL}gallery-management`, data);
  return xhr.data;
};

export const deleteGalleryForFileApi = async (id) => {
  const xhr = await axios.delete(`${APP_URL}gallery-management/${id}`);
  return xhr.data;
};
